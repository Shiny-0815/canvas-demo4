
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
clear.onclick=function(){
    ctx.clearRect(0,0,yyy.width,yyy.height);  
}
save.onclick=function(){
    var url=yyy.toDataURL("image/png")
    var a=document.createElement('a')
    document.body.appendChild(a)
    a.href=url
    a.download='我的画'
    a.target='_blank'
    a.click()
}

//画笔
radius=1.5
ctx.lineWidth = 3
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
thin.onclick = function () {
    ctx.lineWidth = 3;
    radius=1.5;
    thin.classList.add('active')
    thick.classList.remove('active')
    middle.classList.remove('active')
}
middle.onclick = function () {
    ctx.lineWidth = 5;
    radius=2.5;
    middle.classList.add('active')
    thick.classList.remove('active')
    thin.classList.remove('active')
}
thick.onclick = function () {
    ctx.lineWidth = 8;
    radius=4;
    thick.classList.add('active')
    thin.classList.remove('active')
    middle.classList.remove('active')
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
                drawCircle(x, y)
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
                drawCircle(x, y)
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
                drawCircle(x, y)
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
                drawCircle(x, y)
                path = newPath
            }
        }
        yyy.onmouseup = function (a) {
            using = false
        }
    }
}
//circle
function drawCircle(x, y) {
    //radius = 4
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2) //圆心位置，半径，开始角度，结束角度
    ctx.fill()
}
//line
function drawLine(beginX, beginY, closeX, closeY) {
    ctx.beginPath()

    ctx.moveTo(beginX, beginY)
    ctx.lineTo(closeX, closeY)

    ctx.stroke()
}

function setCanvasSize(canvas) {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
}



