const router = require('express').Router();
const authController = require('../controllers/userControllers') 

router.post('/signup',authController.signup_post); 

module.exports = router;