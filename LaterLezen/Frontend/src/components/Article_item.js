import React, { useState } from 'react';

export default function Article_item(props) {
    return (
        <>
            <div class="col s5">
                <div class="card">
                    <div class="card-image">
                        <img src={props.image} />
                    </div>
                    <div class="card-content">
                        <span class="card-title">{props.title}</span>
                        <p>{props.description}</p>
                    </div>
                </div>
            </div>
        </>
    )
}