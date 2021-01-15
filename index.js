const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const mysql = require('mysql')

// defining the Express app
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet())

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json())

// enabling CORS for all requests
app.use(cors())

// adding morgan to log HTTP requests
app.use(morgan('combined'))

const connection = mysql.createConnection({
    host: 'vilsone.home.pl',
    user: '11565381_winnice',
    password: '!w-SfX1JjPV8',
    database: '11565381_winnice'
})

connection.connect()

let tables
connection.query('show tables', function (err, rows, fields) {
    if (err) throw err

    tables = rows
})

connection.end()

// defining an endpoint to return all ads
app.get('/', (req, res) => {
    res.send(tables)
})

// starting the server
app.listen(3001, () => {
    console.log('listening on port 3001')
})
