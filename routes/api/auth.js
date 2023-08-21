const express = require('express');
const router = express();
const bcrypt = require('bcryptjs')
const auth = require('../../middleware/auth')
const User = require("../../models/User")
const { check , validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
//@route   GET api/auth
//@desc    Test route
//@access  public
router.get('/',auth,async(req,res) => {
    try{
        const user =await User.findById(req.user.id).select('-password')
        res.json(user);


    }catch(err){
        console.error(err.message);
        res.status(500).send("server error")

    }
});
//@route   Post api/auth
//@desc    Authenticate User and get token
//@access  public
router.post('/',[
    
    check('email','Please include a valid email ').isEmail(),
    check('password', 'Password is required').exists()

],
async(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    
    }
    const {email,password} = req.body
    try
    {
        
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({error:[{msg:'Invalid credentials'}]})
        }
       
        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({error:[{msg:'Invalid credentials'}]})

        }
        const payload={
            user:{
                id: user.id
            }
        }
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn:360000},
            function(err,token){
                if(err) throw err;
                res.json({token})
            }
        )
    }   catch(err){
            res.status(500).send('server Error')
        }    
});

module.exports = router;