import React, { useState, useEffect } from 'react';
import { saveArticle } from '../serverCommunication'

import M from 'materialize-css'


export default function SaveArticle(props) {
    const [url, setUrl] = useState('');
    const [tags, setTags] = useState([]);
    const [title, setTitle] = useState('')

    useEffect(() => {
        handleTagChips()
    }, [])

    function handleTagChips() {
        var elems = document.querySelectorAll('.chips');
        var instances = M.Chips.init(elems, {
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

    function handleSaveArticle(url, tags, title) {
        let noErrors = true

        if (new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?").test(url)) {
            if (tags !== undefined) {
                var tagArray = []
                tags.forEach((element) => {
                    if (new RegExp("^[a-zA-Z0-9_.-]{1,15}$").test(element.tag)) {
                        tagArray.push(element.tag)
                    } else {
                        M.toast({ html: 'Geen geldige tag: ' + element.tag })
                        noErrors = false
                    }
                })
                if (noErrors === true) {
                    saveArticle(url, tagArray, title)
                        .then(() => M.toast({ html: 'Article succesfully saved' }))
                }
            }
            else {
                M.toast({ html: 'Please enter atleast one tag' })
            }
        } else {
            M.toast({ html: 'Geen geldige URL' })
        }
    }

    return <div className="readArticle">
        <h2 class="center">Save Web Article</h2>
        <input type="text" id="url" placeholder="URL..." onChange={(e) => setUrl(e.target.value)} value={url} />
        <input type="text" id="title" placeholder="Title..." onChange={(e) => setTitle(e.target.value)} value={title} />
        <div class="chips chips-placeholder chips-autocomplete tooltipped" data-position="bottom" data-tooltip="[Tag requirements] Allow chars: A-Z / 0-9 / _  / - / Max length: 15 chars" ></div>        
        <button className="waves-effect waves-light btn-small blue accent-2" id="saveArticle" onClick={() => { handleSaveArticle(url, tags, title) }}>Save</button>
    </div >
}