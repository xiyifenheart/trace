<template>
  <el-table
    :data="globalListData"
    border
    style="width: 100%"
    max-height="50%"
    @cell-click="cellClick">
    <el-table-column
      fixed
      prop="globalId"
      label="全局流水号"
      width="120"
      align="center">
    </el-table-column>
    <el-table-column
      fixed
      prop="svcName"
      label="服务名"
      width="220"
      align="center">
    </el-table-column>
    <el-table-column
      prop="svcMethod"
      label="服务方法"
      width="150"
      align="center">
    </el-table-column>
    <el-table-column
      prop="startTime"
      label="开始时间"
      width="180"
      align="center">
    </el-table-column>
    <el-table-column
      prop="endTime"
      label="结束时间"
      width="180"
      align="center">
    </el-table-column>
    <el-table-column
      prop="elapsed"
      label="耗时"
      width="120"
      align="center">
    </el-table-column>
    <el-table-column
      prop="flag"
      label="状态"
      width="80"
      align="center">
    </el-table-column>
    <el-table-column
      prop="inRequestId"
      label="前台请求流水号"
      width="120"
      align="center">
    </el-table-column>
    <el-table-column
      prop="clientMac"
      label="客户端MAC地址"
      width="120"
      align="center">
    </el-table-column>
    <el-table-column
      prop="clientIp"
      label="客户端IP"
      width="120"
      align="center">
    </el-table-column>
  </el-table>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import Bus from '../../../config/bus.js'
  export default {
    methods: {
      ...mapActions([
        'globalIdClick'
      ]),
      cellClick (row, column, cell, event) {
        // this.globalIdClick(row.globalId);
				Bus.$emit('globalIdClick', row.globalId);
			}
    },
    computed: {
      ...mapGetters([
        'globalListData'
      ])
    },
    data() {
      return {
        
      }
    }
  }
</script>