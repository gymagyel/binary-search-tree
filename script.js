class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }
  buildTree(array) {
  if (array.length === 0) {
    return null;
  }

  const sortedArray = [...new Set(array)].sort((a, b) => a - b);

  const mid = Math.floor(sortedArray.length / 2);

  const root = new Node(sortedArray[mid]);

  root.left = this.buildTree(sortedArray.slice(0, mid));

  root.right = this.buildTree(sortedArray.slice(mid + 1));

  return root;
}

includes(value, node = this.root) {
  if (node === null) {
    return false;
  }

  if (node.data === value) {
    return true;
  }

  if (value < node.data) {
    return this.includes(value, node.left);
  }

  return this.includes(value, node.right);
}

insert(value, node = this.root) {
  if (node.data === value) {
    return;
  }

  if (value < node.data) {
    if (node.left === null) {
      node.left = new Node(value);
    } else {
      this.insert(value, node.left);
    }
  } else {
    if (node.right === null) {
      node.right = new Node(value);
    } else {
      this.insert(value, node.right);
    }
  }
}

deleteItem(value, node = this.root) {
  if (node === null) {
    return null;
  }

  if (value < node.data) {
    node.left = this.deleteItem(value, node.left);
  } else if (value > node.data) {
    node.right = this.deleteItem(value, node.right);
  } else {

    // CASE 1: no left child
    if (node.left === null) {
      return node.right;
    }

    // CASE 2: no right child
    if (node.right === null) {
      return node.left;
    }

    // CASE 3: two children
    let successor = node.right;

    while (successor.left !== null) {
      successor = successor.left;
    }

    node.data = successor.data;

    node.right = this.deleteItem(successor.data, node.right);
  }

  return node;
}

levelOrderForEach(callback) {
  if (!callback) {
    throw new Error("Callback is required");
  }

  const queue = [];

  queue.push(this.root);

  while (queue.length > 0) {
    const current = queue.shift();

    callback(current.data);

    if (current.left !== null) {
      queue.push(current.left);
    }

    if (current.right !== null) {
      queue.push(current.right);
    }
  }
}

inOrderForEach(callback, node = this.root) {
  if (!callback) {
    throw new Error("Callback is required");
  }

  if (node === null) {
    return;
  }

  this.inOrderForEach(callback, node.left);

  callback(node.data);

  this.inOrderForEach(callback, node.right);
}

preOrderForEach(callback, node = this.root) {
  if (!callback) {
    throw new Error("Callback is required");
  }

  if (node === null) {
    return;
  }

  callback(node.data);

  this.preOrderForEach(callback, node.left);

  this.preOrderForEach(callback, node.right);
}

postOrderForEach(callback, node = this.root) {
  if (!callback) {
    throw new Error("Callback is required");
  }

  if (node === null) {
    return;
  }

  this.postOrderForEach(callback, node.left);

  this.postOrderForEach(callback, node.right);

  callback(node.data);
}

find(value, node = this.root) {
  if (node === null) {
    return null;
  }

  if (node.data === value) {
    return node;
  }

  if (value < node.data) {
    return this.find(value, node.left);
  }

  return this.find(value, node.right);
}

height(value) {
  const node = this.find(value);

  if (node === null) {
    return undefined;
  }

  const getHeight = (currentNode) => {
    if (currentNode === null) {
      return -1;
    }

    const leftHeight = getHeight(currentNode.left);

    const rightHeight = getHeight(currentNode.right);

    return Math.max(leftHeight, rightHeight) + 1;
  };

  return getHeight(node);
}

depth(value, node = this.root, depthCount = 0) {
  if (node === null) {
    return undefined;
  }

  if (node.data === value) {
    return depthCount;
  }

  if (value < node.data) {
    return this.depth(value, node.left, depthCount + 1);
  }

  return this.depth(value, node.right, depthCount + 1);
}

getNodeHeight(node) {
  if (node === null) {
    return -1;
  }

  const leftHeight = this.getNodeHeight(node.left);

  const rightHeight = this.getNodeHeight(node.right);

  return Math.max(leftHeight, rightHeight) + 1;
}

isBalanced(node = this.root) {
  if (node === null) {
    return true;
  }

  const leftHeight = this.getNodeHeight(node.left);

  const rightHeight = this.getNodeHeight(node.right);

  const difference = Math.abs(leftHeight - rightHeight);

  if (difference > 1) {
    return false;
  }

  return (
    this.isBalanced(node.left) &&
    this.isBalanced(node.right)
  );
}

rebalance() {
  const values = [];

  this.inOrderForEach((value) => {
    values.push(value);
  });

  this.root = this.buildTree(values);
}


}
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);

  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);

  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
};


function randomArray(size = 10) {
  const array = [];

  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * 100));
  }

  return array;
}

const tree = new Tree(randomArray());

console.log("Balanced?", tree.isBalanced());

console.log("Level Order:");
tree.levelOrderForEach((value) => console.log(value));

console.log("Pre Order:");
tree.preOrderForEach((value) => console.log(value));

console.log("Post Order:");
tree.postOrderForEach((value) => console.log(value));

console.log("In Order:");
tree.inOrderForEach((value) => console.log(value));

tree.insert(101);
tree.insert(150);
tree.insert(200);

console.log("Balanced after insertions?", tree.isBalanced());

prettyPrint(tree.root);

tree.rebalance();

console.log("Balanced after rebalance?", tree.isBalanced());

prettyPrint(tree.root);

console.log("Level Order After Rebalance:");
tree.levelOrderForEach((value) => console.log(value));

console.log("Pre Order After Rebalance:");
tree.preOrderForEach((value) => console.log(value));

console.log("Post Order After Rebalance:");
tree.postOrderForEach((value) => console.log(value));

console.log("In Order After Rebalance:");
tree.inOrderForEach((value) => console.log(value));