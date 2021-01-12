import React, { useState, useEffect } from 'react';
import { saveArticle } from '../serverCommunication'

import M from 'materialize-css'

export default function SaveArticle(props) {
    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState([]);
    const [currentTags, setCurrentTags] = useState([]);
    const [usedTags, setUsedTags] = useState(props.tags);

    let tempArray = []

    useEffect(() => {
        handleTagChips()
    }, [tags])

    useEffect(() => {
        getUsedTags(props.tags)
    }, [props.tags])

    function getUsedTags(tags) {
        printTree(tags)
        setUsedTags(tempArray)
    }

    function printTree(treeNode, indent = " ") {
        // console.log(indent + treeNode.tagName);
        if (treeNode.subTags && treeNode.subTags.length > 0) {
            treeNode.subTags.forEach((subtag) => {
                let tag = { tagName: subtag.tagName, index: subtag.index, parent: subtag.parent }
                tempArray.push(tag)
                printTree(subtag, indent + "  ");
            });
        }
    }

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
                    saveArticle(url, tags, title)
                        .then((response) => { response.json() })
                        .then((response) => { console.log(response) })
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
        if (currentTags.length >= 1) {
            var tagArray = []

            currentTags.forEach((element) => {
                tagArray.push(element.tag)
            })
            setTags([...tags, tagArray])
        } else {
            M.toast({ html: 'Geen tags ingevuld' })
        }

    };

    const handleRemovePastTag = index => {
        const List = [...usedTags];
        List.splice(index, 1);
        setUsedTags(List);
    };

    function handleAddPastTag(element, i) {
        console.log(element)
        var tagArray = []
        var allTags = []
        // console.log(allTags)
        allTags.forEach((data) => {
            if (data.parent === element.tagName) {
                console.log(element.tagName)
                console.log(data.parent)
                console.log('---')
                if (data.parent !== '/') {
                    handleAddPastTag(data.parent, i)
                }
            }
        })
        // tagArray.push(element.tagName)

        // setTags([...tags, tagArray])
        // handleRemovePastTag(i)
    }

    return <div className="readArticle">
        <h2 class="center">Save Web Article</h2>
        <input type="text" id="url" placeholder="URL..." onChange={(e) => setUrl(e.target.value)} value={url} />
        <input type="text" id="title" placeholder="Title..." onChange={(e) => setTitle(e.target.value)} value={title} />
        <div class="chips chips-placeholder chips-autocomplete tooltipped" data-position="bottom" data-tooltip="[Tag requirements] Allow chars: A-Z / 0-9 / _  / - / Max length: 15 chars" ></div><button className="waves-effect waves-light btn-small blue accent-2" id="addTag" onClick={() => { handleAddClick() }}>Add</button>
        <h3>Used Tags:</h3>
        {tags.map((element, i) => {
            return <h4 key={i}>
                <li>{element + " "}
                    <button className="btn-floating btn-small waves-effect waves-light red" onClick={() => { handleRemoveClick(i) }}>
                        <i class="material-icons">delete</i>
                    </button>
                </li>
            </h4>
        })}
        <h3>Past Tags:</h3>
        {/* {usedTags.map((element, i) => {
            let tagName = element.tagName
            for (let index = 0; index < element.index; index++) {
                tagName = "‎‎‎‏‏‎    " + tagName
            }
            // console.log(tagName)
            return <h4 key={i}>
                {tagName + " "}
                <button className="btn-floating btn-small waves-effect waves-light green" onClick={() => { handleAddPastTag(element, i) }}>
                    <i class="material-icons">add</i>
                </button>
            </h4>
        })} */}
        <button className="waves-effect waves-light btn-small blue accent-2" id="saveArticle" onClick={() => { handleSaveArticle(url, tags, title) }}>Save</button>

    </div >

}

