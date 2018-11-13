const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt } = require('graphql');
const MovieType = require('./Movie');
const SeriesType =require('./Series');
const { getMovies, getSeries } = require('../controllers/main');
const axios = require('axios');

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
    }),
    mutation: new GraphQLObjectType({
        name: 'mutation',
        fields: {
            addMovie: {
                type: MovieType,
                args: {
                    title: { type: GraphQLString },
                    overview: { type: GraphQLString},
                    tag: {type: new GraphQLList( GraphQLString ) },
                    poster_path: { type: GraphQLString },
                    popularity: { type: GraphQLInt },
                    createdAt: { type: GraphQLString },
                    updatedAt: { type: GraphQLString }
                },
                resolve: async (_parent, args, _context) => {
                    

                    

                    let response = await axios({
                            method: 'POST',
                            url: 'http://localhost:3001/movie',
                            data: args,
                        });

                    
                    return response.data;
                }
            },
            addSeries: {
                type: MovieType,
                args: {
                    title: { type: GraphQLString },
                    overview: { type: GraphQLString},
                    tag: {type: new GraphQLList( GraphQLString ) },
                    poster_path: { type: GraphQLString },
                    popularity: { type: GraphQLInt },
                    createdAt: { type: GraphQLString },
                    updatedAt: { type: GraphQLString }
                },
                resolve: async (_parent, args, _context) => {
                    

                    

                    let response = await axios({
                            method: 'POST',
                            url: 'http://localhost:3002/tv',
                            data: args,
                        });

                    
                    return response.data;
                }
            }
        }
    })
});

module.exports = schema;