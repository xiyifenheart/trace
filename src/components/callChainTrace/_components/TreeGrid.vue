<template>
    <div style="max-width: 100%;overflow: auto;max-height: calc(100% - 77px)">
        <div id="treegrid">
            <table id="tt"></table>
        </div>
    </div>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex'
    import '../../../../static/js/jquery.easyui.min.js'
    export default {
        data() {
            return {
            }
        },
        mounted: function () {
            var _this = this;

            $('#tt').treegrid({
                title: '调用链跟踪',//是否加标题，默认是没有的
                iconCls: 'icon-ok',
                rownumbers: true,		//是否要序列号
                animate: true,			//是否启用动画
                collapsible: true,
                fitColumns: true,
                showFooter: true,
                idField: 'requestId',	//名字随便修改，只要后台数据中_parentId 能跟这个对应上就可以
                treeField: 'toApp',		//确定哪那一列是树形菜单
                method: 'get',
                rowStyler: function (row) {
                    if (row.datasize == 0) {
                        return 'color:red;font-weight:bold;';
                    }
                },
                columns: [[
                    { field: 'toApp', title: '被调用者应用名', width: 180, align: 'left' },
                    { field: 'typeCation', title: '类型', width: 60, align: 'center' },
                    { field: 'flagCation', title: '状态', width: 40, align: 'center' },
                    { field: 'datasize', title: '数据大小', width: 60, align: 'center' },
                    {
                        field: 'svcName', title: '服务名', width: 200, align: 'center',
                        formatter: function (value, row) {
                            if (value) {
                                var s = '<p class="scrollbar" title="' + value + '" style="min-height: 40px;padding: 0 5px;">' + value + '</p>';
                                return s;
                            } else {
                                return '';
                            };
                        }
                    },
                    { field: 'svcMethod', title: '服务方法', width: 200, align: 'center' },
                    {
                        field: 'elapsed', title: '耗时', width: 500, align: 'center',
                        formatter: function (value, row) {
                            var allTime = (_this.endTime - _this.startTime) / 100;
                            var timeWidth = value / allTime > 1 ? (value / allTime + '%') : '1px';
                            if (value && value > 0) {
                                var s = '<div style="width:97%;border:1px solid #ccc">' +
                                    '<div class="line" style="margin-left:' + (row.startTime - _this.startTime) / allTime + '%;width:' + timeWidth + ';background: -webkit-linear-gradient(top, #4ca0d2, #fff);color:#000">' + value + 'ms' + '</div>'
                                '</div>';
                                return s;
                            } else {
                                return '';
                            };
                        }
                    }
                ]]
            });

        },
        computed: {
            ...mapGetters([
                'startTime',
                'endTime',
                'treeGridData'
            ])
        },
        watch: {
            treeGridData: function (newVal, oldVal) {
                console.log(newVal);
                //将数据给treegrid
                $('#tt').treegrid({
                    data: newVal.data
                });
            }
        }
    }

</script>
<style src="../../../../static/css/icon.css"></style>
<style src="../../../../static/css/easyui.css"></style>
<style>
    .scrollbar {
        word-wrap: break-word;
        white-space: normal;
    }
</style>