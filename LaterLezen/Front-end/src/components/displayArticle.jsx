import React, {useState, useEffect} from 'react';
import { searchArticleByID } from '../serverCommunication'

export default function DisplayArticle(props) {
    const [articleID, setArticleID] = useState(props.articleID)
    const [article, setArticle] = useState([])

    useEffect(() => {
        setArticleID(props.articleID)
        console.log(articleID)
    }, [props.articleID])

    useEffect(() => {
        searchArticleByID(articleID)
        // .then((response) => response.json())
        // .then((response) => {
        //     console.log(response)
        // })
    }, [articleID])

    return <div>
        <h2 class="center">Article page</h2>
        
    </div>
}
