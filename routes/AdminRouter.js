/* eslint-disable import/no-commonjs */
const express = require('express');
const router = express.Router();

const userMW = require('../middlewares/user');
const { addLesson, adminView, deleteLesson } = require('../controllers/admin');

router.get('/', userMW, adminView);

router.post('/addLesson', userMW, addLesson);
router.get('/deleteLesson/:deleteLesson', userMW, deleteLesson);

module.exports = router;
