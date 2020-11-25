/* eslint-disable no-sync */
/* eslint-disable import/no-commonjs */
const userModel = require('../models/User');
const questionModel = require('../models/Question');
const lessonModel = require('../models/Lesson');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { username, email, password, passwordrepeat } = req.body;
    const checkUserData = await userModel.findOne({ username });
    if (checkUserData)
        return res.status(403).json({ status: `This username already use` });
    const checkEmailData = await userModel.findOne({ email });
    if (checkEmailData)
        return res.status(403).json({ status: `This email already use` });

    if (password === passwordrepeat) {
        if (password.length > 4) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            const potantialUser = new userModel({
                username, email, password: hash
            });
            potantialUser.save()
                .then(() => {
                    res.status(200).json({ status: `You registered!` })
                })
                .catch(err => console.log(err));
        } else {
            return res.status(403).json({ status: `Password must be 4 character` });
        }
    } else {
        return res.status(403).json({ status: `Password doesn't match` });
    }
}
const login = async (req, res) => {
    const { username, password } = req.body;
    const usernameCheck = await userModel.findOne({ username });
    if (!usernameCheck)
        return res.status(403).json({ status: `username or password wrong.` });

    const passwordCorrect = bcrypt.compareSync(password, usernameCheck.password); // true
    if (passwordCorrect) {
        const tokenAdd = {
            id: usernameCheck._id,
            username: usernameCheck.username,
            email: usernameCheck.email,
            admin: usernameCheck.admin,
            questionCounter: usernameCheck.questionCounter
        }
        const token = jwt.sign(tokenAdd, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.cookie('token', token);
        res.redirect('/');
    } else {
        return res.status(403).json({ status: `username or password wrong.` });
    }
}
const logout = async (req, res) => {
    await res.clearCookie('token');
    res.redirect('/');
}

const addQuestion = async (req, res) => {
    const fileUrl = "/images/" + req.file.filename;
    const { description, lessonId, author } = req.body;
    const authorObject = await userModel.findById(author);
    const lessonObject = await lessonModel.findById(lessonId);
    const potantialQuestion = new questionModel({
        description,
        lessonId,
        author,
        authorObject,
        lessonObject,
        image: fileUrl
    });
    potantialQuestion.save()
        .then(() => res.redirect('/'))
        .catch(err => console.log(err));
}
module.exports = {
    register,
    login,
    logout,
    addQuestion
}