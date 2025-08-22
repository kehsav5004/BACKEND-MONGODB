import multer from "multer";
 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/temp');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname) // file. has many functions which gives many information regarding file
    }
  });
  
  export const upload = multer({ 
    storage,
});