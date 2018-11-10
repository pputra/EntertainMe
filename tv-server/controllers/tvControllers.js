const Tv = require('../models/Tv');

module.exports = {
    create: (req, res) => {
        let { title, overview, poster_path, popularity, tag, status } = req.body;

        Tv.create({ title, overview, poster_path, popularity, tag, status }).then((result) => {
            res.status(201).json({
                message: 'tv has been added'
            });
        }).catch((err) => {
            res.status(400).json(err.message);
        });
    },
    remove: (req, res) => {
        Tv.deleteOne({ _id: req.params.id }).then((result) => {
            res.status(202).json(result);
        }).catch((err) => {
            res.status(400).json(err.message);
        });
    },
    update: (req, res) => {
        let { title, overview, poster_path, popularity, tag, status } = req.body;

        Tv.updateOne({_id: req.params.id}, { title, overview, poster_path, popularity, tag, status }).then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(400).json(err.message);
        });

    },
    getAll: (req, res) => {
        Tv.find().then((result) => {
            res.status(200).json({
                info: 'tv found successfully',
                data: result
            });
        }).catch((err) => {
            res.status(401).json(err.message);
        });

    },
    get: (req, res) => {
        Tv.findOne({_id:req.params.id}).then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(401).json(err.message);
        });

    },
};
