<template>
	<el-table
		:data="entrySvcListData"
		border
		style="width: 100%"
		max-height="50%"
		@cell-click="cellClick">
		<el-table-column
			fixed
			prop="callDay"
			label="调用日期"
			width="120"
			align="center">
		</el-table-column>
		<el-table-column
			fixed
			prop="entrySvc"
			label="入口服务"
			width="220"
			align="center">
		</el-table-column>
		<el-table-column
			prop="entryMethod"
			label="入口方法"
			width="150"
			align="center">
		</el-table-column>
		<el-table-column
			prop="appName"
			label="应用名称"
			width="180"
			align="center">
		</el-table-column>
		<el-table-column
			prop="qpsAvg"
			label="平均QPS"
			width="180"
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
			width="130"
			align="center"
			:formatter="formatter">
		</el-table-column>
	</el-table>
</template>

<script>
	import {mapActions, mapGetters} from 'vuex'
	export default {
		computed: {
			...mapGetters([
				'entrySvcListData'
			])
		},
		data() {
			return {
				
			}
		},
		methods: {
			...mapActions([
				'entrySvcListClick'
			]),
			cellClick (row, column, cell, event) {
				var obj = {
					entrySvc: row.entrySvc,
					callDay: row.callDay.split(' ')[0],
					target: this.$parent
				};
				this.entrySvcListClick(obj);
			},
			formatter (row, column) {
				return row.elapsedAvg + 'ms';
			}
		}
	}
</script>