const $ = e => document.querySelector(e)

const log = console.log.bind()

//判断A元素是否在B元素内
const belong = function(a, b) {
    a = a.parentElement
    if (a == b) {
        return true
    }
    if (a == $('body') || !a) {
        return false
    }
    return belong(a, b)
}

const __main = function() {
    let nowDate = new Date()
        //let calendar = new Calendar(nowDate, $('#input-calendar'))
    let calendar = new Calendar({
            date: nowDate,
            input: $('#input-calendar'),
            returnType: 'time',
            appendIn: $('#div-calendar'),
        })
        //calendar.appendIn($('#div-calendar'))
}


__main()