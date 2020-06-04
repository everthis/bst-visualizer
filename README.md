# BST-visualizer

```js
class Dnode {
  constructor(val) {
    this.val = val
    this.left = null
    this.right = null
  }
}

const root = new Dnode(32)
const l1left = new Dnode(19)
const l1right = new Dnode(14)
const l2right = new Dnode(9)
const l2_1 = new Dnode(8)
const l2_2 = new Dnode(5)
const l2_3 = new Dnode(33)
const l3_1 = new Dnode(1)
const l4_1 = new Dnode(99)
root.left = l1left
root.right = l1right
l1right.right = l2right
l1right.left = l2_3
l1left.left = l2_1
l1left.right = l2_2
l2_1.left = l3_1
l3_1.left = l4_1

const cvs = document.getElementById("cvs")
const tree = new BinaryTree({ canvas: cvs, root })

tree.plot()
```


![example](https://github.com/everthis/BST-visualizer/blob/master/example.png "example")

