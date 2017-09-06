export default function(data){
    return {
        title: {
            text: '近一个月各门店数据',
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            top: 25,
            data:['打票量', '扫码量', '扫码率']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name:'打票量',
                type:'line',
                data: []
            },
            {
                name:'扫码量',
                type:'line',
                data: []
            },
            {
                name:'扫码率',
                type:'line',
                data: []
            }
        ]
    }
}
