'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

const vineyardsRoutes = require('./routes/vineyard.routes');
app.use('/api/v1/vineyards', vineyardsRoutes);

const port = 9000;
app.listen(port, () => {
    console.log('Listening to requests. Port ' + port);
});

