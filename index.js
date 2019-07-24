import express from 'express';
import graphqlHTTP from 'express-graphql';
import rootSchema from './src/app';

const users = require('./src/rest/user');
const quotes = require('./src/rest/quote');

const app = express();


// REST endpoints:
app.use('/quote', quotes);
app.use('/users', users);


// GraphQL endpoint:
app.use('/graphql', graphqlHTTP({
    schema: rootSchema,
    graphiql: true,
}));

app.listen(4000);

console.log('Running GraphQL + REST API Gateway at http://localhost:4000/graphql');
