/*
    actions 1、响应所有页面的事件 2、提交给mutations
*/
import * as types from './types.js'

const actions = {
    /****** CallChainTrace.vue ******/
    //获取global列表数据
    globalList (context, val) {
        context.commit(types.GLOBAL_LIST, val);
    },
    treegrid (context, val) {
        context.commit(types.TREE_GRID, val);
    },
    //DateTimePicker.vue
    //获取日期变化
    dateChangeFunc (context, val) {
        console.log(val);
        context.commit(types.CALL_CHAIN_TRACE_DATE, val);
    },
    //GlobalListTable.vue
    //点击global列表
    globalIdClick (context, val) {
        context.commit(types.GLOBAL_ID_CLICK, val);
    },
    
    /****** PathAnalysed.vue ******/
    //获取entry列表
    entrySvcList (context, val) {
         context.commit(types.ENTRY_SVC_LIST, val);
    },
    //PathDatilTable.vue
    //获取entry详情列表
    entrySvcDetail (context, val) {
        context.commit(types.ENTRY_SVC_DETAIL, val);
    },
    //DatePicker.vue
    //获取日期变化
    dateChangeFunc2 (context, val) {
        console.log(val);
        context.commit(types.PATH_ANALYSED_DATE, val);
    },
    //PathTable.vue
    //点击列表跳转
    entrySvcListClick (context, obj) {
        context.commit(types.ENTRY_SVC_LIST_CLICK, obj);
    }
}

export default actions