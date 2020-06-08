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
const l1_1 = new Node([19])
const l1_2 = new Node([14])
const l2_0 = new Node([9])
const l2_1 = new Node([8])
const l2_2 = new Node([5])
const l2_3 = new Node([33])
const l3_1 = new Node([1,2,3])
const l3_2 = new Node([1])
const l4_2 = new Node([10, 11, 12])
const l5_2 = new Node([11])
const l6_2 = new Node([12])
const l7_2 = new Node([13])
const l8_2 = new Node([14,15])
const l4_1 = new Node([99])
const l4_3 = new Node([79])
const l5_3 = new Node([78,79,80])
root.left = l1_1
root.right = l1_2
l1_2.right = l2_0
l1_2.left = l2_3
l1_1.left = l2_1
l1_1.right = l2_2
l2_2.right = l3_2
l3_2.right = l4_2
l4_2.right = l5_2
l5_2.right = l6_2
l6_2.right = l7_2
l7_2.right = l8_2
l2_1.left = l3_1
l3_1.left = l4_1
l2_3.left = l4_3
l4_3.left = l5_3

const cvs = document.getElementById("cvs")
const tree = new BinaryTree({ canvas: cvs, root })

tree.plot()
```

![Imgur](https://i.imgur.com/eS536ZH.png 'example')
