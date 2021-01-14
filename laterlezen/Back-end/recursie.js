const ObjectID = require("mongodb").ObjectID;
let theTree = {
  tagName: "/",
  parent: null,
  subTags: [],
};

function printTree(treeNode, indent = "") {
  console.log(indent + treeNode.tagName);
  if (treeNode.subTags && treeNode.subTags.length > 0) {
    treeNode.subTags.forEach((subtag) => {
      printTree(subtag, indent + "  ");
    });
  }
}

function tree2List(treeNode) {
  // console.log( indent + treeNode.tagName );
  result = [treeNode.tagName];
  if (treeNode.subTags && treeNode.subTags.length > 0) {
    treeNode.subTags.forEach((subtag) => {
      result = result.concat(tree2List(subtag));
    });
  }
  return result;
}

function findInTree(treeNode, filterFunc) {
  if (filterFunc(treeNode)) {
    return treeNode;
  } else if (treeNode.subTags && treeNode.subTags.length > 0) {
    let childResult = undefined;
    for (child of treeNode.subTags) {
      childResult = findInTree(child, filterFunc);
      if (childResult) {
        break;
      }
    }
    return childResult;
  } else {
    return undefined;
  }
  throw "THIS SHOULD NEVER HAPPEN";
}


function addChild(tree, tagName, childName) {
  const parent = findInTree(tree, (treenode) => treenode.tagName === tagName);
  //console.log("addchild:", parent);
  if (!parent) {
    throw "PARENT '" + tagName + "' NOT FOUND";
  }
  if (parent.subTags == undefined) {
    parent.subTags = [];
  }
  let obj = parent.subTags.find(o => o.tagName === childName);
  if (!obj) {
    parent.subTags.push({
      tagName: childName,
      parent: tagName,
      subTags: []
    });
  }
}

let ubertest = [
  ["a", "b", "c"],
  ["b", "c", "d"]
]
console.log(ubertest.length)

function createTree(ubertest) {
  if (ubertest.length === 0) {
    ubertest.forEach((tagList) => {
      console.log(tagList);
      let parent = "/";
      tagList.forEach((element) => {
        let index = tagList.indexOf(element);
        console.log(index, element);
        if (index === 0) {
          addChild(theTree, "/", element);
        } else {
          addChild(theTree, tagList[index - 1], element);
        }

      });
      console.dir(theTree, {
        depth: 10000
      });
    })
  } else {
    const addNode = (parent, child) => (parent.children.push(child), child);
    const findNamed = (name, parent) => {
      for (const child of parent.children) {
        if (child.name === name) {
          return child
        }
        const found = findNamed(name, child);
        if (found) {
          return found
        }
      }
    }
    const TOP_NAME = "Top",
      top = theTree(TOP_NAME);
    for (const children of ubertest) {
      let parent = top;
      for (const name of children) {
        const found = findNamed(name, parent);
        parent = found ? found : addNode(parent, theTree(name, parent.name));
      }
    }
    return top
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 

// make parentNode the parent of treeNode, and process treeNode's children recusively

function insertParentLinksInTree( treeNode, parentNode = null ) {

 

  if( treeNode.parent !== undefined ) {  // null is NOT strictly equal to undefined

    // this treeNode already has a property called 'parent'. Assume the tree had already been processed by this function

    return;

  }

 

  treeNode.parent = parentNode;

 

  if(treeNode.subTags && treeNode.subTags.length > 0) {  // treeNode has children

    for( childNode of treeNode.subTags ) {

      insertParentLinksInTree( childNode, treeNode );     // make treeNode the parent of childNode, and process childNode's children recusively

    }

  }

}

 

// create a list of all Nodes that are ancestors of the treeNode.

function getAncestors( tree, treeNode ) {

  //insertParentLinksInTree(tree)  // if tree already has parent-links, this doesn't do anything

  const theParent = treeNode.parent;

  if( theParent ) {

    const parentsAncestors = getAncestors(tree, theParent );

    // const treeNodesAncestors = parentsAncestors.concat( [theParent] )  // return closest ancestor last

    const treeNodesAncestors = [theParent].concat( parentsAncestors )  // return closest ancestor first

    return treeNodesAncestors

  } else {

    return []

  }

}

 

 

let startNode = findInTree( theTree, node => node.tagName == "Framework" )

let ancestors = getAncestors( theTree, startNode )

console.log("Names of all ancestors of tag «${startNode.tagName}»:", ancestors.map( node => node.tagName ))

 

startNode = findInTree( theTree, node => node.tagName == "React" )

ancestors = getAncestors( theTree, startNode )

console.log("Names of all ancestors of tag «${startNode.tagName}»:", ancestors.map( node => node.tagName ))

 

startNode = findInTree( theTree, node => node.tagName == "Pfizer" )

ancestors = getAncestors( theTree, startNode )

console.log("Names of all ancestors of tag «${startNode.tagName}»:", ancestors.map( node => node.tagName ))

 

startNode = findInTree( theTree, node => node.tagName == "Corona" )

ancestors = getAncestors( theTree, startNode )

console.log("Names of all ancestors of tag «${startNode.tagName}»:", ancestors.map( node => node.tagName ))

 

startNode = findInTree( theTree, node => node.tagName == "/" )

ancestors = getAncestors( theTree, startNode )

console.log("Names of all ancestors of tag «${startNode.tagName}»:", ancestors.map( node => node.tagName ))

console.dir((theTree), {
  depth: 1000
})