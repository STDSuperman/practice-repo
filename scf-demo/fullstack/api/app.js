const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors);

app.use('/*', (req, res) => {
    res.send({
        msg: 'hello world'
    })
})

module.exports = app;