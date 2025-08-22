import mongoose, {Schema} from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        index : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
    },
    fullname : {
        type : String,
        required : true,
        trim : true,
        index : true,
    },
    avatar : {
        type : String,  // cloudinary url
        required : true,
    },
    coverimage : {
        type : String,

    },
    watchhistory : [
        {
            type : Schema.Types.ObjectId,
            ref : "video"
        }
    ],
    password : {
        type : String,
        required : true,
    },
    refreshtoken : {
        type : String,
    },

},{timestamps : true})


userSchema.pre("save", async function(next){
   if(!this.isModified("password")) return next()
   this.password = await bcrypt.hash(this.password, 10)
   next()
})

userSchema.methods.ispasswordcorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateaccesstoken = function(){
    return jwt.sign(
        {
            id : this.id,
            email : this.email,
            fullname : this.fullname,
            username : this.username,
        },
        process.env.access_token_secret,
        {
            expiresIn : process.env.access_token_expiry
        }
    )
}

userSchema.methods.generaterefreshtoken = function(){
    return jwt.sign(
        {
            id : this.id,
        },
        process.env.refresh_token_secret,
        {
            expiresIn : process.env.refresh_token_expiry
        }
    )
}

export const User = mongoose.model("User", userSchema)

