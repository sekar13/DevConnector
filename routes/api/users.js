const express = require('express');
const router = express();
const gravatar = require('gravatar')
const { check , validationResult} = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcryptjs')
//@route   Post api/users
//@desc    Register user
//@access  public
router.post('/',[
    check('name','Name is Required').not().isEmpty(),
    check('email','Please include a valid email ').isEmail(),
    check('password', 'please enter the password with 6  ot more characters').isLength({ min: 6 })

],
async(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    
    }
    const { name, email,password} = req.body
    try{
        //see if the user exist
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({error:[{msg:'User already exists'}]})
        }
        //Get users Gravatar
        const avatar = gravatar.url(email,{
            s:'200',
            r:'pg',
            d:'mm'
        
        })
        user = new User({
            name,
            email,
            avatar,
            password
        });
        const  salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password,salt);
        await user.save()


    //Encrypt password by bcrypt

    //Return JsonWebToken
    res.send("Use Registered");

    }catch(err){
        res.status(500).send('server Error')

    }    
});

module.exports = router;