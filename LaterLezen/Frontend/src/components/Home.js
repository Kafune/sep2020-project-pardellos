import React from 'react';
import Menu from './Menu';
import Articles from './Articles';


export default function Home(props) {
    return <div>
        <Menu/>
        <Articles appState={props.appState} setArticles={props.setArticles}/>

    </div>
}