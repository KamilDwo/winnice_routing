const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');


const app = express();
const port = 8080;

app.use(helmet());
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
}));
app.use(bodyParser.json({
    limit: '50mb',
}));
app.use(cors());
app.use(morgan('combined'));
app.use(express.static(`${__dirname}/public`));

const vineyardsRoutes = require('./routes/vineyard.routes');
const newsRoutes = require('./routes/news.routes');
const pathsRoutes = require('./routes/paths.routes');
const backOfficeRoutes = require('./routes/backOffice.routes');

app.all('/*', (req, res, next) => {
    res.header('Cache-Control', 'public, max-age=120');
    next();
});

app.use('/api/v1/vineyards', vineyardsRoutes);
app.use('/api/v1/news', newsRoutes);
app.use('/api/v1/paths', pathsRoutes);
app.use('/api/backoffice', backOfficeRoutes);

app.listen(port, () => {
    console.log(`Listening to requests. Port ${  port}`);
});

