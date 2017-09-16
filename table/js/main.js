/* class Student {
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
 */
const $ = e => document.querySelector(e)

const log = console.log.bind()

const randomInt = (a, b) => Math.trunc(Math.random() * (b - a + 1) + a)

const __main = function() {
    //let table = $('#table')
    let students = []
    let table = new Table({
            append: $('body'),
            data: {
                thead: ['姓名', '语文', '数学', '英语', '政治'],
                sortSwitch: [false, true, true, true, true],
                tbody: [
                    ['小A', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)],
                    ['小S', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)],
                    ['小D', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)],
                    ['小F', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)],
                    ['小G', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)],
                    ['小H', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)],
                    ['小J', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)],
                    ['小K', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)],
                    ['小L', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)],
                    /* ['小Q', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)],
                    ['小W', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)],
                    ['小E', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)],
                    ['小R', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)],
                    ['小T', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)],
                    ['小Y', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)],
                    ['小U', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)],
                    ['小I', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)],
                    ['小O', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)],
                    ['小P', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)],
                    ['小Z', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)],
                    ['小X', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)],
                    ['小C', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)],
                    ['小V', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)],
                    ['小B', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)],
                    ['小N', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)],
                    ['小M', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)], */
                ],
            },
            sortable: true,
            headForzenable: true,
            headColor: '#aaaaaa',
        })
        /* students.push(new Student('小明', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)))
        students.push(new Student('小红', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)))
        students.push(new Student('小亮', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)))
        students.push(new Student('小绿', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)))
        students.push(new Student('小蓝', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)))
        students.push(new Student('小黑', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)))
        students.push(new Student('小白', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)))
        students.push(new Student('小彩', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)))
        students.push(new Student('小灰', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)))
        students.push(new Student('小黄', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)))
        students.push(new Student('小暗', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)))
        students.push(new Student('小橙', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)))
        students.push(new Student('小非', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)))
        students.push(new Student('小欧', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)))
        students.push(new Student('小亚', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)))
        students.push(new Student('小的', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)))
        students.push(new Student('小和', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)))
        students.push(new Student('小规', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)))
        students.push(new Student('小俄', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)))
        students.push(new Student('小你', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)))
        students.push(new Student('小额', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)))
        students.push(new Student('小个', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)))
        students.push(new Student('小了', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)))
        students.push(new Student('小有', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)))
        students.push(new Student('小去', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)))
        students.push(new Student('小跟', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)))
        students.push(new Student('小很', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)))
        students.push(new Student('小快', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)))
        students.push(new Student('小大', randomInt(0, 100), randomInt(0, 100), randomInt(0, 100)))
    new Students(students, table) */
}

__main()