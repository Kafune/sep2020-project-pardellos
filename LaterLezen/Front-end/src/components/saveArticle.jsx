import React, { useState, useEffect } from 'react';
import { getArticle, getAllArticles, getArticleByUser } from '../serverCommunication'
import parse from 'html-react-parser';

export default function SaveArticle(props) {
    const [userID, setUserID] = useState(props.userid)
    const [url, setUrl] = useState('');
    const [article, setArticle] = useState('')
    const [hideToggle, setHideToggle] = useState(false);
    const [tags, setTags] = useState(props.tags);

    useEffect(() => {
        handleTagChips()
    }, [])

    function handleTagChips() {
        var elems = document.querySelectorAll('.chips');
        var instances = M.Chips.init(elems, {
            autocompleteOptions: {
                data: {
                    'Corona': null
                },
                limit: Infinity,
                minLength: 1,
            },
            onChipAdd: (elems) => {
                setTags(elems[0].M_Chips.chipsData)
            },
            onChipDelete: () => {
                setTags(elems[0].M_Chips.chipsData)
            },
            placeholder: 'Enter Tag...',
            secondaryPlaceholder: '+Tag',
        });
    }

    function handleGetArticle(url, tags) {
        var tagArray = []
        tags.forEach((element) => {
            tagArray.push(element.tag)
        })

        if (new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?").test(url)) {
            getArticle(url, tagArray, userID)
                .then(result => result.json())
                .then(result => {
                    setHideToggle(true)
                    setArticle(result.content)
                })
        } else {
            M.toast({ html: 'Geen geldige URL' })
        }
    }

    return <div className="readArticle">
        <h2 class="center">Save Web Article</h2>
        <input type="text" placeholder="URL..." onChange={(e) => setUrl(e.target.value)} value={url} />
        <div class="chips chips-placeholder chips-autocomplete" ></div>
        <button className="waves-effect waves-light btn-small blue accent-2" onClick={() => { handleGetArticle(url, tags) }}>Save</button>

        <div class={'container flow-text text-' + props.font_size}>
            {parse(article)}
        </div>
    </div >
}