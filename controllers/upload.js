const fs = require('fs');
const Image = require('../models').Image;

const uploadFiles = async (req, res) => {
    try {
        console.log(res.file);

        if (req.file == undefined) {
            return res.send('Вы должны выбрать картинку')
        }

        Image.create({
            Type: req.file.mimetype,
            Name: req.file.originalname,
            Title: req.file.title,
            Data: fs.readFileSync(
                __dirname + '/public/images/' + req.file.filename
            ),
        }).then((image) => {
            fs.writeFileSync(
                __dirname + '/public/tmp/' + image.Name, image.Data
            )

            return res.send('Фотография была загружена');
        });
    } catch (error) {
        console.log(error);

        return res.send(`Ошибка загрузки картинки: ${error}`);
    }
};

module.exports = {
    uploadFiles,
}