const state = {
    //DateTimePicker.vue
    globalFilterObj: {
        inRequestId: '',
        clientIp: '',
        clientMac: '',
        createdDate_fan1: '',
        createdDate_fan2: '',
        flag: '',
        fromApp: '',
        toApp: '',
        dataLike: '',
        pageOffset: 0,
        pageRows: 20
    },
    globalListData: [
        {
            "clientMac": "",
            "svcMethod": "",
            "globalId": "",
            "svcName": "",
            "endTime": "",
            "elapsed": "",
            "startTime": "",
            "flag": "",
            "clientIp": "",
            "inRequestId": ""
        }
    ],
    
    //TreeGrid.vue
    startTime: '',
    endTime: '',
    treeGridData: []

}

export default state