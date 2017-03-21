/*
    获取state的数据，也可以对数据处理，然后暴露出来给view
*/
export default{
    globalFilterObj (state) {
        return state.globalFilterObj;
    },
    globalListData (state) {
        return state.globalListData;
    },
    startTime (state) {
        return state.startTime;
    },
    endTime (state) {
        return state.endTime;
    },
    treeGridData (state) {
        return state.treeGridData;
    }
}