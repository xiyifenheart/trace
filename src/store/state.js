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
    treeGridData: [],
    //DatePicker.vue
    entryFilterObj: {
        entrySvcLike: '',
        callDay_fan1: '',
        callDay_fan2: '',
        pageOffset: 0,
        pageRows: 20
    },
    entrySvcListData: [
        {
            "qpsMax": "",
            "entrySvc": "",
            "svcMethod": "",
            "layer": "",
            "svcName": "",
            "id": "",
            "appName": "",
            "parentId": "",
            "elapsedAvg": "",
            "flag": "",
            "elapsedRate": "",
            "dependRate": "",
            "qpsAvg": "",
            "entryMethod": "",
            "callDay": "",
            "callCount": "",
            "invokeOrder": ""
        }
    ],
    entrySvcDetail: [
        {
            "qpsMax": "",
            "entrySvc": "",
            "svcMethod": "",
            "layer": "",
            "svcName": "",
            "id": "",
            "appName": "",
            "parentId": "",
            "elapsedAvg": "",
            "flag": "",
            "elapsedRate": "",
            "dependRate": "",
            "qpsAvg": "",
            "entryMethod": "",
            "callDay": "",
            "callCount": "",
            "invokeOrder": ""
        }
    ]

}

export default state