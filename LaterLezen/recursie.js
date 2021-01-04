const { element } = require("prop-types");

let theTree = {
  tagName: "/",
  subTags: [
    {
      tagName: "Programmeren",
      subTags: [
        {
          tagName: "WebDevelopment",
          subTags: [
            {
              tagName: "Node",
              subTags: [
                {
                  tagName: "NPM",
                  subTags: [
                    {
                      tagName: "Ruby",
                      subTags: [{ tagName: "Modules" }],
                    },
                  ],
                },
              ],
            },
            { tagName: "React", subTags: [] },
            { tagName: "PHP", subTags: [{ tagName: "Framework" }] },
          ],
        },
        {
          tagName: "Functioneel",
          subTags: [
            { tagName: "Monads", subTags: [] },
            { tagName: "Javascript", subTags: [] },
            { tagName: "React", subTags: [] },
          ],
        },
      ],
    },
    {
      tagName: "Corona",
      subTags: [
        { tagName: "Trump", subTags: [] },
        { tagName: "Vaccins", subTags: [{ tagName: "Pfizer", subTags: [] }] },
        { tagName: "Moderna", subTags: [] },
        { tagName: "Tests", subTags: [] },
      ],
    },
  ],
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
  if (!parent) {
    throw "PARENT '" + tagName + "' NOT FOUND";
  }
  if (parent.subTags == undefined) {
    parent.subTags = [];
  }
  parent.subTags.push({ tagName: childName, subTags: [] });
}

function deleteChild(tree, tagName, childName) {
  const parent = findInTree(tree, (treenode) => treenode.tagName === tagName);
  const tempArray = [];
  if (!parent) {
    throw "PARENT '" + tagName + "' NOT FOUND";
  }
  if (parent.subTags.length > 0 && parent.subTags) {
    console.log(parent.subTags);
    parent.subTags.forEach((element) => {
      tempArray.push(element.tagName);
    });

    const index = tempArray.indexOf(childName);
    if (index > -1) {
      parent.subTags.splice(index, 1);
    }
  }
}

function editChild(tree, tagName, childName, newName) {
  const parent = findInTree(tree, (treenode) => treenode.tagName === tagName);
  const tempArray = [];
  if (!parent) {
    throw "PARENT '" + tagName + "' NOT FOUND";
  }

  if (parent.subTags && parent.subTags.length > 0) {
    parent.subTags.forEach((element) => {
      tempArray.push(element.tagName);
    });
    const index = tempArray.indexOf(childName);

    parent.subTags[index].tagName = newName
  }
}

// const foundNode = findInTree(theTree, (node) => node.tagName.startsWith("F"));
// console.log("FOUND IT:", foundNode);

addChild(theTree, "Modules", "Programmeren");


// console.dir( theTree, {depth: 10000} )

// addChild( theTree, "Lantarenpaal", "Boterham")
deleteChild(theTree, "Modules", "Programmeren");
editChild(theTree, "/", "Programmeren", "psst");
// printTree(theTree);
console.log( tree2List(theTree))
