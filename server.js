const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');


const app = express();
const port = 9000;

app.use(helmet());
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
}));
app.use(bodyParser.json({
    limit: '50mb',
}));
app.use(compression());
app.use(cors());
app.use(morgan('combined'));
app.use(express.static(`${__dirname}/public`));

const vineyardsRoutes = require('./routes/vineyard.routes');
const newsRoutes = require('./routes/news.routes');
const pathsRoutes = require('./routes/paths.routes');
const backOfficeRoutes = require('./routes/backOffice.routes');
const wineTypesRoutes = require('./routes/wineTypes.routes');
const winesRoutes = require('./routes/wines.routes');
const errorsRoutes = require('./routes/errors.routes');

app.use('/api/v1/vineyards', vineyardsRoutes);
app.use('/api/v1/news', newsRoutes);
app.use('/api/v1/paths', pathsRoutes);
app.use('/api/backoffice', backOfficeRoutes);
app.use('/api/v1/wineTypes', wineTypesRoutes);
app.use('/api/v1/wines', winesRoutes);
app.use('/api/v1/errors', errorsRoutes);

app.listen(port);

