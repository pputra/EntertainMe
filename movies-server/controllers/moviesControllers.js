const Movie = require('../models/Movie');

module.exports = {
    create: (req, res) => {
        let { title, overview, poster_path, popularity, tag, status } = req.body;

        Movie.create({ title, overview, poster_path, popularity, tag, status }).then((result) => {
            res.status(201).json({
                message: 'movie has been added'
            });
        }).catch((err) => {
            res.status(400).json(err.message);
        });
    },
    remove: (req, res) => {
        Movie.deleteOne({ _id: req.params.id }).then((result) => {
            res.status(202).json(result);
        }).catch((err) => {
            res.status(400).json(err.message);
        });
    },
    update: (req, res) => {
        let { title, overview, poster_path, popularity, tag, status } = req.body;

        Movie.updateOne({_id: req.params.id}, { title, overview, poster_path, popularity, tag, status }).then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(400).json(err.message);
        });

    },
    getAll: (req, res) => {
        
        Movie.find().then((result) => {
            res.status(200).json({
                info: 'movies found successfully',
                data: result
            });
        }).catch((err) => {
            res.status(401).json(err.message);
        });

    },
    get: (req, res) => {
        Movie.findOne({_id:req.params.id}).then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(401).json(err.message);
        });

    },
};
