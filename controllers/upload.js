const fs = require('fs');
const Image = require('../models').Image;
const publicPath = require('../config/config')['publicPath'];

const uploadFiles = async function (req, res, next) {
    try {
        if (req.file == undefined) {
            return res.send('Вы должны выбрать картинку')
        }

        Image.create({
            Type: req.file.mimetype,
            Name: req.file.originalname,
            Title: req.body.Title,
            UserId: req.body.UserId,
            Data: fs.readFileSync(
                `${publicPath}/images/${req.file.filename}`

            ),
        }).then((photo) => {
            // fs.writeFileSync(
            //     `${publicPath}/tmp/${image.Name}`, image.Data
            // )
            const img = {
                Path: `/images/${photo.Name}`,
                Title: photo.Title
            }
            return res.status(200).send(img);
        });
    } catch (error) {
        return res.send(`Ошибка загрузки картинки: ${error}`);
    }
};

module.exports = {
    uploadFiles
};