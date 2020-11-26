/* eslint-disable import/no-commonjs */
const express = require('express');
const router = express.Router();

const userMW = require('../middlewares/user');
const { addLesson, adminView, deleteLesson } = require('../controllers/admin');

router.get('/lesson', userMW, adminView);
router.post('/lesson', userMW, addLesson);
router.delete('/lesson/:lessonId', userMW, deleteLesson);

module.exports = router;
