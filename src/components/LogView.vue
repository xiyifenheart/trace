<template>
    <div id="patyAnalysed">
        过程日志查看
        <div id="gg"></div>
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
                {genre: 'Sports', sold: 275, color: '#ff00f0'},
                {genre: 'Strategy', sold: 115, color: '#ff000f'},
                {genre: 'Action', sold: 120, color: '#ff0000'},
                {genre: 'Shooter', sold: 350, color: '#ff000f'},
                {genre: 'Other', sold: 150, color: '#ff0000'},
            ]; // G2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
            // Step 1: 创建 Chart 对象
            var chart = new G2.Chart({
                id: 'gg', // 指定图表容器 ID
                width : 600, // 指定图表宽度
                height : 300, // 指定图表高度
                plotCfg: {
                    border: {
                        stroke: 'red', // 边框颜色
                        strokeOpacity: 0.4, // 边框的透明度设置，0 至 1 范围的数据
                        lineWidth: 1, // 边框粗细
                        fill: '#ff8800', // 设置整个容器的背景色
                        fillOpacity: 0.2, // 背景色的透明度设置，0 至 1 范围的数据
                        radius: 5 // 边框的圆角
                    }, // 边框设置 图形属性
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
            }, ['color']);
            // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
            chart.interval().position('genre*sold').color('genre')
            // Step 4: 渲染图表
            chart.render();
        }
    }
</script>