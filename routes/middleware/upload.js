const multer = require('multer');

const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb('Пожалуйста выберите изображение', false);
    }
}

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + '/public/images/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
});

let uploadFile = multer({storage: storage, fileFilter: imageFilter});

module.exports = uploadFile;