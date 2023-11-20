import React from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from "../queries/queries";

const BookDetails = ({bookId, data}) => {
    const {loading, book} = data;
    const showBookDetails = () => {
        if (loading) return <p>Loading book details...</p>;
        if (!book) return <p>No book selected...</p>;
        return (
            <div>
                <h2>{book.name}</h2>
                <p>{book.genre}</p>
                <p>{book.author.name}</p>
                <p>All books by author:</p>
                <ul>
                    {book.author.books.map(({id, name}) => <li key={id}>{name}</li>)}
                </ul>
            </div>
        )
    };

    return (
        <div>
            <p>Book details here</p>
            {!loading && bookId && showBookDetails()}
        </div>
    )
}

export default graphql(getBookQuery, {
    options: ({bookId}) => ({variables: {id: bookId}})
})(BookDetails);
