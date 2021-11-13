const authRouter = require('express').Router();
const {authController} = require('./../controllers');

authRouter.get('/login', authController.login);
authRouter.get('/register', authController.register);
authRouter.get('/verify_token', authController.verifyToken)

module.exports = authRouter;