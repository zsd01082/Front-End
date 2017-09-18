class Table {
    constructor(o) {
        this.append = o.append
        this.data = o.data
        this.sortable = o.sortable
        this.headForzenable = o.headForzenable
        this.headColor = o.headColor
        this.renderTable()
    }

    renderTable() {
        let table = document.createElement('table')
        let thead = document.createElement('thead')
        let tbody = document.createElement('tbody')
        this.table = table
        this.thead = thead
        this.tbody = tbody
        this.append.appendChild(table)
        table.appendChild(thead)
        table.appendChild(tbody)
        this.renderThead()
        this.renderTbody()
        this.setTable()
    }

    renderThead() {
        this.thead.innerHTML = ''
        for (let i = 0; i < this.data.thead.length; i++) {
            let td = document.createElement('td')
            td.innerHTML = this.data.thead[i]
            this.thead.appendChild(td)
            td.style.backgroundColor = this.headColor
        }
    }

    renderTbody() {
        this.tbody.innerHTML = ''
        for (let i = 0; i < this.data.tbody.length; i++) {
            let tr = document.createElement('tr')
            this.tbody.appendChild(tr)
            for (let j = 0; j < this.data.tbody[i].length; j++) {
                let td = document.createElement('td')
                td.innerHTML = this.data.tbody[i][j]
                tr.appendChild(td)
            }
        }
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
                this.renderTbody()
            },
            down: () => {
                this.data.tbody.sort((a, b) => {
                    return b[i] - a[i]
                })
                this.renderTbody()
            },
        }
    }

    headForzen() {
        let offsetY = this.thead.clientHeight
        let clientY = parseInt(document.defaultView.getComputedStyle(this.table)['marginTop'])
        let top = this.table.offsetTop
        let bottom = top + this.table.clientHeight
        document.addEventListener('scroll', event => {
            if (window.scrollY > top && window.scrollY < bottom) {
                this.thead.style.position = 'fixed'
                this.thead.style.top = '0'
                this.table.style.marginTop = clientY + offsetY + 'px'
            } else {
                this.thead.style.position = 'unset'
                this.table.style.marginTop = clientY + 'px'
            }
        })
    }
}