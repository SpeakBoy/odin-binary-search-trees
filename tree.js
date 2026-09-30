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
}

export default Tree;