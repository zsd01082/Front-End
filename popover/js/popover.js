class Popover {
    constructor(img) {
        this.src = img.src
        this.name = img.alt
        this.closeButton = null
        this.popover = null
        this.create()
    }

    create() {
        //创建浮动层
        let popover = document.createElement('div')
        popover.style.position = 'fixed'
        popover.style.width = '800px'
        popover.style.height = '600px'
        popover.style.backgroundColor = '#ffffff'
        popover.style.top = '50%'
        popover.style.left = '50%'
        popover.style.padding = '10px'
        popover.style.borderRadius = '10px'
        popover.style.transform = 'translate(-50%, -50%)'

        //创建标题
        let title = document.createElement('h2')
        title.innerHTML = this.name

        //创建内容图片
        let img = document.createElement('img')
        img.src = this.src
        img.style.width = 'inherit'

        //添加关闭按钮
        let closeButton = document.createElement('img')
        closeButton.src = 'images/close.png'
        closeButton.style.position = 'absolute'
        closeButton.style.top = '10px'
        closeButton.style.right = '10px'
        closeButton.style.width = '30px'
        closeButton.style.cursor = 'pointer'


        //将内容添加进页面
        popover.appendChild(title)
        popover.appendChild(img)
        popover.appendChild(closeButton)
        document.body.appendChild(popover)

        this.closeButton = closeButton
        this.popover = popover
        this.registerAction()
    }

    registerAction() {
        //关闭事件
        this.closeButton.addEventListener('click', () => this.remove())

        //拖动
        this.popover.addEventListener('click', function(event) {
            log(event)
        })

    }

    remove() {
        let popover = this.popover
        document.body.removeChild(popover)
    }
}

const $ = (e) => document.querySelector(e)

const log = console.log.bind()

const __main = function() {
    let imgs = $('#image-gallery').getElementsByTagName('img')
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].addEventListener('click', () => new Popover(imgs[i]))
    }
}

__main()