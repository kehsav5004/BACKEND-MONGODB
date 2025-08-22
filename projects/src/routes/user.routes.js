import {Router} from "express";  // we get router access from express module
import {
    getwatchhistory,
    getuserchannelprofile,
    updateusercoverimage,
    updateuseravatar,
    updateacountdetails,
    getcurrentuser,
    changepassword,
    refreshaccesstoken, 
    loginuser, 
    logoutuser, 
    registeruser
} from "../controllers/user.controller.js";

import {upload} from "../middlewares/multer.js";   // importing upload from middleware to get files from user before register 
import { verifyjwt } from "../middlewares/auth.middleware.js";


const router = Router();

// this is the route where we providing prefix to search for the controller and calling back controller function
router.route("/register").post(
    upload.fields([
       {
        name : "avatar",
        maxCount : 1,
       },
       {
        name : "coverimage",
        maxCount : 1,
       }
    ]),
    registeruser
) //https://localhost:8000/users/register

router.route("/login").post(loginuser)

//secured routes
router.route("/logout").post(verifyjwt, logoutuser)
router.route("/refresh-token").post(refreshaccesstoken)
router.route("/changepassword").post(verifyjwt,changepassword)
router.route("/current-user").get(verifyjwt, getcurrentuser)
router.route("/update-acount").patch(verifyjwt ,updateacountdetails)
router.route("/update-avatar").patch(verifyjwt ,upload.single("avatar"),updateuseravatar)
router.route("/update-coverimage").patch(verifyjwt ,upload.single("coverimage"),updateusercoverimage)

//when we make route with params 

router.route("/c/:username").get(verifyjwt, getuserchannelprofile)
router.route("/history").get(verifyjwt, getwatchhistory)

export default router

