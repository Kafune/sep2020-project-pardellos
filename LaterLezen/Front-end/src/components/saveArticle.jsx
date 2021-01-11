import React, { useState, useEffect } from 'react';
import { saveArticle } from '../serverCommunication'

import M from 'materialize-css'

// 18/12/2020
// front end werkt het meegegeven van 2d array en deze te verwerken in de check 
// alleen bugged nu wel de chips nog met initializen, want zonder de useeffect initialized hij initialized hij niet
// en met reset hij alles telkens

// ook buttons gemaakt om meerdere chip inputs toetevoegen/deleten (werkt)

// backend klopt de processtags nog niet helemaal
// en het maken van de trees (mijn model loopt niet in sync)

export default function SaveArticle(props) {
    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState([]);
    const [currentTags, setCurrentTags] = useState([]);

    useEffect(() => {
        handleTagChips()
    }, [tags])

    function handleTagChips() {
        setCurrentTags([]);

        var elems = document.querySelectorAll('.chips');
        var instances = M.Chips.init(elems, {
            onChipAdd: () => {
                setCurrentTags(elems[0].M_Chips.chipsData)
            },
            onChipDelete: () => {
                setCurrentTags(elems[0].M_Chips.chipsData)
            },
            placeholder: 'Enter Tag...',
            secondaryPlaceholder: '+ Sub Tag...',
        });
    }

    const handleAddFields = () => {
        setTags([...tags, {tag: ''}])
    }

    const handleRemoveFields = (index) => {
        const values = [...tags]
        values.splice(index,1);
        setTags(values)
    }

    function handleSaveArticle(url, tags, title) {
        let noErrors = true
        if (new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?").test(url)) {
            if (tags !== undefined) {
                tags.forEach((data) => {
                    data.forEach((element) => {
                        if (!new RegExp("^[a-zA-Z0-9_.-]{1,15}$").test(element)) {
                            M.toast({ html: 'Geen geldige tag: ' + element })
                            noErrors = false
                        }
                    })
                })
                if (noErrors === true) {
                    console.log(tags)
                    saveArticle(url, tags, title)
                    .then((response) => {response.json()})
                    .then((response) => {console.log(response)})
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

    const handleRemoveClick = index => {
        const List = [...tags];
        List.splice(index, 1);
        setTags(List);
    };

    function handleAddClick() {
        var tagArray = []

        currentTags.forEach((element) => {
            tagArray.push(element.tag)
        })
        setTags([...tags, tagArray])
    };

    return <div className="readArticle">
        <h2 class="center">Save Web Article</h2>
        <input type="text" id="url" placeholder="URL..." onChange={(e) => setUrl(e.target.value)} value={url} />
        <input type="text" id="title" placeholder="Title..." onChange={(e) => setTitle(e.target.value)} value={title} />
        <div class="chips chips-placeholder chips-autocomplete tooltipped" id="chipsDiv" data-position="bottom" data-tooltip="[Tag requirements] Allow chars: A-Z / 0-9 / _  / - / Max length: 15 chars" ></div><button className="waves-effect waves-light btn-small blue accent-2" id="addTag" onClick={() => { handleAddClick() }}>Add</button>
        <h3>Used Tags:</h3>
        {tags.map((element, i) => {
            return <h5 key={i}>
                <li>{element + " "}
                    <button className="btn-floating btn-small waves-effect waves-light red" onClick={() => { handleRemoveClick(i) }}>
                        <i class="material-icons" id="deleteTag">delete</i>
                    </button>
                </li>
            </h5>
        })}
        <button className="waves-effect waves-light btn-small blue accent-2" id="saveArticle" onClick={() => { handleSaveArticle(url, tags, title) }}>Save</button>
    </div >
}