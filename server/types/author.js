const graphql = require('graphql');
const {books} = require("../mockData");
const {BookType} = require('../types');

const { GraphQLObjectType, GraphQLString, GraphQLInt , GraphQLID, GraphQLList} = graphql;

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // code to get data from db / other source
                return books.filter(book => book.authorId === parent.id)
            }
        }
    })
});

module.exports = AuthorType;
