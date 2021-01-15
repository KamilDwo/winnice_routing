const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mysql = require('mysql');

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
    connection.connect();
    connection.query('select * from pw_vineyard', function (err, rows) {
        const vineyards = rows.map(obj => {
            obj['dateAdd'] = obj['date_add'];
            obj['dateAdd'] = obj['date_add'];
            obj['image1'] = obj['image_1'];
            obj['image2'] = obj['image_2'];
            obj['image3'] = obj['image_3'];
            obj['image4'] = obj['image_4'];
            obj['vineyardDescription'] = obj['vineyard_description'];
            obj['vineyardWinesList'] = obj['vineyard_wines_list'];
            obj['isActive'] = obj['is_active'] === 2;
            obj['markerId'] = obj['marker_id'];
            const location = obj['location'].split(',');
            obj['location'] = [parseFloat(location[0]), parseFloat(location[1].replace(/\s+/g, ''))];
            delete obj['date_add'];
            delete obj['year_open'];
            delete obj['is_active'];
            delete obj['image_1'];
            delete obj['image_2'];
            delete obj['image_3'];
            delete obj['image_4'];
            delete obj['marker_id'];
            delete obj['vineyard_description'];
            delete obj['vineyard_wines_list'];
            return obj;
        });
        res.send(vineyards);
    });
    connection.end();
});


app.listen(3001, () => {
    console.log('listening on port 3001');
});
