class Jigsaw {
    constructor(o) {
        this.appendIn = o.appendIn
        this.width = o.width
        this.height = o.height
        this.pictures = o.pictures
        this.container = null
        this.init()
    }

    init() {
        let container = document.createElement('div')
        container.style.width = this.width + 'px'
        container.style.height = this.height + 'px'
        this.appendIn.append(container)
        this.container = container
        this.render()
    }

    render() {
        const quantity = this.pictures.length
        log(quantity)

        const one = () => {
            let img = document.createElement('img')
            img.src = this.pictures[0]
            img.style.cssText = 'width:inherit;height:inherit'
            this.container.append(img)
        }

        const two = () => {
            let img0 = document.createElement('img')
            let img1 = document.createElement('img')
            img0.src = this.pictures[0]
            img1.src = this.pictures[1]
            img0.style.cssText = 'position: absolute;width: inherit;height: inherit;clip-path: polygon(0 0,33% 0,66% 100%,0 100%);'
            img1.style.cssText = 'position: absolute;width: inherit;height: inherit;clip-path: polygon(33% 0,100% 0,100% 100%,66% 100%);'
            this.container.append(img0)
            this.container.append(img1)
        }

        const three = () => {
            let img0 = document.createElement('img')
            let img1 = document.createElement('img')
            let img2 = document.createElement('img')
            img0.src = this.pictures[0]
            img1.src = this.pictures[1]
            img2.src = this.pictures[2]
            img0.style.cssText = 'position: absolute;width: inherit;height: inherit;clip-path: polygon(0 0,50% 0,50% 100%,0 100%);'
            img1.style.cssText = 'position: absolute;width: inherit;height: inherit;clip-path: polygon(50% 0,100% 0,100% 50%,50% 50%);'
            img2.style.cssText = 'position: absolute;width: inherit;height: inherit;clip-path: polygon(50% 50%,100% 50%,100% 100%,50% 100%);'
            this.container.append(img0)
            this.container.append(img1)
            this.container.append(img2)
        }

        const four = () => {
            let img0 = document.createElement('img')
            let img1 = document.createElement('img')
            let img2 = document.createElement('img')
            let img3 = document.createElement('img')
            img0.src = this.pictures[0]
            img1.src = this.pictures[1]
            img2.src = this.pictures[2]
            img3.src = this.pictures[3]
            img0.style.cssText = 'position: absolute;width: inherit;height: inherit;clip-path: polygon(0 0,50% 0,50% 50%,0 50%);'
            img1.style.cssText = 'position: absolute;width: inherit;height: inherit;clip-path: polygon(50% 0,100% 0,100% 50%,50% 50%);'
            img2.style.cssText = 'position: absolute;width: inherit;height: inherit;clip-path: polygon(0 50%,50% 50%,50% 100%,0 100%);'
            img3.style.cssText = 'position: absolute;width: inherit;height: inherit;clip-path: polygon(50% 50%,100% 50%,100% 100%,50% 100%);'
            this.container.append(img0)
            this.container.append(img1)
            this.container.append(img2)
            this.container.append(img3)
        }

        if (quantity == 1) {
            one()
        }
        if (quantity == 2) {
            two()
        }
        if (quantity == 3) {
            three()
        }
        if (quantity == 4) {
            four()
        }
    }
}