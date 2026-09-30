const { default: Tree } = await import("./tree.js");

function createRandArr(length) {
    const randArr = [];

    let i = 0;
    while (i < length) {
        const randNumb = Math.floor(Math.random() * 100);
        randArr.push(randNumb);
        i++;
    }
    
    return randArr;
}

const test = new Tree(createRandArr(32));
Tree.prettyPrint(test.root);
console.log(test.isBalanced());
console.log("Level Order:");
test.levelOrderForEach((x) => console.log(x));
console.log("Preorder:");
test.preOrderForEach((x) => console.log(x));
console.log("Postorder:");
test.postOrderForEach((x) => console.log(x));
console.log("Inorder:");
test.inOrderForEach((x) => console.log(x));
for (let i = 0; i < 16; i++) {
    const randNumAbove100 = Math.floor(Math.random() * (199 - 101) + 101);
    test.insert(randNumAbove100);
}
Tree.prettyPrint(test.root);
console.log(test.isBalanced());
test.rebalance();
Tree.prettyPrint(test.root);
console.log(test.isBalanced());
console.log("Level Order:");
test.levelOrderForEach((x) => console.log(x));
console.log("Preorder:");
test.preOrderForEach((x) => console.log(x));
console.log("Postorder:");
test.postOrderForEach((x) => console.log(x));
console.log("Inorder:");
test.inOrderForEach((x) => console.log(x));