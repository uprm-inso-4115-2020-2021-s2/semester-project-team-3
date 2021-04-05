import multer, { FileFilterCallback, Multer } from 'multer'
import path from 'path'
import {Express} from 'express'



export const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.resolve(__dirname, '../uploads'));
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});


export const imageFilter = function(req:Express.Request, file:Express.Multer.File , cb: FileFilterCallback) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
        return cb(new Error('Only image files are allowed!'));
    }
    if(file.size*2**20 > 5) {
        return cb(new Error('File must be less than 5mb'))
    }

    cb(null, true);
};