/*
    actions 1、响应所有页面的事件 2、提交给mutations
*/
import * as types from './types.js'

const actions = {
    /******* DateTimePicker.vue ******/
    //获取日期变化
    dateChangeFunc (context, val) {
        console.log(val);
        context.commit(types.CALL_CHAIN_TRACE_DATE, val);
    },
    /****** CallChainTrace.vue ******/
    //获取global列表数据
    globalList (context, val) {
        context.commit(types.GLOBAL_LIST, val);
    },
    treegrid (context, val) {
        context.commit(types.TREE_GRID, val);
    }
}

export default actions