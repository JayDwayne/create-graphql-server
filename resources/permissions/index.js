const { makeExecutableSchema } = require('apollo-server');
const { applyMiddleware } = require('graphql-middleware');
const { not,rule,shield } = require('graphql-shield');


// rules
const isAuthenticated = rule({cache:"contextual"})(
    async (parent,args,context,info) => {
        return context.user !== null;
    }
);

// permissions
const permissions = shield({
    Query:{
        helloWorld: not(isAuthenticated),
        privateResolver: isAuthenticated
    },
    Mutation:{
    	
    }
})

module.exports = (typeDefs,resolvers) => {
    return applyMiddleware(
        makeExecutableSchema({
            typeDefs,
            resolvers
        }),
        permissions
    )
};