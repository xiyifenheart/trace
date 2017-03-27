<template>
  <el-table
    :data="entrySvcDetail"
    border
    style="width: 100%"
    max-height="50%">
    <el-table-column
      fixed
      prop="callDay"
      label="调用日期"
      width="120"
      align="center">
    </el-table-column>
    <el-table-column
      fixed
      prop="layer"
      label="层次"
      width="80"
      align="center">
    </el-table-column>
    <el-table-column
      prop="svcName"
      label="服务名称及方法"
      width="350"
      align="center"
      :formatter="svcFormatter">
    </el-table-column>
    <el-table-column
      prop="appName"
      label="应用名称"
      width="100"
      align="center">
    </el-table-column>
    <el-table-column
      prop="qpsAvg"
      label="平均QPS"
      width="150"
      align="center">
    </el-table-column>
    <el-table-column
      prop="qpsMax"
      label="QPS峰值"
      width="120"
      align="center">
    </el-table-column>
    <el-table-column
      prop="callCount"
      label="调用次数"
      width="100"
      align="center">
    </el-table-column>
    <el-table-column
      prop="elapsedAvg"
      label="平均耗时"
      width="120"
      align="center"
      :formatter="elapsedAvgFormatter">
    </el-table-column>
    <el-table-column
      prop="dependRate"
      label="依赖度"
      width="120"
      align="center"
      :formatter="dependRateFormatter">
    </el-table-column>
    <el-table-column
      prop="elapsedRate"
      label="耗时比例"
      width="120"
      align="center"
      :formatter="elapsedRateFormatter">
    </el-table-column>
    <el-table-column
      prop="flag"
      label="标记"
      width="80"
      align="center">
    </el-table-column>
  </el-table>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  export default {
    methods: {
    },
    computed: {
      ...mapGetters([
        'entrySvcDetail'
      ])
    },
    data() {
      return {
        
      }
    },
    methods: {
        svcFormatter(row) {
          return row.svcName + '@' + row.svcMethod;
        },
        elapsedAvgFormatter(row) {
          return row.elapsedAvg + 'ms';
        },
        dependRateFormatter(row) {
          return row.dependRate + '%';
        },
        elapsedRateFormatter(row) {
          return row.elapsedRate + '%';
        }
    }
  }
</script>