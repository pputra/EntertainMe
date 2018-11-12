const axios = require('axios');
const client = require('redis').createClient();
const movieUrl = 'http://localhost:3001/movie';
const seriesUrl = 'http://localhost:3002/tv';




module.exports = {

    getMovies: (req, res) => {
        return new Promise((resolve, reject) => {
            client.get('entertainme/movies', (err, reply) => {
                if (err) reject(err);
                if (reply) {
                    console.log('chaceee');
                    resolve(JSON.parse(reply));

                } else {
                    module.exports.cacheMovies(resolve, reject);
                }
            });

            
        })
    },

    cacheMovies: (resolve, reject) => {
        axios({
            method: 'GET',
            url: movieUrl
        }).then((result) => {
            
            client.set('entertainme/movies', JSON.stringify(result.data), 'EX', 60);
            resolve(result.data);
        }).catch((err) => {
            reject(err.message);
        });
    },
    

    getSeries: (req, res) => {
        return new Promise((resolve, reject) => {
            client.get('entertainme/series', (err, reply) => {
                if (err) reject(err);
                if (reply) {
                    
                    resolve(JSON.parse(reply));

                } else {
                    module.exports.cacheSeries(resolve, reject);
                }
            });

            
        })
      },

    cacheSeries: (resolve, reject) => {
        
        axios({
            method: 'GET',
            url: seriesUrl
        }).then((result) => {
            console.log('anjingggg');
            client.set('entertainme/series', JSON.stringify(result.data), 'EX', 60);
            resolve(result.data);
        }).catch((err) => {
            reject(err.message);
        });

    },
    
    




    getAll: (req, res) => {
        return new Promise((resolve, reject) => {
            client.get('entertainme', (err, reply) => {
                if (err) reject(err);
                if (reply) {
                    resolve(JSON.parse(reply));
                } else {
                    resolve(module.exports.getAllWithoutCaching(res));
                }
            });
        });
    },

    getAllWithoutCaching: (res) => {
        return new Promise((resolve, reject) => {
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
    
                if (res) resolve(response);
            }).catch((err) => {
                if (res) reject(err.message);
            });
        })


        
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
