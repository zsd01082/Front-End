class WaterFall {
    constructor(container, opts = {}) {
        this.container = container
        this._extend(opts)
    }

    /**
     * @desc check and add default options
     */
    _extend(opts) {
        let res = {
            colWidth: opts.colWidth || this.container.children[0].width, //每列宽度，未设定则默认为第一张宽度
            cols: opts.cols || 4, //默认列数
            maxCols: opts.maxCols || 16, //最大列数
            minCols: opts.minCols || 1, //最小列数
            colGap: opts.colGap || 4 //每列间隔
        }

        this.opts = res
        this._create()
    }

    /**
     * @desc 使插件工作
     * - 隐藏 container 与其子元素 items
     * - 创建列
     * - 将 items 添加到 高度最小的列中
     * - 显示 container 与其子元素 items
     */
    _create() {
        let opts = this.opts,
            gap = opts.colGap / 2

        this.items = this.container.children //container内所有项目


        //set minWidth of container 
        this.container.style.minWidth = opts.cols * (opts.colWidth + opts.colGap) + 'px'

        //create cols
        let cols = []
        for (let i = 0; i < opts.cols; i++) {
            let col = document.createElement('div')
            col.style.width = opts.colWidth + 'px'
            col.style.marginLeft = gap + 'px'
            col.style.marginRight = gap + 'px'
            cols.push(col)
            this.container.append(col)
        }

        //add items into colPriority
        do {
            let colPriority = this.getColpriority(cols)
            cols[colPriority].append(this.items[0])
        } while (this.items[0] != cols[0])

        //init container
        this.container.style.display = 'flex'
    }

    getColpriority(cols) {

        let colPriority = 0,
            minH = Number.MAX_VALUE

        for (let i = 0; i < cols.length; i++) {
            let h = parseInt(window.getComputedStyle(cols[i])['height'])
            if (h < minH) {
                minH = h
                colPriority = i
            }
        }
        return colPriority
    }

    /* _initItem(item) {

        //save style
        let style = getComputedStyle(el);
        item.mr = parseInt(style.marginRight.slice(0, -2));
        item.ml = parseInt(style.marginLeft.slice(0, -2));
        item.mt = parseInt(style.marginTop.slice(0, -2));
        item.mb = parseInt(style.marginBottom.slice(0, -2));

        // set style
        item.style.position = 'absolute';

        // show item
        item.removeAttribute('hidden');
    }

    _update(start = 0, end = this.items.length) {

        for (i = start; i < end; i++) {
            this._placeItem(this.items[i]);
        }
    }

    _placeItem(el) {
        el.style.position = 'absolute'
        el.style.top = 
    } */
}