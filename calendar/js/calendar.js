class Calendar {
    constructor(o) {
        this.inputEle = o.input
        this.table = null
        this.thead = null
        this.tbody = null
        this.nowDate = o.date
        this.choiceDate = null
        this.returnType = o.returnType
        this.renderTable()
        this.setInput()
        this.appendIn(o.appendIn)
    }

    setInput() {
        if (!this.inputEle) return false
        this.calendar.style.display = 'none'
        this.inputEle.onfocus = () => {
            this.calendar.style.display = 'block'
        }

        document.onclick = event => {
            if (!belong(event.target, this.inputEle.parentElement) && this.calendar) {
                this.calendar.style.display = 'none'
            }
        }
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
        let res = []
        res.push(dates.slice(0, 7))
        res.push(dates.slice(7, 14))
        res.push(dates.slice(14, 21))
        res.push(dates.slice(21, 28))
        res.push(dates.slice(28, 35))
        return res
    }

    renderTable() {
        let calendar = document.createElement('div')
        calendar.className = 'calendar'
        calendar.id = 'calendar'
        let timeBar = document.createElement('div')
        timeBar.className = "timeBar"
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
        if (this.returnType == 'date') {
            this.selectDate()
        } else if (this.returnType == 'time') {
            this.selectTime()
        }
    }

    selectTime() {
        let time = [null, this.nowDate]
        this.tbody.addEventListener('click', event => {
            if (event.target.innerHTML != '') {
                this.choiceDate = new Date(new Date(this.nowDate).setDate(event.target.innerHTML))
                let choiceDate = new Date(this.nowDate.getFullYear(), this.nowDate.getMonth(), event.target.innerHTML)
                time.push(choiceDate)
                time.shift()
                log(time)
            }
        })
    }

    selectDate() {
        this.choiceDate = this.nowDate
        this.highlightDate(this.choiceDate)
        this.tbody.addEventListener('click', event => {
            if (event.target.innerHTML != '') {
                this.highlightDate(this.choiceDate, false)
                this.choiceDate = new Date(new Date(this.nowDate).setDate(event.target.innerHTML))
                this.highlightDate(this.choiceDate)
                this.inputEle.value = this.choiceDate.getFullYear() + '-' + this.choiceDate.getMonth() + '-' + this.choiceDate.getDate()
            }
        })
    }

    renderTimeBar() {
        let date = this.nowDate

        //显示日期
        let displayTime = document.createElement('div')
        this.timeBar.appendChild(displayTime)
        this.displayTime()

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

    displayTime() {
        let date = this.nowDate
        let displayPath = this.timeBar.getElementsByTagName('div')[0]
        displayPath.innerHTML = date.getFullYear() + '年' + (date.getMonth() + 1) + '月'
    }

    changeMonth(offsetMonth) {
        let date = this.nowDate
        this.nowDate = new Date(new Date(new Date(date).setMonth(date.getMonth() + offsetMonth)))
        this.displayTime()
        this.renderTbody()
        this.highlightDate(this.choiceDate)
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
        let dates = this.getDates()
        for (let i = 0; i < dates.length; i++) {
            let tr = document.createElement('tr')
            this.tbody.appendChild(tr)
            for (let j = 0; j < dates[i].length; j++) {
                let td = document.createElement('td')
                td.innerHTML = dates[i][j]
                tr.appendChild(td)
            }
        }
    }


    highlightDate(date, highlight = true) {
        /*         if (!this.choiceDate) return false
                let date = this.choiceDate */
        if (date.getFullYear() == this.nowDate.getFullYear() && date.getMonth() == this.nowDate.getMonth()) {
            let day = date.getDate()
            let dates = this.getDates()
            for (let i = 0; i < dates.length; i++) {
                let index = dates[i].indexOf(day)
                if (index != -1) {
                    let column = index
                    let row = i
                    let o = this.tbody.getElementsByTagName('tr')[row].getElementsByTagName('td')[column]
                    if (highlight == true) {
                        o.style.backgroundColor = '#3f3f3f'
                    } else if (highlight == false) {
                        o.style.backgroundColor = ''
                    }
                }
            }
        }
    }

    appendIn(e) {
        e.appendChild(this.calendar)
    }
}