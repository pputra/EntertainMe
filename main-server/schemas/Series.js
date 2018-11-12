const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLInt  } = require('graphql');
const TagType = require('./Tag');

const SeriesType = new GraphQLObjectType({
    name: "SeriesType",
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

module.exports = SeriesType;