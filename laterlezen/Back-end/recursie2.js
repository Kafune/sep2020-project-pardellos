let theTree = {
  tagName: "/",
  parent: null,
  subTags: [{ tagName: "hallo", parent: "/", subTags: [] }],
};

function createTree(data) {
  const node = (tagName, parent = null) => ({ tagName, parent, subTags: [] });
  const addNode = (parent, child) => (parent.subTags.push(child), child);
  const findNamed = (name, parent) => {
    for (const child of parent.subTags) {
      if (child.tagName === name) {
        return child;
      }
      const found = findNamed(name, child);
      if (found) {
        return found;
      }
    }
  };
  const TOP_NAME = "Top",
    top = node(TOP_NAME);
  for (const children of data) {
    let parent = theTree;
    for (const name of children) {
      let index = children.indexOf(name);
      console.log(index);
      const found = findNamed(name, parent);
      parent = found ? found : addNode(parent, node(name, parent.tagName));
    }
  }
  return top;
}

let data = [
  ["nieuws", "nederland", "corona"],
  ["nieuws", "buitenland", "corona"],
  ["politiek", "nieuws", "nederland", "corona"],
  ["nederland", "financieel", "bitcoin"],
];
console.dir(createTree(data), { depth: 1000 });
console.dir(theTree, { depth: 1000 });
