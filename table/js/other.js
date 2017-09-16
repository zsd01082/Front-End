var TableTool = (function() {
    function init(opts) {
        var instance = new table(opts)
        return instance;
    }

    function table(opts) {
        this.setOpts(opts);
        this.renderTable();
        this.setTable();
        this.bindEvent();

    }
    table.prototype = {
        defaultOpts: {
            append: $('body'),
            data: {
                thead: [],
                sortSwitch: [],
                tbody: {}
            },
            isSort: true,
            isFrozen: true,
            headColor: 'defaultColor'
        },
        //设置参数
        setOpts: function(opts) {
            if (typeof opts == 'object') {
                this.opts = $.extend({}, this.defaultOpts, opts);
            }
        },
        renderTable: function() {
            var tableDataThead = this.opts.data.thead; //数组
            tableDataTbody = this.opts.data.tbody; //对象
            var theadStr = '',
                tbodyStr = '',
                tpl = '';
            //拼接表头数组
            for (var i = 0; i < tableDataThead.length; i++) {
                var temHeadStr = '', //临时字符串清空
                    temHeadStr = '<th>' + tableDataThead[i] + '<span></span></th>';
                theadStr += temHeadStr;
            }
            //拼接表身数组
            for (var Arr in tableDataTbody) {
                var temBodyLineStr = '';
                var temBodyCloStr = '';
                for (var i = 0; i < tableDataTbody[Arr].length; i++) {
                    var puzzleStr = '';
                    puzzleStr = '<td>' + tableDataTbody[Arr][i] + '</td>';
                    temBodyCloStr += puzzleStr;
                }
                temBodyLineStr = '<tr>' + temBodyCloStr + '</tr>';
                tbodyStr += temBodyLineStr
            }
            tpl = '<table border=1 class="table-tool">' +
                '<thead class="real-head">' +
                '<tr>' +
                theadStr +
                '</tr>' +
                '</thead>' +
                '<tbody>' +
                tbodyStr +
                '</tbody>' +
                '</table>';
            this.$table = $(tpl);
            $(this.opts.append).html('');
            $(this.opts.append).append(this.$table)
        },
        setTable: function() {
            if (!this.opts.isSort) {
                this.$table.find('span').hide();
            } else {
                for (var i = 0; i < this.opts.data.sortSwitch.length; i++) {
                    if (this.opts.data.sortSwitch[i] == 0) {
                        this.$table.find('span').eq(i).hide();
                    }
                }
            }
            if (this.opts.isFrozen) {
                this.frozenTable();

            }
            if (this.opts.headColor != 'defaultColor') {
                this.$table.find('th').css({
                    background: this.opts.headColor
                });
            }
        },
        bindEvent: function() {
            var self = this,
                spanList = this.$table.find('.real-head span'),
                sortFlag = {};
            this.sortFlag = sortFlag;
            for (var i = 0; i < this.opts.data.thead.length; i++) {
                this.sortFlag[i] = true;
            }
            spanList.on('click', function(e) {
                var target = e.target,
                    indexSpan;
                if (self.opts.isFrozen) {
                    indexSpan = spanList.index(target) - self.opts.data.thead.length;
                } else {
                    indexSpan = spanList.index(target);
                }
                console.log(spanList);
                console.log(indexSpan);
                if (self.sortFlag[indexSpan] == true) {
                    self.sortUpTable(indexSpan);
                    self.renderTable();
                    self.setTable();
                    self.bindEvent();
                    self.sortFlag[indexSpan] = false;
                } else {
                    self.sortDownTable(indexSpan);
                    self.renderTable();
                    self.setTable();
                    self.bindEvent();
                    self.sortFlag[indexSpan] = true;
                }

            })
        },
        frozenTable: function() {
            var $table = this.$table,
                $tableHead = $table.find('thead'),
                tableH = $table.height(),
                headW = $tableHead.width(),
                headStyle = $tableHead.attr('style'),
                headOffsetTop = $tableHead.offset().top,
                headOffLeft = $tableHead.offset().left;
            var $headClone = $tableHead.clone()
                .css('opacity', 0)
                .insertBefore($tableHead)
                .hide();
            var self = this;
            this.$headClone = $headClone;

            if ($(window).scrollTop() >= (headOffsetTop + tableH)) {
                if (!!$tableHead.attr('data-fixed')) {
                    $tableHead.removeAttr('data-fixed')
                        .removeAttr('style')
                        .attr('style', headStyle);
                    $headClone.hide();
                }
            } else if ($(window).scrollTop() > headOffsetTop) {
                if (!!!$tableHead.attr('data-fixed')) {
                    $tableHead.attr('data-fixed', true)
                        .css({
                            position: 'fixed',
                            top: 0,
                            left: headOffLeft,
                            'z-index': 9999,
                            width: headW,
                            margin: 0
                        });
                    $table.css({
                        'z-index': 8888,
                    });
                    $headClone.show();
                }
            } else {
                if (!!$tableHead.attr('data-fixed')) {
                    $tableHead.removeAttr('data-fixed')
                        .removeAttr('style')
                        .attr('style', headStyle);
                    $headClone.hide();
                }
            }



            $(window).on('scroll', function() {
                var scrollTop = $(this).scrollTop();
                if (scrollTop >= (headOffsetTop + tableH)) {
                    if (!!$tableHead.attr('data-fixed')) {
                        $tableHead.removeAttr('data-fixed')
                            .removeAttr('style')
                            .attr('style', headStyle);
                        $headClone.hide();
                    }
                } else if (scrollTop > headOffsetTop) {
                    if (!!!$tableHead.attr('data-fixed')) {
                        $tableHead.attr('data-fixed', true)
                            .css({
                                position: 'fixed',
                                top: 0,
                                left: headOffLeft,
                                'z-index': 9999,
                                width: headW,
                                margin: 0
                            });
                        $table.css({
                            'z-index': 8888,
                        });
                        $headClone.show();
                    }
                } else {
                    if (!!$tableHead.attr('data-fixed')) {
                        $tableHead.removeAttr('data-fixed')
                            .removeAttr('style')
                            .attr('style', headStyle);
                        $headClone.hide();
                    }
                }
            })
        },
        sortDownTable: function(index) {
            var sortData = this.opts.data.tbody,
                newArr = [],
                newObj = {};
            for (key in sortData) {
                newArr.push(sortData[key]);
            }
            newArr.sort(function(a, b) {
                return a[index] - b[index];
            })
            for (var i = 0; i < newArr.length; i++) {
                newObj[i + 1] = newArr[i];
            }
            this.opts.data.tbody = newObj
        },
        sortUpTable: function(index) {
            var sortData = this.opts.data.tbody,
                newArr = [],
                newObj = {};
            for (key in sortData) {
                newArr.push(sortData[key]);
            }
            newArr.sort(function(a, b) {
                return b[index] - a[index];
            })
            for (var i = 0; i < newArr.length; i++) {
                newObj[i + 1] = newArr[i];
            }
            this.opts.data.tbody = newObj;
        }
    };


    return {
        init: init
    };

})()