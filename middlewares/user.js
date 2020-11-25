/* eslint-disable import/no-commonjs */
const jwt = require('jsonwebtoken');
const lessonModel = require('../models/Lesson');
const questionModel = require('../models/Question');

module.exports = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        const lessonData = await lessonModel.find({})
        const questionData = await questionModel.find({})
        if (token) {
            const verifedToken = jwt.verify(token, process.env.SECRET_KEY);
            if (verifedToken.admin === 0)
                res.render('index', { usersData: verifedToken, lessonData, questionData });
            else if (verifedToken.admin === 1)
                next();
            else
                res.render('index', { usersData: null, lessonData, questionData });
        } else {
            res.render('index', { usersData: null, lessonData, questionData });
        }
    } catch (err) {
        console.log(err);
    }
}