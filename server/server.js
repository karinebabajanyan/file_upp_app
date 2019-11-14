/* eslint-disable no-console,no-unused-vars */
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const app = express();
app.set('port', 3000);
 const db = 'mongodb://localhost:27017/Excel';
mongoose
    .connect(db, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log('[OK] DB is connected'))
    .catch(err => {
        console.log('err', err);
    });
 app.use(express.json());
 app.use(express.urlencoded({extended: false}));
 app.use(morgan('dev'));

app.use('/api/records', require('./routes/records'));
app.use('/', express.static(path.join(__dirname, '../dist')));

app.listen(app.get('port'), () => {
        console.log(`[OK] Server is running on localhost:${app.get('port')}`);
});