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

const $ = e => document.querySelector(e)

const log = console.log.bind()

/* const getStudents = function(table) {
    let students = []
    let trs = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr')
    for (let i = 0; i < trs.length; i++) {
        let tds = trs[i].getElementsByTagName('td')
        let o = {
            name: null,
            Chinese: null,
            math: null,
            English: null,
        }
        o.name = tds[0].innerHTML
        o.Chinese = tds[1].innerHTML
        o.math = tds[2].innerHTML
        o.English = tds[3].innerHTML
        let student = new Student(o.name, o.Chinese, o.math, o.English)
        students.push(student)
    }
    return students
} */

const renderTbody = function(students, table) {
    let tbody = document.createElement('tbody')
    table.appendChild(tbody)
    for (let i = 0; i < students.length; i++) {
        let tr = document.createElement('tr')
        tbody.appendChild(tr)
        let theads = Object.keys(students[i])
        for (let j = 0; j < theads.length; j++) {
            let td = document.createElement('td')
            td.innerHTML = students[i][theads[j]]
            tr.appendChild(td)
        }
    }
}


const __main = function() {
    let table = $('#table')
    let students = []
    students.push(new Student('小明', 80, 90, 70))
    students.push(new Student('小红', 90, 60, 90))
    students.push(new Student('小亮', 60, 100, 70))
        //let students = getStudents(table)
    renderTbody(students, table)
    sortEvent(students)
}

const sortEvent = function(students) {
    $('#table').addEventListener('click', event => {
        let subject = event.target.dataset.subject
        let sortord = event.target.dataset.sortord
            //log(subject, sortord)
        if (subject && sortord) {
            sort(students, subject, sortord)
        }
    })
}

const sort = function(students, subject, sortord) {
    students.sort((a, b) => sortord * (a[subject] - b[subject]))
        //删除原表格内容
    let table = $('#table')
    let tbody = table.getElementsByTagName('tbody')[0]
    table.removeChild(tbody)
        //创建新表格
    renderTbody(students, table)
}

__main()