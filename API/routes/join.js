const router = require("express").Router();
const Form = require("../models/JoinForm");
const { verifyToken, verifyTokenandAndAuthorization, verifyTokenAndAdmin } = require("./verifytoken");


// send Join Form 
router.post("/", async (req, res) => {
    try{
        const newForm = new Form({
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Email: req.body.Email,
    
        });
        const savedForm = await newForm.save();
        res.status(201).json(savedForm);
        console.log(savedForm);
    }catch (err) {
        res.status(500).json(err)
    }
});


// Find join forms
router.get("/find/", verifyTokenAndAdmin, async (req, res) =>{
    try{
        const forms = await Form.find()
        res.status(200).json(forms)
    } catch(err) {
        res.status(500).json(err)
    }
})

// Delete join form
router.delete("/delete/:id", verifyTokenAndAdmin, async (req, res) =>{
    try{
        await Form.findByIdAndDelete(req.params.id)
        res.status(200).json("Application deleted")
    } catch(err) {
        res.status(500).json(err)
    }
})

// update join form
module.exports = router;