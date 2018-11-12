const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLInt  } = require('graphql');
const TagType = require('./Tag');

const MovieType = new GraphQLObjectType({
    name: "MovieType",
    fields: {
        _id: { type: GraphQLID },
        title: { type: GraphQLString },
        overview: { type: GraphQLString},
        tag: {type: new GraphQLList( GraphQLString ) },
        poster_path: { type: GraphQLString },
        popularity: { type: GraphQLInt },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString }
    }
});

module.exports = MovieType;