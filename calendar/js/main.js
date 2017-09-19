const $ = e => document.querySelector(e)

const log = console.log.bind()

const __main = function() {
    let nowDate = new Date()
    let calendar = new Calendar(nowDate)
    calendar.appendIn($('body'))
}

__main()