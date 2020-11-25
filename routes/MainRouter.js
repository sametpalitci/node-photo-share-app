/* eslint-disable import/no-commonjs */
const express = require('express');
const router = express.Router();

const multer = require("multer")
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '.jpg') //Appending .jpg
    }
})


const upload = multer({ storage });

const userMW = require('../middlewares/user');
const { register, login, logout, addQuestion } = require('../controllers/user');

router.get('/', userMW);
router.get('/logout', logout);

router.post('/register', register);
router.post('/login', login);

router.post('/addQuestion', upload.single('uploaded_file'), addQuestion);
module.exports = router;
