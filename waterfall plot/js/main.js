const $ = e => document.querySelector(e)

const log = console.log.bind()

const __main = function() {
    const imgs = [
        'http://via.placeholder.com/300x150/acabad',
        'http://via.placeholder.com/300x340/576353',
        'http://via.placeholder.com/300x170/f4f3f8',
        'http://via.placeholder.com/300x840/173941',
        'http://via.placeholder.com/300x350/119531',
        'http://via.placeholder.com/300x260/1abc41',
        'http://via.placeholder.com/300x240/12acfe',
        'http://via.placeholder.com/300x360/87aacc',
    ]

    let waterFall = new WaterFall($('.waterfall'))
}

__main()