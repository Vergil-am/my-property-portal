const Property = require("../models/property");
const router = require("express").Router();
const { verifyToken, verifyTokenandAndAuthorization, verifyTokenAndAdmin } = require("./verifytoken");




// Create new property
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const NewProperty = new Property(req.body)
    try{
        const savedProperty = await NewProperty.save();
        res.status(200).json(savedProperty);
    }catch(err) {
        res.status(500).json(err)
    }
})


//Update Property
router.put("/update/:id", verifyTokenAndAdmin, async (req, res) => {
        try{
            const updatedProperty = await Property.findByIdAndUpdate(req.params.id, {
                $set: req.body}, {new: true})
            res.status(200).json(updatedProperty)
        }catch (err) {
            res.status(500).json("cant update")
        }
    }
)

// Delete Property
router.delete("/delete/:id", verifyTokenAndAdmin, async (req, res) =>{
    try{
        await Property.findByIdAndDelete(req.params.id)
        res.status(200).json("Property deleted")
    } catch(err) {
        res.status(500).json(err)
    }
})

//find Property
router.get("/:id", async (req, res) =>{
    try{
        const property = await Property.findById(req.params.id)
        res.status(200).json(property)
    } catch(err) {
        res.status(500).json(err)
    }
})



//find all Properties
router.get("/", async (req, res) =>{
    const qNew = req.query.new;
    const qCategory = req.query.category
    try{
        let properties;
        if(qNew){
            properties = await Property.find().sort(
                {createdAt: -1}
            ).limit(10)
        }else if (qCategory){
            properties = await Property.find({Categories: {
                $in: [qCategory],
            }})
        } else {
            properties = await Property.find();
        }
        res.status(200).json(properties)
    } catch(err) {
        res.status(500).json(err)
    }
})

//Search for certaian properties


module.exports = router;
