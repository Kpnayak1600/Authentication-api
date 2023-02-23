import { Router } from "express";
const router = Router();

/** import all controllers */
import * as controller from '../controllers/appController.js';
import { localVariables } from '../middleware/auth.js';
import { registerMail } from '../controllers/mailer.js'


/** POST Methods */
router.route('/authenticate').post(controller.verifyUser, (req, res) => res.end()); // authenticate user
router.route('/registerMail').post(registerMail); // send the email
router.route('/login').post(controller.verifyUser, controller.login); // login in app
router.route('/logout').post(controller.logout); // logout in app

/** GET Methods */
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP) // generate random OTP
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP) // verify generated OTP
router.route('/createResetSession').get(controller.createResetSession) // reset all the variables


/** PUT Methods */
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword); // use to reset password



export default router;