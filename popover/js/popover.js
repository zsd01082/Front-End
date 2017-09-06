class Popover {
    constructor(img) {
        this.src = img.src
        this.name = img.alt
        this.closeButton = null
        this.popover = null
        this.create()
    }

    create() {
        //显示遮罩层
        mask().show()

        //创建浮动层
        let popover = document.createElement('div')
        popover.style.position = 'fixed'

        //设置浮动层大小与位置(初始为居中)
        let width = 800,
            height = 600
        let screenWidth = window.innerWidth,
            screenHeight = window.innerHeight
        let positionX = (screenWidth - width) / 2,
            positionY = (screenHeight - height) / 2
        popover.style.backgroundColor = '#ffffff'
        popover.style.top = positionY + 'px'
        popover.style.left = positionX + 'px'
        popover.style.right = positionX + 'px'
        popover.style.bottom = positionY + 'px'
        popover.style.minHeight = '200px'
        popover.style.minWidth = '420px'
        popover.style.borderRadius = '10px'
        popover.style.zIndex = '1000'

        //创建标题
        let title = document.createElement('h2')
        title.innerHTML = this.name
        title.style.lineHeight = height * 0.04 + 'px'
        title.style.marginLeft = width * 0.05 + 'px'
        title.style.fontSize = width * 0.03 + 'px'

        //创建内容图片
        let img = document.createElement('img')
        img.src = this.src
        img.style.width = width * 0.9 + 'px'
        img.style.height = (height - 25) * 0.8 + 'px'
        img.style.margin = 'auto'

        //添加关闭按钮
        let closeButton = document.createElement('img')
        closeButton.src = 'images/close.png'
        closeButton.style.position = 'absolute'
        closeButton.style.top = '1%'
        closeButton.style.right = '1%'
        closeButton.style.width = width * 0.04 + 'px'
        closeButton.style.cursor = 'pointer'
        closeButton.style.zIndex = '1001'

        //创建拖动栏
        let dragBar = document.createElement('div')
        dragBar.style.position = 'absolute'
        dragBar.style.top = '0'
        dragBar.style.left = '0'
        dragBar.style.right = '0'
        dragBar.style.bottom = '95%'
        dragBar.style.cursor = 'move'

        //创建缩放栏
        let scaleBar = document.createElement('div')
        scaleBar.style.position = 'absolute'
        scaleBar.style.top = '98%'
        scaleBar.style.left = '98%'
        scaleBar.style.right = '0'
        scaleBar.style.bottom = '0'
        scaleBar.style.cursor = 'nw-resize'

        //将内容添加进页面
        popover.appendChild(title)
        popover.appendChild(img)
        popover.appendChild(closeButton)
        popover.appendChild(dragBar)
        popover.appendChild(scaleBar)
        document.body.appendChild(popover)

        this.closeButton = closeButton
        this.dragBar = dragBar
        this.scaleBar = scaleBar
        this.title = title
        this.img = img
        this.popover = popover
        this.registerAction()
    }


    registerAction() {
        //关闭事件
        this.closeButton.addEventListener('click', () => this.remove())

        //拖动
        document.addEventListener('mousedown', event => {
            if (event.path[0] == this.dragBar) {
                this.dragBar.dragable = true
                this.dragBar.dragX = event.clientX
                this.dragBar.dragY = event.clientY
                document.body.style.userSelect = 'none'
                this.popover.left = this.popover.style.left
                this.popover.top = this.popover.style.top
                this.popover.right = this.popover.style.right
                this.popover.bottom = this.popover.style.bottom
            }
        })
        document.addEventListener('mousemove', event => {
            if (this.dragBar.dragable) {
                var offsetX = event.clientX - this.dragBar.dragX,
                    offsetY = event.clientY - this.dragBar.dragY
                this.popover.style.left = (parseInt(this.popover.left) + offsetX) + 'px'
                this.popover.style.top = (parseInt(this.popover.top) + offsetY) + 'px'
                this.popover.style.right = (parseInt(this.popover.right) - offsetX) + 'px'
                this.popover.style.bottom = (parseInt(this.popover.bottom) - offsetY) + 'px'
            }
        })

        //缩放
        document.addEventListener('mousedown', event => {
            if (event.path[0] == this.scaleBar) {
                this.scaleBar.scalable = true
                this.scaleBar.scaleX = event.clientX
                this.scaleBar.scaleY = event.clientY
                document.body.style.userSelect = 'none'
                document.body.style.cursor = 'nw-resize'
                this.popover.right = this.popover.style.right
                this.popover.bottom = this.popover.style.bottom
            }
        })
        document.addEventListener('mousemove', event => {
            if (this.scaleBar.scalable) {
                let offsetX = event.clientX - this.scaleBar.scaleX,
                    offsetY = event.clientY - this.scaleBar.scaleY
                this.popover.style.right = (parseInt(this.popover.right) - offsetX) + 'px'
                this.popover.style.bottom = (parseInt(this.popover.bottom) - offsetY) + 'px'
                let width = parseInt(this.popover.offsetWidth),
                    height = parseInt(this.popover.offsetHeight)
                this.img.style.width = width * 0.9 + 'px'
                this.img.style.height = (height - 25) * 0.8 + 'px'
                this.title.style.lineHeight = height * 0.04 + 'px'
                this.title.style.marginLeft = width * 0.05 + 'px'
                this.title.style.fontSize = width * 0.03 + 'px'
                this.closeButton.style.width = width * 0.04 + 'px'
            }
        })

        //mouseup时，取消所有事件
        document.addEventListener('mouseup', event => {
            this.dragBar.dragable = false
            this.scaleBar.scalable = false
            document.body.style.userSelect = 'auto'
            document.body.style.cursor = 'auto'
        })

    }

    remove() {
        let popover = this.popover
        document.body.removeChild(popover)
        mask().hide()
    }
}

const $ = (e) => document.querySelector(e)

const log = console.log.bind()

const mask = function() {
    let mask = $('.mask')
    return {
        show: function() {
            mask.style.display = 'block'
        },

        hide: function() {
            mask.style.display = 'none'
        }

    }
}

const __main = function() {
    mask().hide()
    let imgs = $('#image-gallery').getElementsByTagName('img')
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].addEventListener('click', () => new Popover(imgs[i]))
    }
}

__main()