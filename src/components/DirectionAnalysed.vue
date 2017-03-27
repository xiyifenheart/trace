<template>
    <div id="patyAnalysed">
        去向分析
        <div id="c1"></div>
        <div id="c2"></div>
    </div>
</template>
<script>
    import G2 from 'g2'
    export default{
        data () {
            return{
                
            }
        },
        mounted: function () {
            var data = [
                {genre: 'Sports', sold: 275},
                {genre: 'Strategy', sold: 115},
                {genre: 'Action', sold: 120},
                {genre: 'Shooter', sold: 350},
                {genre: 'Other', sold: 150},
            ]; // G2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
            // Step 1: 创建 Chart 对象
            var chart = new G2.Chart({
                id: 'c1', // 指定图表容器 ID
                width : 600, // 指定图表宽度
                height : 300 // 指定图表高度
            });
            chart.axis('genre', {
                title: {
                    fontSize: '22', // 文本大小
                    textAlign: 'center', // 文本对齐方式
                    fill: '#999', // 文本颜色
                    // ...
                }
            });
            // Step 2: 载入数据源
            chart.source(data, {
                genre: {
                    alias: '游戏种类' // 列定义，定义该属性显示的别名
                },
                sold: {
                    alias: '销售量'
                }
            });
            // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
            chart.interval().position('genre*sold').color('genre')
            // Step 4: 渲染图表
            chart.render();
/*************************************************************************************/
            var data2 = [
                {name: 'Microsoft Internet Explorer', value: 56.33 },
                {name: 'Chrome', value: 24.03},
                {name: 'Firefox', value: 10.38},
                {name: 'Safari',  value: 4.77},
                {name: 'Opera', value: 0.91},
                {name: 'Proprietary or Undetectable', value: 0.2}
            ];
            var Stat = G2.Stat;
            var chart2 = new G2.Chart({
                id: 'c2',
                forceFit: true,
                height: 450
            });
            chart2.source(data2);
            // 重要：绘制饼图时，必须声明 theta 坐标系
            chart2.coord('theta', {
                radius: 0.8, // 设置饼图的大小
                inner: 0.5
            });
            chart2.legend('name', {
                position: 'bottom',
                itemWrap: true,
                formatter: function(val) {
                    for(var i = 0, len = data2.length; i < len; i++) {
                        var obj = data2[i];
                        if (obj.name === val) {
                        return val + ': ' + obj.value + '%'; 
                        }
                    }
                }
            });
            chart2.tooltip({
                title: null,
                map: {
                value: 'value'
                }
            });
            chart2.intervalStack()
                .position(Stat.summary.percent('value'))
                .color('name')
                .label('name*..percent',function(name, percent){
                percent = (percent * 100).toFixed(2) + '%';
                return name + ' ' + percent;
            });
            chart2.render();
            // 设置默认选中
            var geom = chart2.getGeoms()[0]; // 获取所有的图形
            var items = geom.getData(); // 获取图形对应的数据
            geom.setSelected(items[1]); // 设置选中
        }
    }
</script>