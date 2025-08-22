import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({ 
    cloud_name:process.env.cloudinary_cloud_name , 
    api_key: process.env.cloudinary_api_key, 
    api_secret: process.env.cloudinary_api_secret ,
});

const uploadoncloudinary = async (LocalFilePath) => {
    try {
        if(! LocalFilePath)return null
        // upoload file on cloudinary
        const response = await cloudinary.uploader.upload(LocalFilePath, {
            resource_type : "auto"
        });
        // file has been uploadede successfuly
        fs.unlinkSync(LocalFilePath); // remove the locally saved temporaray file as operation successfuly 
        console.log("file has been uploaded on cloudinary", response.url)
        return response;
    } catch (error) {
        fs.unlinkSync(LocalFilePath) // remove the locally saved temporaray file as operation failed 
        return null
    }
}

export {uploadoncloudinary};



