const graphql = require('graphql');
const {authors} = require("../mockData");
const { AuthorType } = require('../types');

const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                // code to get data from db / other source
                return authors.find(author => author.id === parent.authorId)
            }
        },
    })
});

module.exports = BookType;
