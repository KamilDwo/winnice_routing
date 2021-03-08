'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const app = express()
const port = 9001

app.use(helmet())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('combined'))

const vineyardsRoutes = require('./routes/vineyard.routes')
const newsRoutes = require('./routes/news.routes')
const pathsRoutes = require('./routes/paths.routes')

app.use('/api/v1/vineyards', vineyardsRoutes)
app.use('/api/v1/news', newsRoutes)
app.use('/api/v1/paths', pathsRoutes)
app.use('/backoffice/login', (req, res) => {
    res.send({
        token: 'test123'
    });
});

app.listen(port, () => {
    console.log('Listening to requests. Port ' + port)
})

