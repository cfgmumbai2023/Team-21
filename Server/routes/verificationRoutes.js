const express = require("express");
const router = express.Router();
const Course = require("../models/courseModels")

/*
req.body: {
    id: userId,
    quiz: [
        {
            question: String,
            option1: String,
            option2: String,
            option3: String,
            option4: String,
            rightOption: Number,
        }
    ]
}
*/
router.route("/addquiz/:courseId").post(async(req, res, next)=> {
    try {
        // body = { array of quiz questions, {topic, option1, ..., rightoption} }
        const course = await Course.findOne({ _id: req.body.courseId});
        req.body.quiz.forEach((quiz) => {
            course.quiz.push(quiz);
        })
        await course.save();
    }
    catch(e){
        console.log(e);
        res.status(400).json({
            success: false,
            message: err.message,
        })
    }
});


router.route("/quiz/:courseId").get(async(req, res)=> {
    try {
        const course = await Course.findOne({ _id: req.params.courseId});
        res.status(200).json({
            success: true,
            quiz: course.quiz.slice(0, 5),
        })
    }
    catch(e){
        console.log(e);
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
})


module.exports = router;