const { GraphQLSchema, GraphQLObjectType, GraphQLList } = require('graphql');
const MovieType = require('./Movie');
const SeriesType =require('./Series');
const { getMovies, getSeries } = require('../controllers/main');

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'root',
        fields: {
            movies: {
                type: new GraphQLList(MovieType),
                resolve: async () => {
                    let movies = await getMovies();
                    return movies.data;
                }
            },
            series: {
                type: new GraphQLList(SeriesType),
                resolve: async () => {
                    let movies = await getSeries();
                    return movies.data;
                }
            }
        }
    })
});

module.exports = schema;