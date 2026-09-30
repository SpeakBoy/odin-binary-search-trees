const { default: Node } = await import("./node.js");

class Tree {
    constructor(arr) {
        // The array is converted to a set to remove duplicates,
        // and then back into an array. buildTree also expects
        // a sorted array so we sort it before passing it through.
        this.root = this.#buildTree([...new Set(arr.toSorted((a, b) => a - b))]);
    }

    #buildTree(arr, start = 0, end = arr.length - 1) {
        console.log(arr);
        if (start > end) {
            return null;
        }

        const mid = start + Math.floor((end - start) / 2);
        let root = new Node(arr[mid]);

        root.left = this.#buildTree(arr, start, mid - 1);
        root.right = this.#buildTree(arr, mid + 1, end);

        return root;
    }
}

export default Tree;