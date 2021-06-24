const { ApolloServer } = require('apollo-server');
const { createComplexityLimitRule } = require('graphql-validation-complexity');

// typeDefs
const typeDefs = require('./typeDefs');

// resolvers
const resolvers = require('./resolvers');

// permission schema
// const permission_schema = require('./permissions')(typeDefs,resolvers);

// query complexity rule
const queryComplexityRule = createComplexityLimitRule(100);

module.exports = new ApolloServer({
    typeDefs,
    resolvers,
    validationRules:[queryComplexityRule],
    // schema: permission_schema,
    context:({req}) => {
        // handle authentication here
    }
});