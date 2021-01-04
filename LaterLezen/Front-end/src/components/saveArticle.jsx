import React, { useState, useEffect } from 'react';
import { saveArticle } from '../serverCommunication'

import M from 'materialize-css'

export default function SaveArticle(props) {
    const [url, setUrl] = useState('');
    const [tags, setTags] = useState([[]]);
    const [title, setTitle] = useState('');
    const [subtagsInputs, setSubtagsInputs] = useState(1)
    const taglist = [
        {
            tag: 'lol'
        },
        {
            tag: 'lolksdfasdf'
        }
    ]
    

    useEffect(() => {
        handleTagChips()
    }, [])

    function handleTagChips() {
        var elems = document.querySelectorAll('.chips');
        var instances = M.Chips.init(elems, {
            onChipAdd: (elems) => {
                console.log(elems[0].M_Chips.chipsData)
                setTags(elems[0].M_Chips.chipsData)
            },
            onChipDelete: () => {
                setTags(elems[0].M_Chips.chipsData)
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

    useEffect(() => {
        setTags(taglist)

        handleTagChips()
    }, [])

    return <div className="readArticle">
        <h2 class="center">Save Web Article</h2>
        <input type="text" id="url" placeholder="URL..." onChange={(e) => setUrl(e.target.value)} value={url} />
        <input type="text" id="title" placeholder="Title..." onChange={(e) => setTitle(e.target.value)} value={title} />
        {
            tags.map((inputField, index) => (
                <div key={index}>
                        <div class="chips">
                            <input class="custom class"></input>
                        </div>
                </div>
            ))
        }
        <button onClick={(e) => handleAddFields()} className="waves-effect waves-light btn-small blue accent-2" 
        >Add tags field</button><br>
        </br> 
        <br>
        </br> 
        <button className="waves-effect waves-light btn-small blue accent-2" id="saveArticle" onClick={() => { handleSaveArticle(url, tags, title) }}>Save</button>
    </div >
}