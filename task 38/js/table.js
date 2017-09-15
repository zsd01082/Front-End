class Table {
    constructor(o) {
        log(o)
        this.append = o.append
        this.data = o.data
        this.sortable = o.sortable
        this.headForzenable = o.headForzenable
        this.headColor = o.headColor
        this.renderTable()
    }

    renderTable() {
        if (this.table) {
            this.table.innerHTML = ''
        }
        let table = document.createElement('table')
        this.append.appendChild(table)

        //表头
        let thead = document.createElement('thead')
        table.appendChild(thead)
        for (let i = 0; i < this.data.thead.length; i++) {
            let td = document.createElement('td')
            td.innerHTML = this.data.thead[i]
            thead.appendChild(td)
            td.style.backgroundColor = this.headColor
        }

        //表身
        let tbody = document.createElement('tbody')
        table.appendChild(tbody)
        for (let i = 0; i < this.data.tbody.length; i++) {
            let tr = document.createElement('tr')
            tbody.appendChild(tr)
            for (let j = 0; j < this.data.tbody[i].length; j++) {
                let td = document.createElement('td')
                td.innerHTML = this.data.tbody[i][j]
                tr.appendChild(td)
            }
        }
        this.table = table
        this.setTable()
    }

    setTable() {
        if (this.sortable) {
            this.sortSwitch()
        }
        if (this.headForzenable) {
            this.headForzen()
        }
    }

    sortSwitch() {
        //添加排序开关
        let theads = this.table.getElementsByTagName('thead')[0].getElementsByTagName('td')
        for (let i = 0; i < this.data.sortSwitch.length; i++) {
            if (this.data.sortSwitch[i]) {
                //创建排序开关
                let sortDiv = document.createElement('div')
                sortDiv.className = 'sort'
                let imgUp = document.createElement('img')
                imgUp.src = 'picture/up.png'
                imgUp.addEventListener('click', event => this.sort(i).up())
                let imgDown = document.createElement('img')
                imgDown.src = 'picture/down.png'
                imgDown.addEventListener('click', event => this.sort(i).down())
                sortDiv.appendChild(imgUp)
                sortDiv.appendChild(imgDown)
                theads[i].appendChild(sortDiv)
            }
        }
    }

    sort(i) {
        return {
            up: () => {
                this.data.tbody.sort((a, b) => {
                    return a[i] - b[i]
                })
                this.renderTable()
            },
            down: () => {
                this.data.tbody.sort((a, b) => {
                    return b[i] - a[i]
                })
                this.renderTable()
            },
        }
    }

    headForzen() {
        log('headForzen')
    }
}