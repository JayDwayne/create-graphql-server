const Server = require('./server.js');

const PORT = process.env.PORT || 4000;

Server.listen(PORT).then(({url}) => {
    console.log(`GraphQL Server started 🚀 at ${url}`);
})