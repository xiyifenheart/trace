<template>
    <div id="CallChainTrance">
        <ul class="tab">
            <li @click="treeFlag = false" :class="{'activeTab': treeFlag}">GlobalId列表</li>
            <li @click="treeFlag = true" :class="{'activeTab': !treeFlag}">GlobalId详情</li>
        </ul>
        <div class="msg" v-show="treeFlag">
            <div class="home-main-right-search" @keyup.enter="search">
                <p class="search-title">搜索</p>
                <div class="search-box">
                    <label for="search" style="margin-right: 18px;">全局ID搜索:</label>
                    <input type="text" placeholder="请输入全局id" v-model="inputGlobalId" id="search">
                    <el-button type="primary" @click="search" :class="[searchbtn]">搜索</el-button>
                </div>
            </div>
            <hr>
            
            <!--树形表格部分开始-->
            <div style="height: calc(100% - 120px)">
                <p class="msgid">globalId: {{ globalId }}</p>
                <p class="msginfo">
                    <span>调用链接入口IP:</span>
                    <span class="ip">{{ entryIp }}</span>&nbsp;&nbsp;&nbsp;
                    <span>开始时间:</span>
                    <span>{{ startTime }}</span>&nbsp;&nbsp;&nbsp;
                    <span>调用日志时间总长:</span>
                    <span>{{ elapsed }}ms</span>&nbsp;&nbsp;&nbsp;
                </p>
                <TreeGrid v-show="treeGridFlag"></TreeGrid>
            </div>
            <!--树形表格部分结束-->

        </div>
       
        <div class="msg" v-show="!treeFlag">

            <!--globalId列表开始-->
            <div class="globalList">
                <p class="globalIdListTitle">
                    <span>GlobalId列表</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <el-button type="text" size="large" @click="globalListFlag = true">点击筛选</el-button>
                </p>
                <div style="max-height:calc(100% - 80px);overflow: auto;">
                    <GlobalListTable></GlobalListTable>
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
            <div class="global-list-search-box" @click.self="globalListFlag = false" v-show="globalListFlag">
                <div class="global-list-search-box-panel">
                    <p>请输入筛选条件</p>
                    <table>
                        <tr>
                            <!--inRequestId-->
                            <td>前台请求流水号:</td>
                            <td><input type="text" id="inRequestId" v-model="globalFilterObj.inRequestId"></td>
                        </tr>
                        <tr>
                            <!--clientIp-->
                            <td>客户端IP:</td>
                            <td><input type="text" id="clientIp" v-model="globalFilterObj.clientIp"></td>
                        </tr>
                        <tr>
                            <!--clientMac-->
                            <td>客户端MAC地址:</td>
                            <td><input type="text" id="clientMac" v-model="globalFilterObj.clientMac"></td>
                        </tr>
                        <tr>
                            <!--fromApp-->
                            <td>调用者应用名:</td>
                            <td><input type="text" id="fromApp" v-model="globalFilterObj.fromApp"></td>
                        </tr>
                        <tr>
                            <!--toApp-->
                            <td>被调用者应用名:</td>
                            <td><input type="text" id="toApp" v-model="globalFilterObj.toApp"></td>
                        </tr>
                        <tr>
                            <!--dataLike-->
                            <td>请求或响应数据:</td>
                            <td><input type="text" id="dataLike" v-model="globalFilterObj.dataLike"></td>
                        </tr>
                        <tr>
                            <!--flag-->
                            <td>状态:</td>
                            <td>
                                <select v-model="globalFilterObj.flag">
                                    <option value="">请选择flag</option>
                                    <option value="-1">-1</option>
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <DataTimePicker></DataTimePicker>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="text-align: center;height: 70px;">
                                <el-button @click="globalListSearch" type="info">确定</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
                                <el-button @click="globalListFlag = false">取消</el-button>
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
    import {mapActions, mapGetters, mapState} from 'vuex'
    import DataTimePicker from './_components/DataTimePicker.vue'
    import TreeGrid from './_components/TreeGrid.vue'
    import GlobalListTable from './_components/GlobalListTable.vue'
    import Bus from '../../config/bus.js'
    export default{
        name: 'CallChainTrance',
        data () {
            return{
                inputGlobalId: '',      //input中输入到globalId
                globalId: '',           //treeGrid表格上面显示的globalId
                entryIp: '',            //treeGrid表格上面显示的entryIp
                elapsed: '',            //treeGrid表格上面显示的总耗时
                startTime: '',          //treeGrid表格上面显示的开始时间
                searchbtn: 'searchbtn', //定义搜索按钮的class
                treeFlag: false,        //是否显示搜索id详情页面
                treeGridFlag: false,    //是否显示treegrid
                globalListFlag: false,  //是否显示global筛选框
                totalCount: 1,          //分页总数
                pageRows: 20
            }
        },
        mounted: function () {
            var _this = this;

            this.globalListFunc();

            Bus.$on('globalIdClick', function (clickId) {
                console.log(typeof clickId);
                _this.inputGlobalId = clickId + '';
                _this.treeFlag = true;
                _this.treeGridFlag = true;
                _this.search();
            });
        },
        computed: {
            ...mapGetters([
                'globalFilterObj'
            ])
        },
        methods: {
            ...mapActions([
                'globalList',
                'treegrid',
                'search'
            ]),
            //点击搜索按钮
            search () {
                var _this = this;

                if (_this.inputGlobalId.trim() == "") { //判断是否为空
                    alert("请输入globalId");
                    return;
                };

                _this.treeGridFlag = true;  //显示树形表格

                /*
                    传给后台的数据
                    jsonParam 需要转换成json传给后台
                */
                var params = {
                    apiKey: 'ec-trace-getApiLogByGlobalId',
                    productType: 'ec-trace-client',
                    jsonParam: JSON.stringify({
                        globalId: _this.inputGlobalId.trim()
                    })
                };

                /*
                    封装的ajax，在/src/config/api.js文件中
                    vue.$api 有三种方法: get post jsonp 
                                四个参数: (url, params, success, failure)
                */
                _this.$api.jsonp('trace/api.do', params, function (res) {
                    console.log(res);
                    _this.globalId = res.data.globalId;
                    _this.entryIp = res.data.entryIp;
                    _this.elapsed = res.data.endTime - res.data.startTime;
                    _this.startTime = _this.getLocalTime(res.data.startTime);

                    //触发子组件treegrid中的getMsg方法
                    // _this.$children[1].getMsg(res);
                    _this.treegrid(res);
                    
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
                    apiKey: 'ec-trace-findGlobal',
                    productType: 'ec-trace-client',
                    jsonParam: JSON.stringify(this.globalFilterObj)
                };
                console.log(this.globalFilterObj);
                _this.$api.jsonp('trace/api.do', params, function (res) {
                    _this.totalCount = res.data.total;
                    _this.globalList(res.data.rows);
                    _this.globalListFlag = false;
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
                this.globalFilterObj.pageOffset = (val - 1) * this.globalFilterObj.pageRows;
                this.globalListFunc();
            }
        },
        components: {
            DataTimePicker,
            TreeGrid,
            GlobalListTable
        }
    }
</script>
<style src="../../assets/css/callChainTrace.css"></style>