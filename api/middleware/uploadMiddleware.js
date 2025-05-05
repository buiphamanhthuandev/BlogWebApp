const multer = require('multer');
const path = require('path');
const {v4: uuidv4} = require('uuid');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${uuidv4()}${ext}`);
    }
});
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedTypes.test(file.mimetype);
    if(extname && mimeType){
        cb(null, true);
    }else{
        cb(new Error('Chỉ chấp nhận ảnh định dạng jpeg, jpg, png, gif',false));
    }
}
const upload = multer({
    storage,
    limits: {fileSize: 2 * 1024 * 1024},
    fileFilter,
});

module.exports = upload;