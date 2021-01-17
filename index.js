const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mysql = require('mysql');
const speakingurl = require('speakingurl');

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));


const connection = mysql.createConnection({
    host: 'vilsone.home.pl',
    user: '11565381_winnice',
    password: '!w-SfX1JjPV8',
    database: '11565381_winnice'
});


app.post('/load-places', (req, res) => {
    connection.query('select' +
        ' id,' +
        ' name,' +
        ' date_add as "dateAdd",' +
        ' location,' +
        ' province_id as "provinceId",' +
        ' image_1 as "image1",' +
        ' marker_id as "markerId"' +
        ' from pw_vineyard', function (err, rows) {
        if (rows) {
            const vineyards = rows.map(obj => {
                const features = [];
                const location = obj['location'].split(',');
                const objUrl = `${obj['id']}-${speakingurl(obj['name'])})`;
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
                if (obj['events'] === 2) {
                    features.push('Events');
                }
                if (obj['additional'] === 2) {
                    features.push('Additional');
                }
                if (obj['accommodation'] === 2) {
                    features.push('Accommodation');
                }
                obj[features] = features;
                return obj;
            });
            res.send(vineyards);
        }
    });

});


app.listen(3001, () => {
    console.log('listening on port 3001');
});

