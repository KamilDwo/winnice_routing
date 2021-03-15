'use strict';

require('dotenv')
  .config();
const connection = require('../config/db.config');
const featuresIndex = require('../helpers/featuresIndex.helper');

const BackOffice = news => {
  this.id = news.id;
  this.type = news.type;
  this.message = news.message;
};

BackOffice.loginAdmin = (result, body) => {
  result({
    token: Math.random()
  }, null);
};

BackOffice.getAllVineyards = (result, body) => {
  const defaultFields = `
     vineyards.id,
     vineyards.name,
     vineyards.dateAdd,
     vineyards.provinceId,
     vineyards.isActive, 
     (SELECT COUNT(vineyards_paths.pathId) FROM vineyards_paths WHERE vineyards_paths.vineyardId = vineyards.id) as 'paths', 
     (SELECT COUNT(vineyards_organizations.organizationId) FROM vineyards_organizations WHERE vineyards_organizations.vineyardId = vineyards.id) as 'organizations'
     `;

  connection.query(`SELECT ${defaultFields} FROM vineyards`, function (error, results) {
    if (error) {
      result(error, null);
    }
    else {
      const parseItems = results.map(item => {
        item.isActive = item.isActive === 2;
        return item;
      });
      result(parseItems, null);
    }
  });
};

BackOffice.uploadVineyardImage = (req, result) => {
  const post = {
    vineyardId: req.body.vineyardId,
    photoFile: req.file.filename
  };
  connection.query('INSERT INTO vineyards_photos SET ?', post, function (error) {
    if (error) {
      result(null, error);
    }
    else {
      const moreFile = {
        filename: req.file.filename,
        thumbUrl: `https://polskiewinnice.ovh/images/${req.file.filename}`,
        uid: Math.random() + Math.random() + Math.random()
      };
      result(moreFile, null);
    }
  });
};

BackOffice.updateVineyardById = (req, result) => {
  const { id } = req.body;
  const {
    name,
    owners,
    yearOpen,
    sqm,
    postal,
    provinceId,
    address,
    city,
    locationX,
    locationY,
    phone,
    email,
    www,
    facebook,
    instagram,
    groundTilt,
    elevation,
    groundTiltDirection,
    groundType,
    description,
    wineTypesWhite,
    wineTypesRed,
    organizations,
    paths,
    features,
  } = req.body.values;
  const location = `${locationX}, ${locationY}`;

  connection.query('SELECT vineyardId, organizationId FROM vineyards_organizations WHERE vineyardId = ?', id, function (error, results) {
    const formOrganizations = organizations.map(organization => parseInt(organization));
    const addedOrganizations = results.map(organization => organization.organizationId);
    const checkIfAddOrganization = formOrganizations.filter(organization => !addedOrganizations.includes(parseInt(organization)));
    const toDeleteOrganization = addedOrganizations.filter(organization => !formOrganizations.includes(organization));

    if (toDeleteOrganization.length > 0) {
      const toDeleteOrganizationMap = toDeleteOrganization.map(organization => [id, organization]);
      const sql = 'DELETE FROM vineyards_organizations WHERE (vineyardId, organizationId) IN (?)';
      connection.query(sql, [toDeleteOrganizationMap], function (err) {
        if (err) {
          throw err;
        }
      });
    }

    if (checkIfAddOrganization.length > 0) {
      const sql = 'INSERT INTO vineyards_organizations (vineyardId, organizationId) VALUES ?';
      const organizationsToAddArray = checkIfAddOrganization.map(organization => [id, organization]);
      connection.query(sql, [organizationsToAddArray], function (err) {
        if (err) {
          throw err;
        }
      });
    }
  });

  connection.query('SELECT vineyardId, featureId FROM vineyards_features WHERE vineyardId = ?', id, function (error, results) {
    const formFeatures = features.map(feature => parseInt(feature));
    const addedFeatures = results.map(feature => feature.featureId);
    const checkIfAddFeature = formFeatures.filter(feature => !addedFeatures.includes(parseInt(feature)));
    const toDeleteFeature = addedFeatures.filter(feature => !formFeatures.includes(feature));

    if (toDeleteFeature.length > 0) {
      const toDeleteFeatureMap = toDeleteFeature.map(feature => [id, feature]);
      const sql = 'DELETE FROM vineyards_features WHERE (vineyardId, featureId) IN (?)';
      connection.query(sql, [toDeleteFeatureMap], function (err) {
        if (err) {
          throw err;
        }
      });
    }

    if (checkIfAddFeature.length > 0) {
      const sql = 'INSERT INTO vineyards_features (vineyardId, featureId) VALUES ?';
      const featuresToAddArray = checkIfAddFeature.map(path => [id, path]);
      connection.query(sql, [featuresToAddArray], function (err) {
        if (err) {
          throw err;
        }
      });
    }
  });

  connection.query('SELECT vineyardId, pathId FROM vineyards_paths WHERE vineyardId = ?', id, function (error, results) {
    const formPaths = paths.map(path => parseInt(path));
    const addedPaths = results.map(path => path.pathId);
    const checkIfAddPath = formPaths.filter(path => !addedPaths.includes(parseInt(path)));
    const toDeletePath = addedPaths.filter(path => !formPaths.includes(path));

    if (toDeletePath.length > 0) {
      const toDeletePathMap = toDeletePath.map(path => [id, path]);
      const sql = 'DELETE FROM vineyards_paths WHERE (vineyardId, pathId) IN (?)';
      connection.query(sql, [toDeletePathMap], function (err) {
        if (err) {
          throw err;
        }
      });
    }

    if (checkIfAddPath.length > 0) {
      const sql = 'INSERT INTO vineyards_paths (vineyardId, pathId) VALUES ?';
      const pathsToAddArray = checkIfAddPath.map(path => [id, path]);
      connection.query(sql, [pathsToAddArray], function (err) {
        if (err) {
          throw err;
        }
      });
    }
  });

  connection.query('SELECT vineyardId, winetypeId, winetypeType FROM vineyards_winetypes WHERE vineyardId = ?', id, function (error, results) {
    const filterWhiteResults = results.filter(winetypesWhite => winetypesWhite.winetypeType === 1);
    const filterRedResults = results.filter(winetypesRed => winetypesRed.winetypeType === 2);
    const wineTypesWhiteToAdd = filterWhiteResults.map(winetype => winetype.winetypeId);
    const wineTypesRedToAdd = filterRedResults.map(winetype => winetype.winetypeId);
    const checkIfAddWhite = wineTypesWhite.filter(winetype => !wineTypesWhiteToAdd.includes(parseInt(winetype)));
    const checkIfAddWhite2 = checkIfAddWhite.map(winetype => [id, parseInt(winetype), 1]);
    const checkIfAddRed = wineTypesRed.filter(winetype => !wineTypesRedToAdd.includes(parseInt(winetype)));
    const checkIfAddRed2 = checkIfAddRed.map(winetype => [id, parseInt(winetype), 2]);
    const allAddedWinetypesPerVineyardId = results.filter(winetype => winetype.vineyardId === id);
    const allAddedWinetypesPerVineyardIdMapId = allAddedWinetypesPerVineyardId.map(winetype => [winetype.winetypeId, id]);
    const allWineTypesFromForm = [...wineTypesWhite, ...wineTypesRed];
    const allWineTypesFromFormInt = allWineTypesFromForm.map(winetype => parseInt(winetype));
    const toDeleteWineTypes = allAddedWinetypesPerVineyardIdMapId.filter(winetype => !allWineTypesFromFormInt.includes(winetype[0]));
    const dataArray = [...checkIfAddRed2, ...checkIfAddWhite2];

    if (toDeleteWineTypes.length > 0) {
      const sql = 'DELETE FROM vineyards_winetypes WHERE (winetypeId, vineyardId) IN (?)';
      connection.query(sql, [toDeleteWineTypes], function (err) {
        if (err) {
          throw err;
        }
      });
    }
    if (dataArray.length > 0) {
      const sql = 'INSERT INTO vineyards_winetypes (vineyardId, winetypeId, winetypeType) VALUES ?';
      connection.query(sql, [dataArray], function (err) {
        if (err) {
          throw err;
        }
      });
    }
  });

  const query = `UPDATE vineyards SET ? WHERE id=?;`;
  const post = {
    name: name,
    owners: owners,
    yearOpen: yearOpen,
    sqm: sqm,
    postal: postal,
    provinceId: provinceId,
    address: address,
    city: city,
    location: location,
    phone: phone,
    email: email,
    www: www,
    facebook: facebook,
    instagram: instagram,
    groundTilt: groundTilt,
    elevation: elevation,
    groundTiltDirection: groundTiltDirection,
    groundType: groundType,
    vineyardDescription: description
  };
  connection.query(query, [post, id], function (error, rows) {
    if (error) {
      result(error, null);
    }
    else {
      result(null, {});
    }
  });
};

BackOffice.deleteSpecificFile = (body, result) => {
  if (body.params.from === 'VINEYARD_EDIT') {
    const sql = 'DELETE FROM vineyards_photos WHERE vineyardId = ? AND photoFile = ?';
    connection.query(sql, [body.body.vineyardId, body.body.file], function (error, results) {
      if (error) {
        result(null, error);
      } else {
        result({}, null);
      }
    });
  }
}

BackOffice.getVineyardById = (id, result) => {
  const defaultFields = `
    vineyards.id,
        vineyards.name,
       vineyards.dateAdd,
        vineyards.location,
        vineyards.provinceId,
         vineyards.tastings,
         vineyards.yearOpen,
        vineyards.owners, 
         vineyards.elevation, 
         vineyards.sightseeing,
         vineyards.meals,
         vineyards.postal,
         vineyards.address,
         vineyards.city,
        vineyards.sqm, 
       vineyards.events, 
         vineyards.additional,
         vineyards.phone,
         vineyards.email,
          vineyards.www,
          vineyards.facebook,
          vineyards.instagram,
          vineyards.groundTilt,
          vineyards.groundTiltDirection,
          vineyards.groundType,
          vineyards.vineyardDescription,
        vineyards.accommodation, 
       vineyards.sale`;

  const defaultFields2 = `
    winetypes.title,
        winetypes.id,
        winetypes.colour,
        winetypes.colour,
        winetypes.isImportant,
        winetypes.isActive,
        winetypes.sort
        `;

  const defaultFields3 = `
    organizations.name,
        organizations.id,
        organizations.isActive,
        organizations.sort
        `;

  const defaultFields4 = `
    paths.name,
        paths.id,
        paths.isActive,
        paths.sort
        `;

  const query = `SELECT ${defaultFields} FROM vineyards WHERE vineyards.id = ? LIMIT 1;
    SELECT * FROM winetypes;
    SELECT * FROM organizations;
    SELECT * FROM paths;
    SELECT ${defaultFields2} FROM vineyards_winetypes LEFT JOIN winetypes ON vineyards_winetypes.winetypeId=winetypes.id WHERE vineyards_winetypes.vineyardId = ? GROUP BY vineyards_winetypes.winetypeId;
    SELECT ${defaultFields3} FROM vineyards_organizations LEFT JOIN organizations ON vineyards_organizations.organizationId=organizations.id WHERE vineyards_organizations.vineyardId = ? GROUP BY vineyards_organizations.organizationId;
    SELECT ${defaultFields4} FROM vineyards_paths LEFT JOIN paths ON vineyards_paths.pathId=paths.id WHERE vineyards_paths.vineyardId = ? GROUP BY vineyards_paths.pathId;
    SELECT photoFile FROM vineyards_photos WHERE vineyardId = ?;
    SELECT featureId FROM vineyards_features WHERE vineyardId = ?;
     `;

  connection.query(query, [id, id, id, id, id, id], function (error, results) {
    if (error) {
      result(null, error);
    }
    else {
      const parseItems = results[0].map(item => {
        const location = item.location.split(',');
        const features = results[8].map(feature => feature.featureId);
        item.isActive = item.isActive === 2;
        item.location = [parseFloat(location[0]), parseFloat(location[1].replace(/\s+/g, ''))];
        if (item.accommodation === 2) {
          item.features.push(featuresIndex('accommodation'));
        }
        if (item.additional === 2) {
          item.features.push(featuresIndex('additional'));
        }
        if (item.events === 2) {
          item.features.push(featuresIndex('events'));
        }
        if (item.meals === 2) {
          item.features.push(featuresIndex('meals'));
        }
        if (item.sightseeing === 2) {
          item.features.push(featuresIndex('sightseeing'));
        }
        if (item.tastings === 2) {
          item.features.push(featuresIndex('tastings'));
        }
        if (item.sale === 2) {
          item.features.push(featuresIndex('sale'));
        }
        item.allWineTypes = results[1];
        item.wineTypes = results[4];
        item.allOrganizations = results[2];
        item.allPaths = results[3];
        item.organizations = results[5];
        item.paths = results[6];
        item.photos = results[7].map(photo => {
          return {
            uid: Math.random(),
            name: photo.photoFile,
            thumbUrl: photo.photoFile
          };
        });
        item.features = features
        delete item.meals
        delete item.events
        delete item.additional
        delete item.accommodation
        delete item.sightseeing
        delete item.tastings
        delete item.sale
        return item
      });
      result(parseItems[0], null)
    }
  })
}

module.exports = BackOffice
