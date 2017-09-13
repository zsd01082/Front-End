class Student {
    constructor(name, Chinese, math, English) {
        this.name = name
        this.Chinese = parseInt(Chinese)
        this.math = parseInt(math)
        this.English = parseInt(English)
        this.totalPoints = this.sum()
    }

    sum() {
        return this.Chinese + this.math + this.English
    }
}

class Students {
    constructor(students, table) {
        this.students = students
        this.table = table
        this.renderTbody()
        this.sortEvent()
    }

    renderTbody() {
        let tbody = document.createElement('tbody')
        this.table.appendChild(tbody)
        for (let i = 0; i < this.students.length; i++) {
            let tr = document.createElement('tr')
            tbody.appendChild(tr)
            let theads = Object.keys(this.students[i])
            for (let j = 0; j < theads.length; j++) {
                let td = document.createElement('td')
                td.innerHTML = this.students[i][theads[j]]
                tr.appendChild(td)
            }
        }
    }

    sortEvent() {
        this.table.addEventListener('click', event => {
            let subject = event.target.dataset.subject
            let sortord = event.target.dataset.sortord
            if (subject && sortord) {
                this.sort(subject, sortord)
            }
        })
    }

    sort(subject, sortord) {
        this.students.sort((a, b) => sortord * (a[subject] - b[subject]))
            //删除原表格内容
        let tbody = this.table.getElementsByTagName('tbody')[0]
        this.table.removeChild(tbody)
            //创建新表格
        this.renderTbody()
    }
}

const $ = e => document.querySelector(e)

const __main = function() {
    let table = $('#table')
    let students = []
    students.push(new Student('小明', 80, 90, 70))
    students.push(new Student('小红', 90, 60, 90))
    students.push(new Student('小亮', 60, 100, 70))
    new Students(students, table)
}

__main()