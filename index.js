class BinaryTree {
  constructor({ canvas, root }) {
    const dpr = window.devicePixelRatio
    const di = canvas.getBoundingClientRect()
    canvas.setAttribute('width', dpr * di.width)
    canvas.setAttribute('height', dpr * di.height)
    this.di = di
    this.dpr = dpr
    this.r = 20
    this.node = canvas
    this.data = root
    this.padding = [20, 20, 20, 20]
    this.ctx = canvas.getContext('2d')
    this.ctx.scale(dpr, dpr)
    this.line = new Line()
    this.root = null
    this.h = this.calcHeight()
    this.m = new Map()
  }
  calcHeight() {
    const height = (node) => {
      if (node === null) return 0
      return Math.max(height(node.left), height(node.right)) + 1
    }
    return height(this.data)
  }
  plot() {
    const q = [this.data]
    let h = this.h
    while (q.length) {
      const size = q.length
      for (let i = 0; i < size; i++) {
        const cur = q.shift()
        this.addNode(cur, h)
        if (cur.left) q.push(cur.left)
        if (cur.right) q.push(cur.right)
      }
      h--
    }
  }
  addNode(node, level) {
    if (this.root) {
      this.recursiveAddNodeV2(node, this.data, level)
    } else {
      this.root = this.addAndDisplayNode(
        this.di.width / 2,
        this.r + this.padding[0],
        this.r,
        this.ctx,
        node.val
      )
      this.m.set(node, this.root)
    }
  }
  recursiveAddNodeV2(node, parent, level) {
    if (node === null || parent === null) return
    if (parent.left === node) {
      this.plotNode(node, parent, 'left', level)
    } else if (parent.right === node) {
      this.plotNode(node, parent, 'right', level)
    } else {
      this.recursiveAddNodeV2(node, parent.left, level)
      this.recursiveAddNodeV2(node, parent.right, level)
    }
  }
  plotNode(node, parent, direction, level) {
    const p = this.m.get(parent)
    const deltaX =
      (this.di.width - this.padding[1] - this.padding[3]) /
      (2 * 2 ** (this.h - level))
    let xy
    if (direction === 'right') {
      xy = p.rightCoordinate(deltaX, this.h - level)
    } else {
      xy = p.leftCoordinate(deltaX, this.h - level)
    }
    const newNode = this.addAndDisplayNode(xy.cx, xy.cy, 20, this.ctx, node.val)
    const [prevX, prevY] = [p.getX(), p.getY()]
    this.line.draw(prevX, prevY, xy.cx, xy.cy, p.getRadius(), this.ctx)
    const [avgX, avgY] = [(prevX + xy.cx) / 2, (prevY + xy.cy) / 2]
    const text = xy.cx - prevX > 0 ? 1 : 0
    const halfW = this.ctx.measureText(text).width / 2
    this.ctx.fillText(text, text === 1 ? avgX + halfW : avgX - halfW * 2, avgY)
    this.m.set(node, newNode)
  }
  addAndDisplayNode(x, y, r, ctx, data) {
    const node = new Node({ val: data, left: null, right: null, x, y, r, ctx })
    node.draw()
    return node
  }
}

class Node {
  constructor({ val, left, right, x, y, r, l, ctx }) {
    this.val = val
    this.left = left
    this.right = right
    this.x = x
    this.y = y
    this.r = r
    this.ctx = ctx
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 2
    this.valText = null
  }
  draw() {
    const yb = 6
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
    this.ctx.stroke()
    this.ctx.closePath()
    this.valText = new Text(this.val, this.x, this.y, 2 * this.r, this.ctx)
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
  leftCoordinate(m) {
    return { cx: this.x - m, cy: this.y + 3 * this.r }
  }
  rightCoordinate(m) {
    return { cx: this.x + m, cy: this.y + 3 * this.r }
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

class Text {
  constructor(content, x, y, width, ctx) {
    this.c = content
    this.x = x
    this.y = y
    this.ctx = ctx
    this.ctx.fillStyle = 'blue'
    this.ctx.font = '14px verdana'
    const h = ctx.measureText('M').width
    for (let i = 0, len = content.length, odd = len % 2 === 1; i < len; i++) {
      this.ctx.fillText(
        this.c[i],
        x - ctx.measureText(this.c[i]).width / 2,
        y + i * h - (len / 2) * h + h
      )
    }
  }
}
