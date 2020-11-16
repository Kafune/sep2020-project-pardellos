import React from 'react';
const fs = require('fs')
const {
  extract
} = require('article-parser');

const url = 'https://nos.nl/artikel/2356731-politie-koopt-tientallen-extra-drones-voor-allerlei-nieuwe-taken.html'

export default class ReadArticle extends React.Component {

  render() {
    extract(url).then((article) => {
      console.log(article);
    }).catch((err) => {
      console.log(err);
    });
    return <p>read article screen</p>
  }
}
