require('dotenv').config();
const connection = require('../config/db.config');


const BackOffice = news => {
    this.id = news.id;
    this.type = news.type;
    this.message = news.message;
};

BackOffice.loginAdmin = result => {
    result(
        {
            token: Math.random(),
        },
        null
    );
};

BackOffice.getAllRequiredData = result => {
    const query = `SELECT * FROM winetypes;
    SELECT * FROM organizations;
    SELECT * FROM paths;
    `;

    connection.query(query, (error, results) => {
        if (error) {
            result(null, error);
        }
        else {
            const returnData = {
                allWineTypes: results[0],
                allOrganizations: results[1],
                allPaths: results[2],
            };
            result(returnData, null);
        }
    });
};

BackOffice.getAllVineyards = result => {
    const defaultFields = `
     vineyards.id,
     vineyards.name,
     vineyards.dateAdd,
     vineyards.provinceId,
     vineyards.isActive, 
     (SELECT COUNT(vineyards_paths.pathId) FROM vineyards_paths WHERE vineyards_paths.vineyardId = vineyards.id) as paths, 
     (SELECT COUNT(vineyards_organizations.organizationId) FROM vineyards_organizations WHERE vineyards_organizations.vineyardId = vineyards.id) as organizations
     `;

    connection.query(`SELECT ${defaultFields} FROM vineyards`, (error, results) => {
        if (error) {
            result(error, null);
        }
        else {
            result(results, null);
        }
    });
};

BackOffice.uploadVineyardImage = (req, result) => {
    if (req.body.vineyardId) {
        const post = {
            vineyardId: req.body.vineyardId,
            photoFile: req.file.filename,
        };
        connection.query('INSERT INTO vineyards_photos SET ?', post, error => {
            if (error) {
                result(null, error);
            }
            else {
                const moreFile = {
                    filename: req.file.filename,
                    thumbUrl: `https://polskiewinnice.ovh/images/${req.file.filename}`,
                    uid: Math.random() + Math.random() + Math.random(),
                };
                result(moreFile, null);
            }
        });
        result(req.file, null);
    }
    else {
        const moreFile = {
            filename: req.file.filename,
            thumbUrl: `https://polskiewinnice.ovh/images/${req.file.filename}`,
            uid: Math.random() + Math.random() + Math.random(),
            name: req.file.filename,
        };
        result(moreFile, null);
    }
};

BackOffice.createVineyard = (req, result) => {
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
        isActive,
        groundTiltDirection,
        groundType,
        description,
        wineTypesWhite,
        wineTypesRed,
        organizations,
        paths,
        features,
        files,
    } = req.body.values;
    const locationMerge = `${locationX}, ${locationY}`;
    const formFeatures = features.map(feature => parseInt(feature));
    const values = {
        location: locationMerge,
        name,
        yearOpen,
        owners,
        sqm,
        postal,
        provinceId,
        address,
        city,
        isActive: isActive ? 2 : 1,
        phone: phone || '',
        email: email || '',
        www: www || '',
        facebook: facebook || '',
        instagram: instagram || '',
        groundTilt: groundTilt || '',
        elevation: elevation || '',
        groundTiltDirection: groundTiltDirection || '',
        groundType: groundType || '',
        vineyardDescription: description || '',
    };

    connection.query('INSERT INTO vineyards SET ?', values, (error, results) => {
        if (error) {
            result(error, null);
        }
        else {
            if(results.insertId) {
                if (formFeatures.length > 0) {
                    const featuresToAddArray = formFeatures.map(path => [results.insertId, path]);
                    connection.query('INSERT INTO vineyards_features (vineyardId, featureId) VALUES ?', [featuresToAddArray], err => {
                        if (err) {
                            throw err;
                        }
                    });
                }
                if (organizations && organizations.length > 0) {
                    const organizationsToAddArray = organizations.map(organization => [results.insertId, organization]);
                    connection.query('INSERT INTO vineyards_organizations (vineyardId, organizationId) VALUES ?', [organizationsToAddArray], err => {
                        if (err) {
                            throw err;
                        }
                    });
                }
                if (paths && paths.length > 0) {
                    const pathsToAddArray = paths.map(path => [results.insertId, path]);
                    connection.query('INSERT INTO vineyards_paths (vineyardId, pathId) VALUES ?', [pathsToAddArray], err => {
                        if (err) {
                            throw err;
                        }
                    });
                }
                if (files && files.fileList && files.fileList.length > 0) {
                    const filesToAddArray = files.fileList.map(file => [results.insertId, file.name]);
                    connection.query('INSERT INTO vineyards_photos (vineyardId, photoFile) VALUES ?', [filesToAddArray], err => {
                        if (err) {
                            throw err;
                        }
                    });
                }
                if ((wineTypesWhite && wineTypesWhite.length > 0)) {
                    const checkIfAddWhite = wineTypesWhite.map(winetype => [
                        results.insertId,
                        parseInt(winetype),
                        1,
                    ]);
                    connection.query('INSERT INTO vineyards_winetypes (vineyardId, winetypeId, winetypeType) VALUES ?', [checkIfAddWhite], err => {
                        if (err) {
                            throw err;
                        }
                    });
                }
                if ((wineTypesRed && wineTypesRed.length > 0)) {
                    const checkIfAddRed = wineTypesRed.map(winetype => [
                        results.insertId,
                        parseInt(winetype),
                        2,
                    ]);
                    connection.query('INSERT INTO vineyards_winetypes (vineyardId, winetypeId, winetypeType) VALUES ?', [checkIfAddRed], err => {
                        if (err) {
                            throw err;
                        }
                    });
                }
            }
            result(null, {
            });
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
        isActive,
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

    connection.query('SELECT vineyardId, organizationId FROM vineyards_organizations WHERE vineyardId = ?', id, (error, results) => {
        const formOrganizations = organizations.map(organization =>
            // eslint-disable-next-line radix
            parseInt(organization)
        );
        const addedOrganizations = results.map(
            organization => organization.organizationId
        );
        const checkIfAddOrganization = formOrganizations.filter(
            // eslint-disable-next-line radix
            organization => !addedOrganizations.includes(parseInt(organization))
        );
        const toDeleteOrganization = addedOrganizations.filter(
            organization => !formOrganizations.includes(organization)
        );

        if (toDeleteOrganization.length > 0) {
            const toDeleteOrganizationMap = toDeleteOrganization.map(
                organization => [id, organization]
            );
            connection.query('DELETE FROM vineyards_organizations WHERE (vineyardId, organizationId) IN (?)', [toDeleteOrganizationMap], err => {
                if (err) {
                    throw err;
                }
            });
        }

        if (checkIfAddOrganization.length > 0) {
            const organizationsToAddArray = checkIfAddOrganization.map(
                organization => [id, organization]
            );
            connection.query('INSERT INTO vineyards_organizations (vineyardId, organizationId) VALUES ?', [organizationsToAddArray], err => {
                if (err) {
                    throw err;
                }
            });
        }
    });

    connection.query('SELECT vineyardId, featureId FROM vineyards_features WHERE vineyardId = ?', id, (error, results) => {
        const formFeatures = features.map(feature => parseInt(feature));
        const addedFeatures = results.map(feature => feature.featureId);
        const checkIfAddFeature = formFeatures.filter(
            feature => !addedFeatures.includes(parseInt(feature))
        );
        const toDeleteFeature = addedFeatures.filter(
            feature => !formFeatures.includes(feature)
        );

        if (toDeleteFeature.length > 0) {
            const toDeleteFeatureMap = toDeleteFeature.map(feature => [
                id,
                feature,
            ]);
            connection.query('DELETE FROM vineyards_features WHERE (vineyardId, featureId) IN (?)', [toDeleteFeatureMap], err => {
                if (err) {
                    throw err;
                }
            });
        }

        if (checkIfAddFeature.length > 0) {
            const featuresToAddArray = checkIfAddFeature.map(path => [id, path]);
            connection.query('INSERT INTO vineyards_features (vineyardId, featureId) VALUES ?', [featuresToAddArray], err => {
                if (err) {
                    throw err;
                }
            });
        }
    });

    connection.query('SELECT vineyardId, pathId FROM vineyards_paths WHERE vineyardId = ?', id, (error, results) => {
        const formPaths = paths.map(path => parseInt(path));
        const addedPaths = results.map(path => path.pathId);
        const checkIfAddPath = formPaths.filter(
            path => !addedPaths.includes(parseInt(path))
        );
        const toDeletePath = addedPaths.filter(
            path => !formPaths.includes(path)
        );

        if (toDeletePath.length > 0) {
            const toDeletePathMap = toDeletePath.map(path => [id, path]);
            connection.query('DELETE FROM vineyards_paths WHERE (vineyardId, pathId) IN (?)', [toDeletePathMap], err => {
                if (err) {
                    throw err;
                }
            });
        }

        if (checkIfAddPath.length > 0) {
            const pathsToAddArray = checkIfAddPath.map(path => [id, path]);
            connection.query('INSERT INTO vineyards_paths (vineyardId, pathId) VALUES ?', [pathsToAddArray], err => {
                if (err) {
                    throw err;
                }
            });
        }
    });

    connection.query('SELECT vineyardId, winetypeId, winetypeType FROM vineyards_winetypes WHERE vineyardId = ?', id, (error, results) => {
        const filterWhiteResults = results.filter(
            winetypesWhite => winetypesWhite.winetypeType === 1
        );
        const filterRedResults = results.filter(
            winetypesRed => winetypesRed.winetypeType === 2
        );
        const wineTypesWhiteToAdd = filterWhiteResults.map(
            winetype => winetype.winetypeId
        );
        const wineTypesRedToAdd = filterRedResults.map(
            winetype => winetype.winetypeId
        );
        const checkIfAddWhite = wineTypesWhite.filter(
            winetype => !wineTypesWhiteToAdd.includes(parseInt(winetype))
        );
        const checkIfAddWhite2 = checkIfAddWhite.map(winetype => [
            id,
            parseInt(winetype),
            1,
        ]);
        const checkIfAddRed = wineTypesRed.filter(
            winetype => !wineTypesRedToAdd.includes(parseInt(winetype))
        );
        const checkIfAddRed2 = checkIfAddRed.map(winetype => [
            id,
            parseInt(winetype),
            2,
        ]);
        const allAddedWinetypesPerVineyardId = results.filter(
            winetype => winetype.vineyardId === id
        );
        const allAddedWinetypesPerVineyardIdMapId = allAddedWinetypesPerVineyardId.map(
            winetype => [winetype.winetypeId, id]
        );
        const allWineTypesFromForm = [...wineTypesWhite, ...wineTypesRed];
        const allWineTypesFromFormInt = allWineTypesFromForm.map(winetype =>
            parseInt(winetype)
        );
        const toDeleteWineTypes = allAddedWinetypesPerVineyardIdMapId.filter(
            winetype => !allWineTypesFromFormInt.includes(winetype[0])
        );
        const dataArray = [...checkIfAddRed2, ...checkIfAddWhite2];

        if (toDeleteWineTypes.length > 0) {
            const sql =
          'DELETE FROM vineyards_winetypes WHERE (winetypeId, vineyardId) IN (?)';
            connection.query(sql, [toDeleteWineTypes], err => {
                if (err) {
                    throw err;
                }
            });
        }
        if (dataArray.length > 0) {
            connection.query('INSERT INTO vineyards_winetypes (vineyardId, winetypeId, winetypeType) VALUES ?', [dataArray], err => {
                if (err) {
                    throw err;
                }
            });
        }
    }
    );

    const query = `UPDATE vineyards SET ? WHERE id=?;`;
    const post = {
        name,
        owners,
        yearOpen,
        sqm,
        postal,
        provinceId,
        address,
        city,
        location,
        isActive,
        phone,
        email,
        www,
        facebook,
        instagram,
        groundTilt,
        elevation,
        groundTiltDirection,
        groundType,
        vineyardDescription: description,
    };
    connection.query(query, [post, id], error => {
        if (error) {
            result(error, null);
        }
        else {
            result(null, {
            });
        }
    });
};

BackOffice.deleteSpecificFile = (body, result) => {
    if (body.params.from === 'VINEYARD_EDIT') {
        connection.query('DELETE FROM vineyards_photos WHERE vineyardId = ? AND photoFile = ?', [body.body.vineyardId, body.body.file], error => {
            if (error) {
                result(null, error);
            }
            else {
                result({
                }, null);
            }
        }
        );
    }
};

BackOffice.getVineyardById = (id, result) => {
    const defaultFields = `
    vineyards.id,
        vineyards.name,
       vineyards.dateAdd,
        vineyards.location,
        vineyards.provinceId,
         vineyards.yearOpen,
        vineyards.owners, 
         vineyards.elevation, 
         vineyards.postal,
         vineyards.isActive,
         vineyards.address,
         vineyards.city,
        vineyards.sqm, 
         vineyards.phone,
         vineyards.email,
          vineyards.www,
          vineyards.facebook,
          vineyards.instagram,
          vineyards.groundTilt,
          vineyards.groundTiltDirection,
          vineyards.groundType,
          vineyards.vineyardDescription`;

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
    SELECT ${defaultFields2} FROM vineyards_winetypes LEFT JOIN winetypes ON vineyards_winetypes.winetypeId=winetypes.id WHERE vineyards_winetypes.vineyardId = ? GROUP BY vineyards_winetypes.winetypeId;
    SELECT ${defaultFields3} FROM vineyards_organizations LEFT JOIN organizations ON vineyards_organizations.organizationId=organizations.id WHERE vineyards_organizations.vineyardId = ? GROUP BY vineyards_organizations.organizationId;
    SELECT ${defaultFields4} FROM vineyards_paths LEFT JOIN paths ON vineyards_paths.pathId=paths.id WHERE vineyards_paths.vineyardId = ? GROUP BY vineyards_paths.pathId;
    SELECT photoFile FROM vineyards_photos WHERE vineyardId = ?;
    SELECT featureId FROM vineyards_features WHERE vineyardId = ?;
     `;

    connection.query(query, [id, id, id, id, id, id], (error, results) => {
        if (error) {
            result(null, error);
        }
        else {
            const parseItems = results[0].map(item => {
                const location = item.location.split(',');
                const features = results[5].map(feature => feature.featureId);
                return {
                    ...item,
                    location: [
                        parseFloat(location[0]),
                        parseFloat(location[1].replace(/\s+/g, '')),
                    ],
                    isActive: item.isActive === 2,
                    paths: results[3],
                    wineTypes: results[1],
                    organizations: results[2],
                    photos: results[4].map(photo => ({
                        uid: Math.random(),
                        name: photo.photoFile,
                        thumbUrl: photo.photoFile,
                    })),
                    features,
                };
            });
            result(parseItems[0], null);
        }
    });
};

module.exports = BackOffice;
