const { default: Node } = await import("./node.js");

class Tree {
    constructor(arr) {
        // The array is converted to a set to remove duplicates,
        // and then back into an array. buildTree also expects
        // a sorted array so we sort it before passing it through.
        this.root = this.#buildTree([...new Set(arr.toSorted((a, b) => a - b))]);
    }

    // Takes an array of numbers and turns it into a balanced binary tree
    // full of Node objects appropriately placed.
    #buildTree(arr, start = 0, end = arr.length - 1) {
        if (start > end) {
            return null;
        }

        const mid = start + Math.floor((end - start) / 2);
        let root = new Node(arr[mid]);

        root.left = this.#buildTree(arr, start, mid - 1);
        root.right = this.#buildTree(arr, mid + 1, end);

        return root;
    }

    static prettyPrint(node, prefix = "", isLeft = true) {
        if (node === null || node === undefined) {
            return;
        }

        this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }

    // Accepts a value and returns true if the given value is in the tree.
    // If the value isn't in the tree, it should return false.
    includes(value) {
        return this.#includesRec(value, this.root);
    }

    #includesRec(value, node) {
        if (node === null) {
            return false;
        }
        if (node.data === value) {
            return true;
        }

        return this.#includesRec(value, node.left) || this.#includesRec(value, node.right);
    }

    // Accepts a value and inserts a new node with that value in the tree.
    insert(value) {
        if (!this.includes(value)) {
            this.root = this.#insertRec(value, this.root);
        }
    }

    #insertRec(value, node) {
        if (node === null) {
            return new Node(value);
        }
        if (node.data > value) {
            node.left = this.#insertRec(value, node.left);
        }
        if (node.data < value) {
            node.right = this.#insertRec(value, node.right);
        }
        return node;
    }

    // Accepts a value and removes it from the tree.
    deleteItem(value) {
        if(this.includes(value)) {
            this.root = this.#deleteItemRec(value, this.root);
        }
    }

    #deleteItemRec(value, node) {
        if (node.data > value) {
            node.left = this.#deleteItemRec(value, node.left);
        }
        if (node.data < value) {
            node.right = this.#deleteItemRec(value, node.right);
        }
        if (node.data === value) {
            // 0 children
            if (node.left === null && node.right === null) {
                return null;
            }
            // 1 child left side
            if (node.left !== null && node.right === null) {
                return node.left;
            }
            // 1 child right side
            if (node.left === null && node.right !== null) {
                return node.right;
            }
            // 2 children
            if (node.left !== null && node.right !== null) {
                const succ = this.#getSuccessor(node);
                node.data = succ.data;
                node.right = this.#deleteItemRec(succ.data, node.right);
            } 
        }
        return node;
    }
    
    #getSuccessor(node) {
        node = node.right;
        while (node !== null && node.left !== null) {
            node = node.left;
        }
        return node;
    }

    // Accepts a callback function as its parameter.
    // Should traverse the tree in breadth-first level order
    // and call the callback on each value it traverses.
    levelOrderForEach(callback) {
        if (typeof callback !== "function") {
            throw new Error("callback must be a function!");
        }
        if (this.root === null) {
            return;
        }
        const queue = [];
        queue.push(this.root);
        while (queue.length > 0) {
            const curr = queue.shift();
            callback(curr.data);
            if (curr.left !== null) {
                queue.push(curr.left);
            }
            if (curr.right !== null) {
                queue.push(curr.right);
            }
        }
    }

    // Accepts a callback function as its parameter.
    // Should traverse the tree in depth-first inorder
    // and call the callback on each value it traverses.
    inOrderForEach(callback) {
        if (typeof callback !== "function") {
            throw new Error("callback must be a function!");
        }
        this.#inOrderForEachRec(callback, this.root);
    }

    #inOrderForEachRec(callback, node) {
        if (node === null) {
            return;
        }
        this.#inOrderForEachRec(callback, node.left);
        callback(node.data);
        this.#inOrderForEachRec(callback, node.right);
    }

    // Accepts a callback function as its parameter.
    // Should traverse the tree in depth-first preorder
    // and call the callback on each value it traverses.
    preOrderForEach(callback) {
        if (typeof callback !== "function") {
            throw new Error("callback must be a function!");
        }
        this.#preOrderForEachRec(callback, this.root);
    }

    #preOrderForEachRec(callback, node) {
        if (node === null) {
            return;
        }
        callback(node.data);
        this.#preOrderForEachRec(callback, node.left);
        this.#preOrderForEachRec(callback, node.right);
    }

    // Accepts a callback function as its parameter.
    // Should traverse the tree in depth-first postorder
    // and call the callback on each value it traverses.
    postOrderForEach(callback) {
        if (typeof callback !== "function") {
            throw new Error("callback must be a function!");
        }
        this.#postOrderForEachRec(callback, this.root);
    }

    #postOrderForEachRec(callback, node) {
        if (node === null) {
            return;
        }
        this.#postOrderForEachRec(callback, node.left);
        this.#postOrderForEachRec(callback, node.right);
        callback(node.data);
    }

    // Returns the height of the node containing the given value.
    height(value) {
        if (!this.includes(value)) {
            return undefined;
        }
        return this.#heightRec(value, this.root);
    }

    #heightRec(value, node, valueFound = false) {
        if (!valueFound) {
            if (node.data === value) {
                if (node.left === null && node.right === null) {
                    return 0;
                }
                return 1 + Math.max(this.#heightRec(value, node.left, true), this.#heightRec(value, node.right, true));
            }
            if (node.data > value) {
                return this.#heightRec(value, node.left);
            }
            if (node.data < value) {
                return this.#heightRec(value, node.right);
            }
        }
        if (node === null || (node.left === null && node.right === null)) {
            return 0;
        }
        return 1 + Math.max(this.#heightRec(value, node.left, true), this.#heightRec(value, node.right, true));
    }
}

export default Tree;

const test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);