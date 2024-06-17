import multer from "multer";

//Storing images on upload folder
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "./upload/");
    },
    filename: (req, file, cb) =>{
        const fileName = new Date().toISOString().replace(/:/g, "_") + "-" + file.originalname;   
        cb(null, fileName);
    },

});

export const uploadFile = multer({
    storage: storage,
});