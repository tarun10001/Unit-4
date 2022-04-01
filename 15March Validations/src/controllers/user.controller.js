const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

//importing validator
const { body, validationResult } = require("express-validator");


router.get('/', async(req,res) => {
    try{
        const users = await User.find().lean().exec();
        return res.status(200).send(users);

    }
    catch(err){
        return res.status(500).send({message: err.message});
    }
});

router.post(
    '/',
    
    body('first_name').not().isEmpty().withMessage('first name is required'),
    body('last_name').not().isEmpty().withMessage('last name is required'),
    body('email').isEmail().withMessage('enter a valid email address'),
    body('pincode').custom((value) => {
        if(value.length != 6)
            throw new Error('pincode must be 6 characters');
        return true;
    }),
    body('age').custom((value) => {
        if(value < 1 || value > 100)
            throw new Error('enter a valid age, must be between 1 and 100');
        return true;
    }),
    body('gender').custom((value) => {
        if(!(value == "Male" || value == "Female" || value == "Others"))
            throw new Error('Enter a valid gender, must be Male,Female,Others')
        
            return true;
    }),
    async (req, res) => {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const user = await User.create(req.body);
      return res.status(200).send(user);
    },
  );


module.exports = router;