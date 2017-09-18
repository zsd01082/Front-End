const $ = e => document.querySelecto

const log = console.log.bind()

const __main = function() {
    /* let calendar = new Calendar({
        append: $('body'),
        data: {
            thead: ['日', '一', '二', '三', '四', '五', '六', ],
            tbody: [
                [27, 28, 29, 30, 31, 1, 2],
                [3, 4, 5, 6, 7, 8, 9],
                [10, 11, 12, 13, 14, 15, 16],
                [17, 18, 19, 20, 21, 22, 23],
                [24, 25, 26, 27, 28, 29, 30],
            ]
        },
        sortable: false,
        forzenHead: false,
    }) */
    let nowDate = new Date()
    getCalendar(nowDate)
}

const getCalendar = function(date) {
    let first = new Date(new Date(date).setDate(1)),
        firDate = first.getDate(),
        firDay = first.getDay()
    let last = new Date(new Date(new Date(date).setMonth(date.getMonth() + 1)).setDate(0)),
        lastDate = last.getDate(),
        lastDay = last.getDay()

    let result = []
    let tmpDay = firDay,
        tmpDate = firDate
    while (tmpDay > 0) {
        result.push('')
        tmpDay--
    }
    do {
        result.push(tmpDate)
        tmpDate++
    } while (tmpDate <= lastDate)
    tmpDay = lastDay
    while (tmpDay < 6) {
        result.push('')
        tmpDay++
    }
    log(result)
}

__main()