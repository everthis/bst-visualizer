# BST-visualizer

```js
class Node {
  constructor(val) {
    this.val = val
    this.left = null
    this.right = null
  }
}

const root = new Node([32])
const n1 = new Node([19])
const n2 = new Node([14])
const n3 = new Node([9])
const n4 = new Node([8])
const n5 = new Node([5])
const n6 = new Node([33])
const n7 = new Node([1])
const n8 = new Node([99])
root.left = n1
root.right = n2
n2.right = n3
n2.left = n6
n1.left = n4
n1.right = n5
n4.left = n7
n7.left = n8

const cvs = document.getElementById('cvs')
const tree = new BinaryTree({ canvas: cvs, root })

tree.plot()
```

![example](https://github.com/everthis/BST-visualizer/blob/master/example.png 'example')
