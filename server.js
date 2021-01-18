const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mysql = require('mysql2');
const speakingurl = require('speakingurl');

const app = express();
app.use(helmet());
app.use(bodyParser.json({defaultCharset: 'utf-8'}));
app.use(cors());
app.use(morgan('combined'));


const connection = mysql.createConnection({
    host: 'vilsone.home.pl',
    user: '11565381_winnice',
    password: '!w-SfX1JjPV8',
    database: '11565381_winnice'
});
connection.query('set names utf8');

const allowList = ['http://localhost:3000/', 'https://winnice.heartit.pl/'];
const corsOptionsDelegate = function (req, callback) {
    let corsOptions;
    if (allowList.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } ;
    } else {
        corsOptions = { origin: false } ;
    }
    callback(null, corsOptions);
};

app.post('/load-places/(:id)', cors(corsOptionsDelegate), (req, res) => {
    const id = req.params.id;
    connection.query('select' +
        ' id,' +
        ' name,' +
        ' date_add as "dateAdd",' +
        ' location,' +
        ' province_id as "provinceId",' +
        ' image_1 as "image1",' +
        ' tastings, ' +
        ' sightseeing, ' +
        ' meals, ' +
        ' events, ' +
        ' additional, ' +
        ' accommodation, ' +
        ' sale, ' +
        ' marker_id as "markerId"' +
        ' from pw_vineyard' +
        ` WHERE id = ${id} LIMIT 1`, function (err, object) {
        if (err) throw err;

        if (object && object[0]) {
            let obj = object[0];
            const features = [];
            const location = obj['location'].split(',');
            const objUrl = `${obj['id']}-${speakingurl(obj['name'], [])}`;
            obj['isActive'] = obj['isActive'] === 2;
            obj['markerId'] = obj['marker_id'];
            obj['location'] = [parseFloat(location[0]), parseFloat(location[1].replace(/\s+/g, ''))];
            obj['url'] = objUrl;
            if (obj['tastings'] === 2) {
                features.push('Tasting');
            }
            if (obj['sightseeing'] === 2) {
                features.push('Sightseeing');
            }
            if (obj['meals'] === 2) {
                features.push('Meals');
            }
            if (obj['sale'] === 2) {
                features.push('Sale');
            }
            if (obj['events'] === 2) {
                features.push('Events');
            }
            if (obj['additional'] === 2) {
                features.push('Additional');
            }
            if (obj['accommodation'] === 2) {
                features.push('Accommodation');
            }
            obj['features'] = features;
            delete obj['tastings'];
            delete obj['sightseeing'];
            delete obj['meals'];
            delete obj['sale'];
            delete obj['events'];
            delete obj['additional'];
            delete obj['accommodation'];
            res.send(obj);
        }
    })
});

app.post('/load-places', cors(corsOptionsDelegate), (req, res) => {
    connection.query('select' +
        ' id,' +
        ' name,' +
        ' date_add as "dateAdd",' +
        ' location,' +
        ' province_id as "provinceId",' +
        ' image_1 as "image1",' +
        ' tastings, ' +
        ' sightseeing, ' +
        ' meals, ' +
        ' events, ' +
        ' additional, ' +
        ' accommodation, ' +
        ' sale, ' +
        ' marker_id as "markerId"' +
        ' from pw_vineyard', function (err, rows) {
        if (err) throw err;
        if (rows) {
            const vineyards = rows.map(obj => {
                const features = [];
                const location = obj['location'].split(',');
                const objUrl = `${obj['id']}-${speakingurl(obj['name'], [])}`;
                obj['isActive'] = obj['isActive'] === 2;
                obj['markerId'] = obj['marker_id'];
                obj['location'] = [parseFloat(location[0]), parseFloat(location[1].replace(/\s+/g, ''))];
                obj['url'] = objUrl;

                if (obj['tastings'] === 2) {
                    features.push('Tasting');
                }
                if (obj['sightseeing'] === 2) {
                    features.push('Sightseeing');
                }
                if (obj['meals'] === 2) {
                    features.push('Meals');
                }
                if (obj['sale'] === 2) {
                    features.push('Sale');
                }
                if (obj['events'] === 2) {
                    features.push('Events');
                }
                if (obj['additional'] === 2) {
                    features.push('Additional');
                }
                if (obj['accommodation'] === 2) {
                    features.push('Accommodation');
                }
                obj['features'] = features;
                delete obj['tastings'];
                delete obj['sightseeing'];
                delete obj['meals'];
                delete obj['sale'];
                delete obj['events'];
                delete obj['additional'];
                delete obj['accommodation'];
                return obj;
            });
            res.send(vineyards);
        }
    });
});


app.listen(3000, () => {
    console.log('Listening to requests.');
});

