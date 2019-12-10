
var yyy = document.getElementById('xxx')
//全屏
autoCanvasSize(yyy)

/*********/
var ctx = yyy.getContext('2d')
using = false
var path = { 'x': undefined, 'y': undefined }
xxxx(ctx)

/*******/
//橡皮擦
var eraserEnabled = false
eraser.onclick = function () {
    eraserEnabled = true
    eraser.classList.add('active')
    pen.classList.remove('active')
}
pen.onclick = function () {
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}

//画笔
ctx.fillStyle = 'red'
ctx.strokeStyle = 'red'
red.onclick = function () {
    ctx.fillStyle = 'red'
    ctx.strokeStyle = 'red'
    red.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
}
green.onclick = function () {
    ctx.fillStyle = 'green'
    ctx.strokeStyle = 'green'
    green.classList.add('active')
    red.classList.remove('active')
    blue.classList.remove('active')
}
blue.onclick = function () {
    ctx.fillStyle = 'blue'
    ctx.strokeStyle = 'blue'
    blue.classList.add('active')
    green.classList.remove('active')
    red.classList.remove('active')
}


/********/
//工具
function autoCanvasSize(canvas) {
    setCanvasSize(canvas)
    window.onresize = function () {
        setCanvasSize(canvas)
    }
}
function xxxx(ctx) {
    if (document.body.ontouchstart !== undefined) {
        //触摸
        yyy.ontouchstart = function (a) {
            var x = a.touches[0].clientX
            var y = a.touches[0].clientY
            using = true
            if (eraserEnabled) {
                ctx.clearRect(x - 4, y - 4, 8, 8)
            } else {
                path = { 'x': x, 'y': y }
                drawCircle(x, y, 4)
            }
        }
        yyy.ontouchmove = function (a) {
            var x = a.touches[0].clientX
            var y = a.touches[0].clientY
            if (!using) { return }
            if (eraserEnabled) {
                ctx.clearRect(x - 4, y - 4, 8, 8)
            } else {
                var newPath = { 'x': x, 'y': y }
                drawLine(path.x, path.y, newPath.x, newPath.y)
                drawCircle(x, y, 4)
                path = newPath
            }
        }
        yyy.ontouchend = function (a) {
            using = false
        }
    } else {
        //不支持触摸
        yyy.onmousedown = function (a) {
            var x = a.clientX
            var y = a.clientY
            using = true
            if (eraserEnabled) {
                ctx.clearRect(x - 4, y - 4, 8, 8)
            } else {
                path = { 'x': x, 'y': y }
                drawCircle(x, y, 4)
            }
        }
        yyy.onmousemove = function (a) {
            var x = a.clientX
            var y = a.clientY
            if (!using) { return }
            if (eraserEnabled) {
                ctx.clearRect(x - 4, y - 4, 8, 8)
            } else {
                var newPath = { 'x': x, 'y': y }
                drawLine(path.x, path.y, newPath.x, newPath.y)
                drawCircle(x, y, 4)
                path = newPath
            }
        }
        yyy.onmouseup = function (a) {
            using = false
        }
    }
}
//circle
function drawCircle(x, y, radius) {

    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2) //圆心位置，半径，开始角度，结束角度
    ctx.fill()
}
//line
function drawLine(beginX, beginY, closeX, closeY) {
    ctx.beginPath()

    ctx.moveTo(beginX, beginY)
    ctx.lineTo(closeX, closeY)
    ctx.lineWidth = 8
    ctx.stroke()
}

function setCanvasSize(canvas) {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
}



