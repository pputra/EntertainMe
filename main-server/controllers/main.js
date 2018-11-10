const axios = require('axios');
const client = require('redis').createClient();
const movieUrl = 'http://localhost:3001/movie';
const seriesUrl = 'http://localhost:3002/tv';



module.exports = {
    getAll: (req, res) => {

        client.get('entertainme', (err, reply) => {
            if (reply) {
                res.status(200).json(JSON.parse(reply));
            } else {
                module.exports.getAllWithoutCaching(res);
            }

        });
    },

    getAllWithoutCaching: (res) => {
        
        let movies = axios({
            method: 'GET',
            url: movieUrl
        });

        let series = axios({
            method: 'GET',
            url: seriesUrl
        });

        Promise.all([movies, series]).then((result) => {
            let response = {
                movies: result[0].data,
                series: result[1].data
            }

            client.set('entertainme', JSON.stringify(response), 'EX', 20);

            if (res) res.status(200).json( response );
        }).catch((err) => {
            if (res) res.status(401).json( err.message );
        });
    },

    addMovie: (req, res) => {
        let { title, overview, poster_path, popularity, tag, status } = req.body;

        axios({
            method: 'POST',
            url: movieUrl,
            data: { title, overview, poster_path, popularity, tag, status }
        }).then((result) => {
            module.exports.getAllWithoutCaching();
            res.status(201).json(result.data);
        }).catch((err) => {
            res.status(400).json(err.message);
        });
    },

    addTv: (req, res) => {

        let { title, overview, poster_path, popularity, tag, status } = req.body;

        axios({
            method: 'POST',
            url: seriesUrl,
            data: { title, overview, poster_path, popularity, tag, status }
        }).then((result) => {
            module.exports.getAllWithoutCaching();
            res.status(201).json(result.data);
        }).catch((err) => {
            res.status(400).json(err.message);
        });
    }
};
