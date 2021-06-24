const { gql } = require('apollo-server');

module.exports = gql`
    #write your typeDefs here
    type Query {
        helloWorld: String!
        privateResolver: String!
    }
`;