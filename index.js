class BinaryTree {
  constructor({ canvas, data }) {
    const dpr = window.devicePixelRatio
    const di = canvas.getBoundingClientRect()
    canvas.setAttribute("width", dpr * di.width)
    canvas.setAttribute("height", dpr * di.height)
    this.dpr = dpr
    this.node = canvas
    this.data = data
    this.ctx = canvas.getContext("2d")
    this.line = new Line()
    this.root = null
  }

  add(val) {
    if (this.root) {
      this.recursiveAddNode(this.root, null, null, val)
    } else {
      this.root = this.addAndDisplayNode(400, 40, 30, this.ctx, val)
    }
  }

  recursiveAddNode(node, prevNode, coordinateCallback, data) {
    if (!node) {
      const xy = coordinateCallback && coordinateCallback()
      const newNode = this.addAndDisplayNode(xy.cx, xy.cy, 30, this.ctx, data)
      this.line.draw(
        prevNode.getX(),
        prevNode.getY(),
        xy.cx,
        xy.cy,
        prevNode.getRadius(),
        this.ctx
      )
      return newNode
    } else {
      if (data <= node.getData()) {
        node.left = this.recursiveAddNode(
          node.left,
          node,
          node.leftCoordinate.bind(node),
          data
        )
      } else {
        node.right = this.recursiveAddNode(
          node.right,
          node,
          node.rightCoordinate.bind(node),
          data
        )
      }
      return node
    }
  }

  addAndDisplayNode(x, y, r, ctx, data) {
    const node = new Node({ val: data, left: null, right: null, x, y, r, ctx })
    node.draw()
    return node
  }
}

class Node {
  constructor({ val, left, right, x, y, r, ctx }) {
    this.val = val
    this.left = left
    this.right = right
    this.x = x
    this.y = y
    this.r = r
    this.ctx = ctx
    ctx.fillStyle = "blue"
    ctx.strokeStyle = "black"
    ctx.lineWidth = 2
    ctx.font = "24px verdana"
  }
  draw() {
    const di = this.ctx.measureText(this.val)
    const xb = di.width / 2
    const yb = 8
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
    this.ctx.stroke()
    this.ctx.closePath()
    this.ctx.fillText(this.val, this.x - xb, this.y + yb)
  }

  getData() {
    return this.val
  }
  getX() {
    return this.x
  }
  getY() {
    return this.y
  }
  getRadius() {
    return this.r
  }
  leftCoordinate() {
    return { cx: this.x - 3 * this.r, cy: this.y + 3 * this.r }
  }
  rightCoordinate() {
    return { cx: this.x + 3 * this.r, cy: this.y + 3 * this.r }
  }
}

class Line {
  draw(x, y, toX, toY, r, ctx) {
    const moveToX = x
    const moveToY = y + r
    const lineToX = toX
    const lineToY = toY - r
    ctx.beginPath()
    ctx.moveTo(moveToX, moveToY)
    ctx.lineTo(lineToX, lineToY)
    ctx.stroke()
  }
}