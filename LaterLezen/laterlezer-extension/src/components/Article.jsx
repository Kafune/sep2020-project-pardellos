import React from 'react';
import TagList from './TagsList'
export default function Article (props) {
    return <div>
        <h1>Add articles here!!</h1>
        <input type="text" placeholder="url"></input>
        <br></br>
        <input type="text" placeholder="find tag.."></input>
        <button>Search</button>
        <br></br>
        <TagList></TagList>
        <button>Save</button>
    </div>
}