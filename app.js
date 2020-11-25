/* eslint-disable import/no-commonjs */
require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

const mainRouter = require('./routes/MainRouter');
const adminRouter = require('./routes/AdminRouter');

app.use('/', mainRouter);
app.use('/admin', adminRouter);




mongoose.connect(process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        app.listen(process.env.PORT);
    }).then(() => console.log(`App is running, ${process.env.PORT} port.`))
    .catch(err => console.log(err));
