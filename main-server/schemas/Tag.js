const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLInt  } = require('graphql');

const TagType = new GraphQLObjectType({
    name: "SeriesType",
    fields: {
        name: {type: GraphQLString }
    }
});

module.exports = TagType;