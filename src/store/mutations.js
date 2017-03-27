/*
    响应actions提交的事件、对state里面的数据进行处理,更新state数据
*/
import {
    CALL_CHAIN_TRACE_DATE,
    GLOBAL_LIST,
    GLOBAL_ID_CLICK,
    TREE_GRID,

    ENTRY_SVC_LIST,
    ENTRY_SVC_DETAIL,
    PATH_ANALYSED_DATE,
    ENTRY_SVC_LIST_CLICK
} from './types.js'

const mutations = {
    
    /****** CallChainTrace.vue ******/
    //获取global列表数据
    [GLOBAL_LIST] (state, val) {
        state.globalListData = val;
    },
    [TREE_GRID] (state, val) {
        state.startTime = val.data.startTime;
        state.endTime = val.data.endTime;

        //对数据进行排序
        var arr = val.data.rows;
        arr.sort(arrSort)
        function arrSort(a, b) {
            var aArr = a.requestId.split('.');
            var bArr = b.requestId.split('.');
            if (aArr.length == bArr.length) {
                for (var j = 0; j < aArr.length; j++) {
                    if (aArr[j] != bArr[j]) {
                        return aArr[j] - bArr[j]
                    }
                }
            }
        }

        state.treeGridData = val;
    },
    //DateTimePicker.vue
    //获取dateTimePicker中日期到变化
    [CALL_CHAIN_TRACE_DATE] (state, val) {
        state.globalFilterObj.createdDate_fan1 = val.split(" - ")[0];
        state.globalFilterObj.createdDate_fan2 = val.split(" - ")[1];
    },
    //GlobalListTable.vue
    //点击global列表
    [GLOBAL_ID_CLICK] (state, val) {
        var _this = val[1];
        _this.inputGlobalId = val[0] + '';
        _this.treeFlag = true;
        _this.treeGridFlag = true;
        _this.search();
    },

    [ENTRY_SVC_LIST] (state, val) {
        state.entrySvcListData = val;
    },
    [ENTRY_SVC_DETAIL] (state, val) {
        state.entrySvcDetail = val;
    },
    //DatePicker.vue
    //获取datePicker中日期到变化
    [PATH_ANALYSED_DATE] (state, val) {
        state.entryFilterObj.callDay_fan1 = val.split(" - ")[0];
        state.entryFilterObj.callDay_fan2 = val.split(" - ")[1];
    },
    [ENTRY_SVC_LIST_CLICK] (state, obj) {
        console.log(obj);
        var _this = obj.target;
        _this.entrySvcDatilDate = obj.callDay;
        _this.entrySvcDatilDateFormat = obj.callDay;
        _this.inputEntrySvc = obj.entrySvc;
        _this.treeFlag = true;
        _this.search();
    }
    
}

export default mutations