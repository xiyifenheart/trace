<template>
    <el-date-picker
        v-model="value4"
        type="datetimerange"
        :picker-options="pickerOptions2"
        placeholder="选择时间范围"
        align="right"
        @change="dateChangeFunc">
    </el-date-picker>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex'
    export default{
        name: 'dataTimePicker',
        data () {
            return{
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value4: ''
            }
        },
        methods: {
            ...mapActions([
                'dateChangeFunc'
            ]),
            // changeFunc(val) {
            //     this.$emit('dateChange', val.split(" - "));
            // }
        }
    }
</script>