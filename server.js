const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
require('dotenv').config()

const {PORT} = process.env || 4000

const { schema } = require('./schema');

const app = express();

app.use(cors())

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

app.listen(PORT);
console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`);