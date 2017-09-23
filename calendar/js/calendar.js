class Calendar {
    constructor(nowDate, resELe) {
        this.resELe = resELe
        this.dates = []
        this.table = null
        this.thead = null
        this.tbody = null
        this.nowDate = nowDate
        this.choiceDate = nowDate
        this.getDates()
        this.renderTable()
        this.highlightDate()
    }

    getDates() {
        let date = this.nowDate
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
        this.dates = []
        this.dates.push(dates.slice(0, 7))
        this.dates.push(dates.slice(7, 14))
        this.dates.push(dates.slice(14, 21))
        this.dates.push(dates.slice(21, 28))
        this.dates.push(dates.slice(28, 35))
    }

    renderTable() {
        let calendar = document.createElement('div')
        calendar.className = "calendar"
        let timeBar = document.createElement('div')
        timeBar.className = "timerBar"
        let table = document.createElement('table')
        let thead = document.createElement('thead')
        let tbody = document.createElement('tbody')
        this.calendar = calendar
        this.table = table
        this.thead = thead
        this.tbody = tbody
        this.timeBar = timeBar
        calendar.appendChild(timeBar)
        calendar.appendChild(table)
        table.appendChild(thead)
        table.appendChild(tbody)
        this.renderTimeBar()
        this.renderThead()
        this.renderTbody()
        this.selectDate()
    }

    selectDate() {
        this.tbody.addEventListener('click', event => {
            if (event.target.innerHTML != '') {
                this.unHighlightDate()
                this.choiceDate = new Date(new Date(this.nowDate).setDate(event.target.innerHTML))
                this.highlightDate()
                this.resELe.innerHTML = this.choiceDate
            }
        })
    }

    renderTimeBar() {
        let date = this.nowDate
        this.timeBar.innerHTML = date.getFullYear() + '年' + (date.getMonth() + 1) + '月'

        //添加调节月份按钮
        let changeDate = document.createElement('div')
        changeDate.className = 'changeDate'
        this.timeBar.appendChild(changeDate)
        let beforeMonth = document.createElement('img')
        let afterMonth = document.createElement('img')
        beforeMonth.src = 'img/before.png'
        afterMonth.src = 'img/after.png'
        changeDate.appendChild(beforeMonth)
        changeDate.appendChild(afterMonth)
        beforeMonth.onclick = () => this.changeMonth(-1)
        afterMonth.onclick = () => this.changeMonth(+1)
    }

    changeMonth(offsetMonth) {
        let date = this.nowDate
        this.nowDate = new Date(new Date(new Date(date).setMonth(date.getMonth() + offsetMonth)))
        this.getDates()
        this.renderTimeBar()
        this.renderTbody()
        this.highlightDate()
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

    highlightDate() {
        let date = this.choiceDate
        if (date.getFullYear() == this.nowDate.getFullYear() && date.getMonth() == this.nowDate.getMonth()) {
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
    }

    unHighlightDate() {
        let date = this.choiceDate
        if (date.getFullYear() == this.nowDate.getFullYear() && date.getMonth() == this.nowDate.getMonth()) {
            let day = date.getDate()
            for (let i = 0; i < this.dates.length; i++) {
                let index = this.dates[i].indexOf(day)
                if (index != -1) {
                    let column = index
                    let row = i
                    let o = this.tbody.getElementsByTagName('tr')[row].getElementsByTagName('td')[column]
                    o.style.backgroundColor = ''
                }
            }
        }
    }

    appendIn(e) {
        e.appendChild(this.calendar)
    }
}