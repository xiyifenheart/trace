<template>
    <el-date-picker
      v-model="value7"
      type="daterange"
      align="right"
      placeholder="选择日期范围"
      :picker-options="pickerOptions2"
      @change="changeFunc">
    </el-date-picker>
</template>

<script>
    import Bus from '../../../config/bus.js'
    export default {
        data() {
            return {
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
            value7: ''
            };
        },
        methods: {
            changeFunc(val) {
                Bus.$emit('dateChange', val.split(" - "));
            }
        }
    };
</script>