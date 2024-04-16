const router = require("express").Router();

//item contollerjs
let Feedback = require('../models/Feedback');
//feedback= model


//Add Feedback router controller
router.route('/addfeedback').post((req, res) => {
//front end eken ena ewa body eken request krnw
    const name = req.body.name;
    const email = req.body.email;
    const contact = req.body.contact;
    const feedback = req.body.feedback;

    const newFeedback = new Feedback({

        name,
        email,
        contact,
        feedback,  

    })
//try catch
    newFeedback.save().then(() => {
       //200 success
        res.status(200).json({ status: ".Feedback Addded!", feedback: newFeedback });

    }).catch((err) => {
        console.log(err);
    })

});



//Get All Feedbacks

router.route('/all').get((req,res)=>{
    Feedback.find().then((feedbacks)=>{
        res.json(feedbacks)
    }).catch((err)=>{
        console.log(err)
    })
})



//get one-specified feedback router controller
router.route("/feedback/:id").get((req,res)=>{
    Feedback.findById(req.params.id).then((feedback)=>{
        res.json(feedback)
    }).catch((err)=>{
        console.log(err)
    })
})


//update item details router controller
router.route("/update/:id").patch((req,res)=>{
    const id = req.params.id;
    const {name,email,contact,feedback} = req.body;

    const feedbackData = {
        name:name, 
        email:email,
        contact:contact,
        feedback:feedback,
    }

    Feedback.findByIdAndUpdate(id,feedbackData)
    .then(updatefeedback => {
        res.json({
            status: true,
            message: "Feedback update successfully.",
            feedback: updatefeedback
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: "Failed to update feedback."})
    })
})


//delete feedback router controller
router.route("/delete/:id").delete((req,res)=>{
    Feedback.findById(req.param.id)
    .then(()=>
        {
            res.json({status: "Feedback deleted successfully"})
        })
    .catch((err)=>{
        console.log(err);
        res.status(500).json({error: "Failed to delete feedback"})
    })
})




module.exports = router;
