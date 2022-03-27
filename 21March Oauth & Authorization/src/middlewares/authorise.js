const Product = require("../models/product.model");

const authorise = async(req,res,next) => {
    try{
        let product = await Product.findById(req.params.productId);
        if (req.userID === product.user_id.toString()) {
            // checking if logged in user and product seller are the same
            return next();
        }
        return res.status(401).send({message : "You are not authorised to perform this operation"});
    } catch(err) {
        return res.status(500).send(err);
    }
    
}
module.exports = authorise;