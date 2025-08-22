import { apierror } from "../utils/apierror.js";   
import jwt from "jsonwebtoken";
import { asynchandler } from "../utils/asynchandler.js";
import { User } from "../models/user.model.js";

export const verifyjwt = asynchandler(async(req, res, next) => {
    try {
        const token = req.cookies?.accesstoken || req.header("Authorization")?.replace("Bearer ", "")
        
        // console.log(token);
        if (!token) {
            throw new apierror(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.access_token_secret)

        // Support tokens that encode either `id` or `_id`
        const userIdFromToken = decodedToken?.id || decodedToken?._id

        const user = await User.findById(userIdFromToken).select("-password -refreshtoken")
    
        if (!user) {
            
            throw new apierror(401, "Invalid Access Token")
        }
    
        req.user = user;
        next()
    } catch (error) {
        throw new apierror(401, error?.message || "Invalid access token")
    }
})