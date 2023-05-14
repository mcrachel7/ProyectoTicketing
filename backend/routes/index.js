const {Router} = require('express');
const router = Router();
const { Types } = require('mongoose');

const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.get('/', async (req, res) => {
     res.status(200)
     res.json({success:true, message:"Hello world from API"});
});

router.post('/', async (req, res) => {
     res.status(200)
     res.json({success:true, message:"Hello world from API"});
});

router.post('/register', async (req, res) =>{
     User.init(); 
     const {username, password} = req.body;
     const user = new User({
          _id: new Types.ObjectId(),
          username: username,
          password: password
     }); 
     user.password = await user.encryptPassword(user.password);
     await user.save();
     const token = jwt.sign({id: user._id}, config.secret);
     res.json({auth: true, token}); 
}); 

router.get('/profile', verifyToken, async (req, res, next) =>{
     const user = await User.findById(req.userId, {password:0 });
     if(!user){
          return res.status(404).send('No user found'); 
     }
     res.status(200).json(user); 
});

router.post('/login', async (req, res) =>{
     const {username, password} = req.body;
     const user = await User.findOne({username: username}); 

     if(!user){     
          return res.status(404).send('Email does not exist'); 
     }
     const validPassword = await user.comparePassword(
          req.body.password,
          user.password
     ); 
     if(!validPassword){
          return res.status(401).send({auth: false, token: null});
     }
     const token = jwt.sign({id: user._id}, config.secret); 
     res.json({auth: true, token, id_user: user._id}); 

});

router.get('/logout', async (req, res )=>{
     res.status(200).send({auth: false, token: null});      
})

async function verifyToken(req, res, next){
     const token= req.headers.authorization;

     if(!token){
          return res
          .status(401)
          .send({auth: false, message: 'No token was Provided'});
     }
     const decoded = await jwt.verify(token, config.secret);
     req.userId = decoded._id;
     next(); 
}

module.exports = router; 