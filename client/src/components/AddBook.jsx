import React, { useRef, useState } from "react";
import { compose, graphql } from "react-apollo";
import { getAuthorsQuery, getBooksQuery } from "../queries/queries";
import { addBookMutation } from "../queries/mutations";

const initialFormData = {name: '', genre: '', authorId: ''};

const AddBook = ({getAuthorsQuery, addBookMutation}) => {
    const [formData, setFormData] = useState(initialFormData);
    const formRef = useRef();

    const displayAuthors = () => getAuthorsQuery.loading
        ? <option disabled>Loading authors...</option>
        : getAuthorsQuery.authors.map(author => <option key={author.id} value={author.id}>{author.name}</option>);

    const handleFormUpdate = e => {
        console.log(e.target.name, e.target.value);
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    const submitForm = e => {
        e.preventDefault();
        addBookMutation({variables: {...formData}, refetchQueries: [{query: getBooksQuery}]});
        setFormData(initialFormData);
        formRef.current.reset();
    }

    return (
        <form onSubmit={submitForm} ref={formRef}>
            <div className="field">
                <label>Book name:</label>
                <input name="name" type="text" onChange={handleFormUpdate} />
            </div>

            <div className="field">
                <label>Genre:</label>
                <input name="genre" type="text" onChange={handleFormUpdate} />
            </div>

            <div className="field">
                <label>Author:</label>
                <select name="authorId" onChange={handleFormUpdate} >
                    <option>Select author</option>
                    {displayAuthors()}
                </select>
            </div>

            <button type="submit">+</button>
        </form>
    )
}

export default compose(
    graphql(getAuthorsQuery, {name: 'getAuthorsQuery'}),
    graphql(addBookMutation, {name: 'addBookMutation'})
)(AddBook);
