class Calendar {
    constructor(nowDate) {
        this.dates = []
        this.table = null
        this.thead = null
        this.tbody = null
        this.nowDate = nowDate
        this.getDates(nowDate)
        this.highlightDate(nowDate)
    }

    getDates(date) {
        let first = new Date(new Date(date).setDate(1)),
            firDate = first.getDate(),
            firDay = first.getDay()
        let last = new Date(new Date(new Date(date).setMonth(date.getMonth() + 1)).setDate(0)),
            lastDate = last.getDate(),
            lastDay = last.getDay()

        let dates = []
        let tmpDay = firDay,
            tmpDate = firDate
        while (tmpDay > 0) {
            dates.push('')
            tmpDay--
        }
        do {
            dates.push(tmpDate)
            tmpDate++
        } while (tmpDate <= lastDate)
        tmpDay = lastDay
        while (tmpDay < 6) {
            dates.push('')
            tmpDay++
        }
        this.dates.push(dates.slice(0, 7))
        this.dates.push(dates.slice(7, 14))
        this.dates.push(dates.slice(14, 21))
        this.dates.push(dates.slice(21, 28))
        this.dates.push(dates.slice(28, 35))
        this.renderTable()
    }

    renderTable() {
        let table = document.createElement('table')
        let thead = document.createElement('thead')
        let tbody = document.createElement('tbody')
        this.table = table
        this.thead = thead
        this.tbody = tbody
        table.appendChild(thead)
        table.appendChild(tbody)
        this.renderThead()
        this.renderTbody()
    }

    renderThead() {
        this.thead.innerHTML = ''
        let thead = ['日', '一', '二', '三', '四', '五', '六', ]
        for (let i = 0; i < thead.length; i++) {
            let td = document.createElement('td')
            td.innerHTML = thead[i]
            this.thead.appendChild(td)
        }
    }

    renderTbody() {
        this.tbody.innerHTML = ''
        for (let i = 0; i < this.dates.length; i++) {
            let tr = document.createElement('tr')
            this.tbody.appendChild(tr)
            for (let j = 0; j < this.dates[i].length; j++) {
                let td = document.createElement('td')
                td.innerHTML = this.dates[i][j]
                tr.appendChild(td)
            }
        }
    }

    highlightDate(date) {
        let day = date.getDate()
        for (let i = 0; i < this.dates.length; i++) {
            let index = this.dates[i].indexOf(day)
            if (index != -1) {
                let column = index
                let row = i
                let o = this.tbody.getElementsByTagName('tr')[row].getElementsByTagName('td')[column]
                o.style.backgroundColor = '#3f3f3f'
            }
        }
    }

    appendIn(e) {
        e.appendChild(this.table)
    }
}