import React, { useState } from "react";
import {graphql} from "react-apollo";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

const BookList = ({data}) => {
    const [selected, setSelected] = useState(null);

    const displayBooks = () => data.loading
        ? <div>Loading books...</div>
        : data.books.map(({id, name}) => <li key={id} onClick={() => setSelected(id)}>{name}</li>);

    return (
        <div>
            <ul>
                {displayBooks()}
            </ul>
            <BookDetails bookId={selected} />
        </div>
    )
}

export default graphql(getBooksQuery)(BookList);
