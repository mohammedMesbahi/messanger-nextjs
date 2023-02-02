const router = require('express').Router();
const authController = require('../controllers/userControllers') 

router.post('/signup',authController.signup_post); 
router.post('/signin',authController.signin_post);
router.post('/logout',authController.logout_get);
module.exports = router;