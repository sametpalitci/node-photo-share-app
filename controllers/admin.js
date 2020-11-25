/* eslint-disable import/no-commonjs */
const lessonRouter = require('../models/Lesson');
const addLesson = (req, res) => {
    const { title, color } = req.body;
    const potantialUser = new lessonRouter({
        title,
        color
    });
    potantialUser.save().then(() => res.redirect('/admin')).catch((err) => console.log(err));
}
const adminView = async (req, res) => {
    const lessonFind = await lessonRouter.find({});
    res.render('admin', { lessonFind });
}
const deleteLesson = (req, res) => {
    const { deleteLesson } = req.params;
    lessonRouter.findByIdAndDelete(deleteLesson)
        .then(() => res.redirect('/admin'))
        .catch(err => console.log(err))
}
module.exports = { addLesson, adminView, deleteLesson };