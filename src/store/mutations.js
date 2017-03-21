/*
    响应actions提交的事件、对state里面的数据进行处理,更新state数据
*/
import {
    CALL_CHAIN_TRACE_DATE,
    GLOBAL_LIST,
    GLOBAL_ID_CLICK,
    TREE_GRID
} from './types.js'

const mutations = {
    /******* DateTimePicker.vue ******/
    //获取dateTimePicker中日期到变化
    [CALL_CHAIN_TRACE_DATE] (state, val) {
        state.globalFilterObj.createdDate_fan1 = val.split(" - ")[0];
        state.globalFilterObj.createdDate_fan2 = val.split(" - ")[1];
    },
    /****** CallChainTrace.vue ******/
    //获取global列表数据
    [GLOBAL_LIST] (state, val) {
        state.globalListData = val;
    },
    [GLOBAL_ID_CLICK] (state, val) {
        
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
    }
}

export default mutations