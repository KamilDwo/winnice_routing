const Vineyard = require('../models/vineyard.models');


exports.findAll = function (req, res) {
    Vineyard.findAll((vineyard, err) => {
        if (err) {
            console.log('~~[MySQL error]~~ ', err.sqlMessage);
            res.status(500);
            res.end();
        }
        else {
            res.json(vineyard);
        }
    });
};

exports.findById = function (req, res) {
    Vineyard.findById(req.params.id, (vineyard, err) => {
        if (err) {
            console.log('~~[MySQL error]~~ ', err.sqlMessage);
            res.status(500);
            res.end();
        }
        else {
            res.json(vineyard);
        }
    });
};
