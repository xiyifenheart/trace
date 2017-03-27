<template>
    <div id="PathAnalysed">
        <ul class="tab">
            <li @click="treeFlag = false" :class="{'activeTab': treeFlag}">日报服务列表</li>
            <li @click="treeFlag = true" :class="{'activeTab': !treeFlag}">日报路径分析</li>
        </ul>
        <div class="msg" v-show="treeFlag">
            <div class="home-main-right-search" @keyup.enter="search">
                <p class="search-title">搜索</p>
                <div class="search-box">
                    <label for="search" style="margin-right: 18px;">entrySvc搜索:</label>
                    <input type="text" placeholder="请输入entrySvc" v-model="inputEntrySvc" id="search">
                    <el-date-picker
                        v-model="entrySvcDatilDate"
                        type="date"
                        placeholder="选择日期"
                        @change="entrySvcDatilDateChangeFunc">
                    </el-date-picker>
                    <el-button type="primary" @click="search" :class="[searchbtn]">搜索</el-button>
                </div>
            </div>
            <hr>
            <!--树形表格部分开始-->
            <div style="height: calc(100% - 120px); overflow: auto;">
                <PathDatilTable></PathDatilTable>
            </div>
            <!--树形表格部分结束-->

        </div>
       
        <div class="msg" v-show="!treeFlag">

            <!--globalId列表开始-->
            <div class="globalList">
                <p class="globalIdListTitle">
                    <span>日报服务列表</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <el-button type="text" size="large" @click="modeBox = true">点击筛选</el-button>
                </p>
                <div style="max-height:calc(100% - 80px);overflow: auto;">
                    <PathTable></PathTable>
                </div>
                <div style="text-align: center;height: 40px;padding: 8px 0 0 0;">
                    <el-pagination
                        layout="prev, pager, next"
                        :page-size='pageRows'
                        :total="totalCount"
                        @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
            </div>
            <!--globalId列表结束-->

            <!--globalId列表筛选模态框开始-->
            <div class="global-list-search-box" @click.self="modeBox = false" v-show="modeBox">
                <div class="global-list-search-box-panel">
                    <p>请输入筛选条件</p>
                    <table>
                        <tr>
                            <!--entrySvcLike-->
                            <td>入口服务名称:</td>
                            <td><input type="text" id="entrySvcLike" v-model="entryFilterObj.entrySvcLike"></td>
                        </tr>
                        <tr>
                            <td>选择日期:</td>
                            <td>
                                <DataPicker></DataPicker>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="text-align: center;height: 70px;">
                                <el-button @click="globalListSearch" type="info">确定</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
                                <el-button @click="modeBox = false">取消</el-button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <!--globalId列表筛选模态框结束-->
            
        </div>
    </div>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex'
    import DataPicker from './_components/DataPicker.vue'
    import PathTable from './_components/PathTable.vue'
    import PathDatilTable from './_components/PathDatilTable.vue'
    export default{
        name: 'PathAnalysed',
        data () {
            return{
                inputEntrySvc: '',          //input中输入到entrySvc
                entrySvcDatilDate: '',      //搜索的日期
                entrySvcDatilDateFormat: '',//后台用的搜索日期
                searchbtn: 'searchbtn',     //定义搜索按钮的class
                treeFlag: false,            //是否显示搜索日志路径详情页面
                modeBox: false,      //是否显示筛选框
                totalCount: 1,          //分页总数
                pageRows: 20
            }
        },
        computed: {
            ...mapGetters([
                'entryFilterObj'
            ])
        },
        mounted: function () {
            this.globalListFunc();
        },
        methods: {
            ...mapActions([
                'entrySvcList',
                'entrySvcDetail'
            ]),
            entrySvcDatilDateChangeFunc(val) {
                this.entrySvcDatilDateFormat = val;
            },
            //点击搜索按钮
            search () {
                var _this = this;

                if (_this.inputEntrySvc.trim() == "") { //判断是否为空
                    alert("请输入EntrySvc");
                    return;
                };

                /*
                    传给后台的数据
                    jsonParam 需要转换成json传给后台
                */
                var params = {
                    apiKey: 'ec-trace-routeDay-findByEntry',
                    productType: 'ec-trace-client',
                    jsonParam: JSON.stringify({
                        entrySvc: _this.inputEntrySvc.trim(),
                        callDay: _this.entrySvcDatilDateFormat
                    })
                };

                /*
                    封装的ajax，在/src/config/api.js文件中
                    vue.$api 有三种方法: get post jsonp 
                                四个参数: (url, params, success, failure)
                */
                _this.$api.jsonp('trace/api.do', params, function (res) {
                    console.log(res);
                    _this.entrySvcDetail(res.data.rows);
                },function () {

                });

            },
            //将时间戳转换成年月形式
            getLocalTime(timeStamp) {
                return new Date(parseInt(timeStamp)).toLocaleString();
            },
            //获取globalId列表
            globalListFunc () {
                var _this = this;

                /*
                    传给后台的数据
                    jsonParam 需要转换成json传给后台
                */
                var params = {
                    apiKey: 'ec-trace-routeDay-findEntry',
                    productType: 'ec-trace-client',
                    jsonParam: JSON.stringify(this.entryFilterObj)
                };
                console.log(this.entryFilterObj);
                _this.$api.jsonp('trace/api.do', params, function (res) {
                    _this.totalCount = res.data.total;
                    _this.entrySvcList(res.data.rows);
                    _this.modeBox = false;
                    console.log(res);
                },function () {

                });

            },
            //点击筛选模态框的确定按钮
            globalListSearch() {
                this.globalListFunc();
            },
            //分页
            handleCurrentChange(val) {
                this.entryFilterObj.pageOffset = (val - 1) * this.entryFilterObj.pageRows;
                this.globalListFunc();
            }
        },
        components: {
            DataPicker,
            PathDatilTable,
            PathTable
        }
    }
</script>
<style src="../../assets/css/pathAnalysed.css"></style>