const $ = e => document.querySelector(e)

const log = console.log.bind()

const __main = function() {
    let jigsaw = new Jigsaw({
        width: 800,
        height: 450,
        appendIn: $('body'),
        pictures: [
            'picture/1.jpg',
            'picture/2.jpg',
            'picture/3.jpg',
            'picture/4.jpg',
        ],
    })
}

__main()