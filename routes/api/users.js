const express = require('express');
const router = express();
const { check , validationResult} = require('express-validator');
//@route   Post api/users
//@desc    Register user
//@access  public
router.post('/',[
    check('name','Name is Required')
        .not()
        .isEmpty(),
    check('email','Please include a valid email ').isEmail(),
    check('password', 'please enter the password with 6  ot more characters').isLength({ min: 6 })

],(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    res.send("User route");
});

module.exports = router;