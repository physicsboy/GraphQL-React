import React from "react";
import { InMemoryCache } from "apollo-boost";
import { ApolloClient } from "apollo-client";
import {ApolloProvider} from "react-apollo";
import { createHttpLink } from "apollo-link-http";

import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import BookDetails from "./components/BookDetails";

const httpLink = createHttpLink({
    uri: "http://localhost:4000/graphql"
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

const App = () => (
    <ApolloProvider client={client}>
        <div className="App">
            <h1>Reading list</h1>
            <BookList />
            <AddBook />
        </div>
    </ApolloProvider>
);

export default App;
