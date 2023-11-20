const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());

// Connect to mlab DB
mongoose.connect('mongodb+srv://<username>:<password>@cluster0.2y7vdfo.mongodb.net/?retryWrites=true&w=majority')
mongoose.connection.once('open', () => console.log('connected to mongodb DB'));

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

app.listen(PORT, () => console.log(`Express GraphQL Server Now Running On localhost:${PORT}/graphql`));
