require('dotenv')
    .config();
const connection = require('../config/db.config');
const fs = require('fs');
const dayjs = require('dayjs');
const listToArray = require('../helpers/listToArray.helper');

const BackOffice = news => {
    this.id = news.id;
    this.type = news.type;
    this.message = news.message;
};

BackOffice.loginAdmin = (req, result) => {
    if (req.body.username === 'admin' && req.body.password === 'Pantera11') {
        result(
            {
                token: Math.random(),
            },
            null,
        );
    }
    else {
        result(
            {
                error: 'WRONG_CREDENTIALS',
            },
            null,
        );
    }
};

BackOffice.deleteWineFromVineyard = (req, result) => {
    connection.query('DELETE FROM vineyards_wines WHERE vineyardId = ? AND wineId = ?', [req.body.data.vineyardId, req.body.data.wineId], error => {
        if (error) {
            result(null, error);
        }
        else {
            result({
            }, null);
        }
    });
};

BackOffice.deleteSpecificWine = (req, result) => {
    connection.query('DELETE FROM wines WHERE id = ?', [req.body.wineId], error => {
        if (error) {
            result(null, error);
        }
        else {
            result({
            }, null);
        }
    });
};

BackOffice.getAllRequiredData = result => {
    const query = `SET NAMES utf8;
    SELECT winetypes.*, COUNT(vineyards_winetypes.winetypeId) AS vineyardsAmount FROM winetypes LEFT JOIN vineyards_winetypes ON vineyards_winetypes.winetypeId = winetypes.id GROUP BY winetypes.id;
    SELECT organizations.*, COUNT(vineyards_organizations.vineyardId) AS vineyardsAmount FROM organizations LEFT JOIN vineyards_organizations ON vineyards_organizations.organizationId = organizations.id GROUP BY organizations.id;
    SELECT paths.*, COUNT(vineyards_paths.vineyardId) AS vineyardsAmount FROM paths LEFT JOIN vineyards_paths ON vineyards_paths.pathId = paths.id GROUP BY paths.id;
    SELECT meals.* FROM meals;
    SELECT id, name FROM provinces;
    `;


    connection.query(query, (error, results) => {
        if (error) {
            result(null, error);
        }
        else {
            const returnData = {
                allStrains: results[1],
                allOrganizations: results[2],
                allPaths: results[3],
                allProvinces: results[5],
                allMeals: results[4],
            };
            result(returnData, null);
        }
    });
};


BackOffice.getNewsCategoryById = (data, result) => {
    const defaultFields = `
        id,
        isActive,
        sort,
        name
    `;
    connection.query(`SET NAMES utf8; SELECT ${defaultFields} FROM news_categories WHERE id = ? LIMIT 1`, data.id, (error, results) => {
        if (error) {
            result(error, null);
        }
        else {
            result(results[1][0], null);
        }
    });
};

BackOffice.editNewsCategoryById = (data, result) => {
    const { id } = data;
    const {
        name,
        sort,
        isActive,
    } = data.values;
    const query = `UPDATE news_categories SET ? WHERE id = ?`;
    const post = {
        name,
        isActive,
        sort,
    };
    connection.query(query, [post, id], error => {
        if (error) {
            result(null, error);
        }
        else {
            result({
            }, null);
        }
    });
};


BackOffice.getAllNewsCategories = (req, result) => {
    const defaultFields = `
        id,
        isActive,
        sort,
        name
    `;

    connection.query(`SET NAMES utf8; SELECT ${defaultFields} FROM news_categories`, (error, results) => {
        if (error) {
            result(error, null);
        }
        else {
            result(results[1], null);
        }
    });
};

BackOffice.getAllNews = result => {
    const defaultFields = `
        id,
        externalId,
        message,
        dateAdd,
        url,
        image,
        isActive,
        likesCount,
        commentsCount,
        type
    `;
    connection.query(`SET NAMES utf8; SELECT ${defaultFields} FROM news`, (error, results) => {
        if (error) {
            result(null, error);
        }
        else {
            result(results[1], null);
        }
    });
};

BackOffice.getAllWines = result => {
    const defaultFields = `
       wines.id,
        wines.name, 
        wines.taste,
        wines.type,       
        wines.isActive,
        GROUP_CONCAT(wines_strains.strainId) AS strains,
        GROUP_CONCAT(wines_meals.mealId) AS meals,
        GROUP_CONCAT(wines_provinces.provinceId) AS provinces
     `;

    connection.query(`SET NAMES utf8;
     SELECT ${defaultFields} FROM wines
     LEFT JOIN wines_strains ON wines.id=wines_strains.wineId
     LEFT JOIN wines_meals ON wines.id=wines_meals.wineId
     LEFT JOIN wines_provinces ON wines.id=wines_provinces.wineId
     GROUP BY wines.id
      `, (error, results) => {
        if (error) {
            result(error, null);
        }
        else {
            const parseItems = results[1].map(item => ({
                ...item,
                provinces: [...new Set(listToArray(item.provinces, ','))],
                strains: [...new Set(listToArray(item.strains, ','))],
                meals: [...new Set(listToArray(item.meals, ','))],
            }));
            result(parseItems, null);
        }
    });
};

BackOffice.getAllVineyards = result => {
    const query = `
        SET NAMES utf8;
        SELECT vineyards.id,
        vineyards.name,
        vineyards.dateAdd,
        vineyards.provinceId,
        vineyards.isActive, 
        (SELECT COUNT(vineyards_paths.pathId) FROM vineyards_paths WHERE vineyards_paths.vineyardId = vineyards.id) as paths, 
        (SELECT COUNT(vineyards_organizations.organizationId) FROM vineyards_organizations WHERE vineyards_organizations.vineyardId = vineyards.id) as organizations
        FROM vineyards;
     `;

    connection.query(query, (error, results) => {
        if (error) {
            result(error, null);
        }
        else {
            result(results[1], null);
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
                    thumbUrl: `https://polskiewinnice.ovh/images_preview/${req.file.filename}`,
                    uid: Math.random() + Math.random() + Math.random(),
                };
                result(moreFile, null);
            }
        });
    }
    else {
        const moreFile = {
            filename: req.file.filename,
            thumbUrl: `https://polskiewinnice.ovh/images_preview/${req.file.filename}`,
            uid: Math.random() + Math.random() + Math.random(),
            name: req.file.filename,
        };
        result(moreFile, null);
    }
};

BackOffice.createWineType = (req, result) => {
    const {
        title,
        sort,
        isActive,
        colour,
    } = req.body.values;
    const values = {
        title,
        isActive: isActive || 0,
        sort,
        colour,
    };

    // eslint-disable-next-line no-unused-vars
    connection.query('INSERT INTO winetypes SET ?', values, (error, results) => {
        if (error) {
            result(error, null);
        }
        else {
            result(null, {
            });
        }
    });
};

BackOffice.createWine = (req, result) => {
    const {
        name,
        isActive,
        years,
        price,
        meals,
        provinces,
        wineTypes,
        taste,
        features,
        wineTypesWhite,
        wineTypesRed,
    } = req.body.values;
    const values = {
        isActive: isActive || 0,
        name,
        year: years,
        price,
        type: wineTypes,
        taste,
        dateAdd: new Date(),
    };

    const insertNewWine = () => new Promise((resolve, reject) => {
        connection.query('SET NAMES utf8; INSERT INTO wines SET ?;', values, (error, results) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results[1].insertId);
            }
        });
    });

    const insertWinesStrains = insertId => new Promise((resolve, reject) => {
        const strainsToAdd = [];
        if (wineTypesWhite && wineTypesWhite.length > 0) {
            strainsToAdd.push(wineTypesWhite.map(item => [insertId, item]));
        }
        if (wineTypesRed && wineTypesRed.length > 0) {
            strainsToAdd.push(wineTypesRed.map(item => [insertId, item]));
        }
        if (strainsToAdd.length > 0) {
            connection.query('INSERT INTO wines_strains (wineId, strainId) VALUES ?', strainsToAdd, error => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve();
                }
            });
        }
        else {
            resolve();
        }
    });

    const insertFeatures = insertId => new Promise((resolve, reject) => {
        if (features && features.length > 0) {
            const featuresToAddArray = features.map(item => [insertId, item]);
            connection.query('INSERT INTO wines_additional_features (wineId, featureId) VALUES ?', [featuresToAddArray], error => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve();
                }
            });
        }
    });

    const insertNewMeal = insertId => new Promise((resolve, reject) => {
        if (meals && meals.length > 0) {
            const mealsToAddArray = meals.map(item => [insertId, item]);
            connection.query('INSERT INTO wines_meals (wineId, mealId) VALUES ?', [mealsToAddArray], error => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve();
                }
            });
        }
    });

    const insertNewProvinces = insertId => new Promise((resolve, reject) => {
        if (provinces && provinces.length > 0) {
            const provincesToAddArray = provinces.map(item => [insertId, item]);
            connection.query('INSERT INTO wines_provinces (wineId, provinceId) VALUES ?', [provincesToAddArray], error => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve();
                }
            });
        }
    });

    const addRestOfData = data => {
        Promise.all([
            insertNewMeal(data),
            insertNewProvinces(data),
            insertFeatures(data),
            insertWinesStrains(data),
        ]).then(() => true).catch(() => false);
    };

    insertNewWine().then(data => {
        addRestOfData(data);
    }).then(() => {
        result(null, {
        });
    }).catch(error => {
        result(error, null);
    });
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
        isActive,
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
        dateAdd: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    };


    const insertNewData = () => new Promise((resolve, reject) => {
        connection.query('INSERT INTO vineyards SET ?', values, (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.insertId);
        });
    }).then(insertId => {
        if (formFeatures.length > 0) {
            const featuresToAddArray = formFeatures.map(path => [insertId, path]);
            connection.query('INSERT INTO vineyards_features (vineyardId, featureId) VALUES ?', [featuresToAddArray], err => {
                if (err) {
                    throw err;
                }
            });
        }
        return insertId;
    }).then(insertId => {
        if (organizations && organizations.length > 0) {
            const organizationsToAddArray = organizations.map(organization => [insertId, organization]);
            connection.query('INSERT INTO vineyards_organizations (vineyardId, organizationId) VALUES ?', [organizationsToAddArray], err => {
                if (err) {
                    throw err;
                }
            });
        }
        return insertId;
    }).then(insertId => {
        if (paths && paths.length > 0) {
            const pathsToAddArray = paths.map(path => [insertId, path]);
            connection.query('INSERT INTO vineyards_paths (vineyardId, pathId) VALUES ?', [pathsToAddArray], err => {
                if (err) {
                    throw err;
                }
            });
        }
        return insertId;
    }).then(insertId => {
        if (files && files.fileList && files.fileList.length > 0) {
            const filesToAddArray = files.fileList.map(file => [insertId, file.name]);
            connection.query('INSERT INTO vineyards_photos (vineyardId, photoFile) VALUES ?', [filesToAddArray], err => {
                if (err) {
                    throw err;
                }
            });
        }
        return insertId;
    }).then(insertId => {
        if ((wineTypesWhite && wineTypesWhite.length > 0)) {
            const checkIfAddWhite = wineTypesWhite.map(winetype => [insertId, parseInt(winetype), 1]);
            connection.query('INSERT INTO vineyards_winetypes (vineyardId, winetypeId, winetypeType) VALUES ?', [checkIfAddWhite], err => {
                if (err) {
                    throw err;
                }
            });
        }
        return insertId;
    }).then(insertId => {
        if ((wineTypesRed && wineTypesRed.length > 0)) {
            const checkIfAddRed = wineTypesRed.map(winetype => [insertId, parseInt(winetype), 2]);
            connection.query('INSERT INTO vineyards_winetypes (vineyardId, winetypeId, winetypeType) VALUES ?', [checkIfAddRed], err => {
                if (err) {
                    throw err;
                }
            });
        }
        return true;
    });

    insertNewData().then(() => {
        result(null, {
        });
    });
};

BackOffice.createOrganization = (req, result) => {
    const {
        name,
        isActive,
        sort,
    } = req.body.values;

    const values = {
        name,
        isActive: isActive || 0,
        sort,
    };

    connection.query('INSERT INTO organizations SET ?', values, error => {
        if (error) {
            result(error, null);
        }
        else {
            result(null, {
            });
        }
    });
};

BackOffice.createNewsCategory = (req, result) => {
    const {
        name,
        isActive,
        sort,
    } = req.body.values;

    const values = {
        name,
        isActive: isActive || 0,
        sort,
    };

    connection.query('INSERT INTO news_categories SET ?', values, error => {
        if (error) {
            result(error, null);
        }
        else {
            result(null, {
            });
        }
    });
};

BackOffice.createPath = (req, result) => {
    const {
        name,
        isActive,
        sort,
        bounds,
    } = req.body.values;

    const values = {
        name,
        isActive: isActive || 0,
        sort,
        bounds: JSON.stringify(bounds) || '',
    };

    connection.query('INSERT INTO paths SET ?', values, error => {
        if (error) {
            result(error, null);
        }
        else {
            result(null, {
            });
        }
    });
};

BackOffice.updateOrganizationById = (req, result) => {
    const { id } = req.body;
    const {
        name,
        sort,
        isActive,
    } = req.body.values;
    const query = `UPDATE organizations SET ? WHERE id=?;`;
    const post = {
        name,
        isActive,
        sort,
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

BackOffice.getWineById = (id, result) => {
    if (id) {
        const defaultFields = `
            id,
            name,
            isActive,
            type,
            year,
            price,
            taste
        `;

        const sql = `        
            SELECT ${defaultFields} FROM wines WHERE id = ?;
            SELECT wines_meals.mealId, meals.name FROM wines_meals LEFT JOIN meals ON wines_meals.mealId = meals.id WHERE wines_meals.wineId = ? GROUP BY wines_meals.mealId;
            SELECT wines_provinces.provinceId, provinces.name FROM wines_provinces LEFT JOIN provinces ON provinces.id = wines_provinces.provinceId WHERE wines_provinces.wineId = ? GROUP BY wines_provinces.provinceId;
            SELECT wines_additional_features.featureId FROM wines_additional_features WHERE wines_additional_features.wineId = ?;
            SELECT wines_strains.strainId, winetypes.name, winetypes.colour FROM wines_strains LEFT JOIN winetypes ON winetypes.id = wines_strains.strainId WHERE wines_strains.wineId = ? GROUP BY wines_strains.strainId;
            SELECT vineyards_wines.vineyardId, vineyards.name FROM vineyards_wines LEFT JOIN vineyards ON vineyards_wines.vineyardId = vineyards.id WHERE vineyards_wines.wineId = ? GROUP BY vineyards_wines.vineyardId;
        `;

        connection.query(sql, [id, id, id, id, id, id], (error, results) => {
            if (error) {
                result(null, error);
            }
            else {
                const parseItems = results[0].map(item => ({
                    ...item,
                    meals: results[1],
                    provinces: results[2],
                    price: item.price.toString(),
                    type: item.type.toString(),
                    taste: item.taste.toString(),
                    strains: results[4].map(strain => ({
                        ...strain,
                        strainId: strain.strainId.toString(),
                    })),
                    features: results[3],
                    vineyards: results[5],
                }));
                result(parseItems, null);
            }
        });

    }
    else {
        result(null, {
        });
    }
};

BackOffice.updateWineById = (req, result) => {
    const { id } = req.body;
    const {
        name,
        isActive,
        meals,
        years,
        price,
        provinces,
        wineTypes,
        taste,
        features,
        wineTypesRed,
        wineTypesWhite,
    } = req.body.values;

    const parseMeals = () => new Promise((resolve, reject) => {
        connection.query('SELECT wineId, mealId FROM wines_meals WHERE wineId = ?', id, (error, results) => {
            if (error) {
                reject(error);
            }
            const formMeals = meals.map(item => parseInt(item));
            const addedMeals = results.map(item => item.mealId);
            const checkIfAddMeal = formMeals.filter(item => !addedMeals.includes(parseInt(item)));
            const toDeleteMeal = addedMeals.filter(item => !formMeals.includes(item));
            resolve({
                toDeleteMeal,
                checkIfAddMeal,
            });
        });
    }).then(data => {
        if (data.toDeleteMeal.length > 0) {
            const toDeleteMealMap = data.toDeleteMeal.map(item => [id, item]);
            connection.query('DELETE FROM wines_meals WHERE (wineId, mealId) IN (?)', [toDeleteMealMap], err => {
                if (err) {
                    throw err;
                }
            });
        }
        return data.checkIfAddMeal;
    }).then(checkIfAddMeal => {
        if (checkIfAddMeal.length > 0) {
            const mealToAddArray = checkIfAddMeal.map(item => [id, item]);
            connection.query('INSERT INTO wines_meals (wineId, mealId) VALUES ?', [mealToAddArray], err => {
                if (err) {
                    throw err;
                }
            });
        }
    });

    const parseProvinces = () => new Promise((resolve, reject) => {
        connection.query('SELECT wineId, provinceId FROM wines_provinces WHERE wineId = ?', id, (error, results) => {
            if (error) {
                reject(error);
            }
            const formData = provinces.map(item => parseInt(item));
            const addedData = results.map(item => item.provinceId);
            const checkIfAddData = formData.filter(item => !addedData.includes(parseInt(item)));
            const toDeleteData = addedData.filter(item => !formData.includes(item));
            resolve({
                toDeleteData,
                checkIfAddData,
            });
        });
    }).then(data => {
        if (data.toDeleteData.length > 0) {
            const toDeleteDataMap = data.toDeleteData.map(item => [id, item]);
            connection.query('DELETE FROM wines_provinces WHERE (wineId, provinceId) IN (?)', [toDeleteDataMap], err => {
                if (err) {
                    throw err;
                }
            });
        }
        return data.checkIfAddData;
    }).then(checkIfAddData => {
        if (checkIfAddData.length > 0) {
            const dataToAddArray = checkIfAddData.map(item => [id, item]);
            connection.query('INSERT INTO wines_provinces (wineId, provinceId) VALUES ?', [dataToAddArray], err => {
                if (err) {
                    throw err;
                }
            });
        }
    });

    const parseFeatures = () => new Promise((resolve, reject) => {
        connection.query('SELECT wineId, featureId FROM wines_additional_features WHERE wineId = ?', id, (error, results) => {
            if (error) {
                reject(error);
            }
            const formData = features.map(item => parseInt(item));
            const addedData = results.map(item => item.featureId);
            const checkIfAddData = formData.filter(item => !addedData.includes(parseInt(item)));
            const toDeleteData = addedData.filter(item => !formData.includes(item));
            resolve({
                toDeleteData,
                checkIfAddData,
            });
        });
    }).then(data => {
        if (data.toDeleteData.length > 0) {
            const toDeleteDataMap = data.toDeleteData.map(item => [id, item]);
            connection.query('DELETE FROM wines_additional_features WHERE (wineId, featureId) IN (?)', [toDeleteDataMap], err => {
                if (err) {
                    throw err;
                }
            });
        }
        return data.checkIfAddData;
    }).then(checkIfAddData => {
        if (checkIfAddData.length > 0) {
            const dataToAddArray = checkIfAddData.map(item => [id, item]);
            connection.query('INSERT INTO wines_additional_features (wineId, featureId) VALUES ?', [dataToAddArray], err => {
                if (err) {
                    throw err;
                }
            });
        }
    });

    const parseStrains = () => new Promise((resolve, reject) => {
        connection.query('SELECT wineId, strainId FROM wines_strains WHERE wineId = ?', id, (error, results) => {
            if (error) {
                reject(error);
            }
            const wineTypesConcat = [...wineTypesRed, ...wineTypesWhite];
            const formData = wineTypesConcat.map(item => parseInt(item));
            const addedData = results.map(item => item.strainId);
            const checkIfAddData = formData.filter(item => !addedData.includes(parseInt(item)));
            const toDeleteData = addedData.filter(item => !formData.includes(item));
            resolve({
                toDeleteData,
                checkIfAddData,
            });
        });
    }).then(data => {
        if (data.toDeleteData.length > 0) {
            const toDeleteDataMap = data.toDeleteData.map(item => [id, item]);
            connection.query('DELETE FROM wines_strains WHERE (wineId, strainId) IN (?)', [toDeleteDataMap], err => {
                if (err) {
                    throw err;
                }
            });
        }
        return data.checkIfAddData;
    }).then(checkIfAddData => {
        if (checkIfAddData.length > 0) {
            const dataToAddArray = checkIfAddData.map(item => [id, item]);
            connection.query('INSERT INTO wines_strains (wineId, strainId) VALUES ?', [dataToAddArray], err => {
                if (err) {
                    throw err;
                }
            });
        }
    });

    Promise.all([
        parseMeals(),
        parseProvinces(),
        parseFeatures(),
        parseStrains(),
    ]).then(() => {
        const query = `SET NAMES utf8; UPDATE wines SET ? WHERE id=?;`;
        const post = {
            name,
            isActive,
            price,
            year: years,
            type: wineTypes,
            taste,
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
    });
};

BackOffice.updateWineTypeById = (req, result) => {
    const { id } = req.body;
    const {
        title,
        sort,
        isActive,
        colour,
    } = req.body.values;
    const query = `UPDATE winetypes SET ? WHERE id=?;`;
    const post = {
        title,
        isActive,
        sort,
        colour,
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

BackOffice.updatePathById = (req, result) => {
    try {
        const { id } = req.body;
        const {
            name,
            sort,
            isActive,
            bounds,
        } = req.body.values;
        const query = `UPDATE paths SET ? WHERE id=?;`;
        const post = {
            name,
            isActive,
            sort,
            bounds: JSON.stringify(bounds) || '',
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
    }
    catch (e) {
        result(e, null);
    }
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

    const parseOrganisations = () => new Promise((resolve, reject) => {
        connection.query('SELECT vineyardId, organizationId FROM vineyards_organizations WHERE vineyardId = ?', id, (error, results) => {
            if (error) {
                reject(error);
            }
            const formOrganizations = organizations.map(organization => parseInt(organization));
            const addedOrganizations = results.map(organization => organization.organizationId);
            const checkIfAddOrganization = formOrganizations.filter(organization => !addedOrganizations.includes(parseInt(organization)));
            const toDeleteOrganization = addedOrganizations.filter(organization => !formOrganizations.includes(organization));
            resolve({
                toDeleteOrganization,
                checkIfAddOrganization,
            });
        });
    }).then(data => {
        if (data.toDeleteOrganization.length > 0) {
            const toDeleteOrganizationMap = data.toDeleteOrganization.map(organization => [id, organization]);
            connection.query('DELETE FROM vineyards_organizations WHERE (vineyardId, organizationId) IN (?)', [toDeleteOrganizationMap], err => {
                if (err) {
                    throw err;
                }
            });
        }
        return data.checkIfAddOrganization;
    }).then(checkIfAddOrganization => {
        if (checkIfAddOrganization.length > 0) {
            const organizationsToAddArray = checkIfAddOrganization.map(organization => [id, organization]);
            connection.query('INSERT INTO vineyards_organizations (vineyardId, organizationId) VALUES ?', [organizationsToAddArray], err => {
                if (err) {
                    throw err;
                }
            });
        }
    });

    const parseFeatures = () => new Promise(resolve => {
        connection.query('SELECT vineyardId, featureId FROM vineyards_features WHERE vineyardId = ?', id, (error, results) => {
            const formFeatures = features.map(feature => parseInt(feature));
            const addedFeatures = results.map(feature => feature.featureId);
            const checkIfAddFeature = formFeatures.filter(feature => !addedFeatures.includes(parseInt(feature)));
            const toDeleteFeature = addedFeatures.filter(feature => !formFeatures.includes(feature));
            resolve({
                toDeleteFeature,
                checkIfAddFeature,
            });
        });
    }).then(data => {
        if (data.toDeleteFeature.length > 0) {
            const toDeleteFeatureMap = data.toDeleteFeature.map(feature => [id, feature]);
            connection.query('DELETE FROM vineyards_features WHERE (vineyardId, featureId) IN (?)', [toDeleteFeatureMap], err => {
                if (err) {
                    throw err;
                }
            });
        }
        return data.checkIfAddFeature;
    }).then(checkIfAddFeature => {
        if (checkIfAddFeature.length > 0) {
            const featuresToAddArray = checkIfAddFeature.map(path => [id, path]);
            connection.query('INSERT INTO vineyards_features (vineyardId, featureId) VALUES ?', [featuresToAddArray], err => {
                if (err) {
                    throw err;
                }
            });
        }
    });

    const parsePaths = () => new Promise(resolve => {
        connection.query('SELECT vineyardId, pathId FROM vineyards_paths WHERE vineyardId = ?', id, (error, results) => {
            const formPaths = paths && paths.length > 0 ? paths.map(path => parseInt(path)) : [];
            const addedPaths = results.map(path => path.pathId);
            const checkIfAddPath = formPaths.filter(path => !addedPaths.includes(parseInt(path)));
            const toDeletePath = addedPaths.filter(path => !formPaths.includes(path));
            resolve({
                checkIfAddPath, toDeletePath,
            });
        });
    }).then(data => {
        if (data.toDeletePath.length > 0) {
            const toDeletePathMap = data.toDeletePath.map(path => [id, path]);
            connection.query('DELETE FROM vineyards_paths WHERE (vineyardId, pathId) IN (?)', [toDeletePathMap], err => {
                if (err) {
                    throw err;
                }
            });
        }
        return data.checkIfAddPath;
    }).then(checkIfAddPath => {
        if (checkIfAddPath.length > 0) {
            const pathsToAddArray = checkIfAddPath.map(path => [id, path]);
            connection.query('INSERT INTO vineyards_paths (vineyardId, pathId) VALUES ?', [pathsToAddArray], err => {
                if (err) {
                    throw err;
                }
            });
        }
    });

    const parseWinetypes = () => new Promise(resolve => {
        connection.query('SELECT vineyardId, winetypeId, winetypeType FROM vineyards_winetypes WHERE vineyardId = ?', id, (error, results) => {
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
            resolve({
                toDeleteWineTypes, dataArray,
            });
        });
    }).then(data => {
        if (data.toDeleteWineTypes.length > 0) {
            connection.query('DELETE FROM vineyards_winetypes WHERE (winetypeId, vineyardId) IN (?)', [data.toDeleteWineTypes], err => {
                if (err) {
                    throw err;
                }
            });
        }
        return data.dataArray;
    }).then(dataArray => {
        if (dataArray.length > 0) {
            connection.query('INSERT INTO vineyards_winetypes (vineyardId, winetypeId, winetypeType) VALUES ?', [dataArray], err => {
                if (err) {
                    throw err;
                }
            });
        }
    });

    Promise.all([parseOrganisations(), parseFeatures(), parsePaths(), parseWinetypes()]).then(() => {
        const query = `SET NAMES utf8; UPDATE vineyards SET ? WHERE id=?;`;
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
            isActive: isActive || 0,
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
        });
    }
};

BackOffice.deleteSpecificOrganization = (body, result) => {
    if (body.body.vineyardId) {
        connection.query('DELETE FROM vineyards_organizations WHERE vineyardId = ? AND organizationId = ?', [body.body.vineyardId, body.params.id], error => {
            if (error) {
                result(null, error);
            }
            else {
                result({
                }, null);
            }
        });
    }
    else {
        connection.query('DELETE FROM organizations WHERE id = ?', body.params.id, error => {
            if (error) {
                result(null, error);
            }
            else {
                result({
                }, null);
            }
        });
    }
};

BackOffice.deleteSpecificPath = (body, result) => {
    if (body.body.vineyardId) {
        connection.query('DELETE FROM vineyards_paths WHERE vineyardId = ? AND pathId = ?', [body.body.vineyardId, body.params.id], error => {
            if (error) {
                result(null, error);
            }
            else {
                result({
                }, null);
            }
        });
    }
    else {
        connection.query('DELETE FROM paths WHERE id = ?', body.params.id, error => {
            if (error) {
                result(null, error);
            }
            else {
                result({
                }, null);
            }
        });
    }
};

BackOffice.deleteSpecificWineType = (body, result) => {
    if (body.body.vineyardId) {
        connection.query('DELETE FROM vineyards_winetypes WHERE vineyardId = ? AND winetypeId = ?', [body.body.vineyardId, body.params.id], error => {
            if (error) {
                result(null, error);
            }
            else {
                result({
                }, null);
            }
        });
    }
    else {
        connection.query('DELETE FROM winetypes WHERE id = ?', body.params.id, error => {
            if (error) {
                result(null, error);
            }
            else {
                result({
                }, null);
            }
        });
    }
};

BackOffice.deleteSpecificVineyard = (body, result) => {
    const query = `
        DELETE FROM vineyards_winetypes WHERE vineyardId = ?;
        DELETE FROM vineyards_paths WHERE vineyardId = ?;
        DELETE FROM vineyards_organizations WHERE vineyardId = ?;
        DELETE FROM vineyards_features WHERE vineyardId = ?;
        DELETE FROM vineyards WHERE id = ?;
    `;

    const deletePhotosArray = () => {
        connection.query('DELETE FROM vineyards_photos WHERE vineyardId = ?', body.params.id, error => {
            if (error) {
                result(null, error);
            }
            else {
                result({
                }, null);
            }
        });
    };

    // eslint-disable-next-line no-shadow
    connection.query(query, [body.params.id, body.params.id, body.params.id, body.params.id, body.params.id], (error, result) => {
        if (error) {
            result(null, error);
        }
        else {
            connection.query('SELECT photoFile FROM vineyards_photos WHERE vineyardId = ?', body.params.id, (errorPhoto, results) => {
                if (errorPhoto) {
                    result(null, errorPhoto);
                }
                else {
                    results.forEach(photo => {
                        const filePath = `public/upload/${photo.photoFile}`;
                        fs.unlink(filePath, err => {
                            if (err) {
                                console.error(err);
                            }
                        });
                    });
                    deletePhotosArray();
                }
            });
        }
    });
};

BackOffice.getOrganizationById = (id, result) => {
    const sql = `
    SELECT vineyards_organizations.vineyardId, vineyards.name, vineyards.isActive, vineyards.provinceId FROM vineyards_organizations LEFT JOIN vineyards ON vineyards.id = vineyards_organizations.vineyardId WHERE vineyards_organizations.organizationId = ? GROUP BY vineyards.id;
    SELECT id, name, isActive, sort FROM organizations WHERE id = ?;
    `;

    connection.query(sql, [id, id], (error, results) => {
        if (error) {
            result(null, error);
        }
        else {
            const parseItems = results[1].map(item => ({
                ...item,
                isActive: item.isActive === 1,
                vineyards: results[0],
            }));
            result(parseItems[0], null);
        }
    });
};

BackOffice.getPathById = (id, result) => {
    const sql = `
    SELECT vineyards_paths.vineyardId, vineyards.name, vineyards.isActive, vineyards.provinceId FROM vineyards_paths LEFT JOIN vineyards ON vineyards.id = vineyards_paths.vineyardId WHERE vineyards_paths.pathId = ? GROUP BY vineyards.id;
    SELECT id, name, isActive, sort, bounds FROM paths WHERE id = ?;
    `;

    connection.query(sql, [id, id], (error, results) => {
        if (error) {
            result(null, error);
        }
        else {
            const parseItems = results[1].map(item => ({
                ...item,
                isActive: item.isActive === 1,
                vineyards: results[0],
            }));
            result(parseItems[0], null);
        }
    });
};

BackOffice.getWineTypeById = (id, result) => {
    const sql = `
    SELECT vineyards_winetypes.vineyardId, vineyards.name, vineyards.isActive, vineyards.provinceId FROM vineyards_winetypes LEFT JOIN vineyards ON vineyards.id = vineyards_winetypes.vineyardId WHERE vineyards_winetypes.winetypeId = ? GROUP BY vineyards.id;
    SELECT id, title, isActive, sort, colour FROM winetypes WHERE id = ?;
    `;

    connection.query(sql, [id, id], (error, results) => {
        if (error) {
            result(null, error);
        }
        else {
            const parseItems = results[1].map(item => ({
                ...item,
                isActive: item.isActive === 1,
                vineyards: results[0],
            }));
            result(parseItems[0], null);
        }
    });
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

    const query = `SET NAMES utf8;
    SELECT ${defaultFields} FROM vineyards WHERE vineyards.id = ? LIMIT 1;
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
            const parseItems = results[1].map(item => {
                const location = item.location.split(',');
                const features = results[6].map(feature => feature.featureId);
                return {
                    ...item,
                    location: [
                        parseFloat(location[0]),
                        parseFloat(location[1].replace(/\s+/g, '')),
                    ],
                    paths: results[4],
                    wineTypes: results[2],
                    organizations: results[3],
                    photos: results[5].map(photo => ({
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
