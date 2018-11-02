$(function () {
    $('#chart1').highcharts({
        chart: {
            type: 'spline'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            allowDecimals: false,
            labels: {
                formatter: function () {
                    return this.value; // clean, unformatted number for year
                }
            }
        },
        yAxis: {
            title: {
                text: '温度（℃）'
            },
            // labels: {
            //     formatter: function () {
            //         return this.value / 1000 + 'k';
            //     }
            // }
        },
        tooltip: {
            headerFormat:'',
            pointFormat: '{series.name}：<b>{point.y:,.0f}</b> ℃<br/> 时间：<b>{point.x}</b>时'
        },
        plotOptions: {
            spline: {
                lineWidth: 3,
                states: {
                    hover: {
                        lineWidth: 3
                    }
                },
                pointStart: 1,
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        colors:['#71d4a7'],
        series: [{
            name: '温度',
            data: [20, 23, 24, 25, 20, 12, 30]
        }]
    });
    $('#chart2').highcharts({
        chart: {
            type: 'spline'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            allowDecimals: false,
            labels: {
                formatter: function () {
                    return this.value; // clean, unformatted number for year
                }
            }
        },
        yAxis: {
            title: {
                text: '压力'
            },
            // labels: {
            //     formatter: function () {
            //         return this.value / 1000 + 'k';
            //     }
            // }
        },
        tooltip: {
            headerFormat:'',
            pointFormat: '{series.name}：<b>{point.y:,.0f}</b> <br/> 时间：<b>{point.x}</b>时'
        },
        plotOptions: {
            spline: {
                lineWidth: 3,
                states: {
                    hover: {
                        lineWidth: 3
                    }
                },
                pointStart: 1,
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        colors:['#71d4a7'],
        series: [{
            name: '压力',
            data: [20, 23, 14, 15, 20, 12, 30]
        }]
    });
    $('#chart3').highcharts({
        chart: {
            type: 'spline'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            allowDecimals: false,
            labels: {
                formatter: function () {
                    return this.value; // clean, unformatted number for year
                }
            }
        },
        yAxis: {
            title: {
                text: '液位'
            },
            // labels: {
            //     formatter: function () {
            //         return this.value / 1000 + 'k';
            //     }
            // }
        },
        tooltip: {
            headerFormat:'',
            pointFormat: '{series.name}：<b>{point.y:,.0f}</b> <br/> 时间：<b>{point.x}</b>时'
        },
        plotOptions: {
            spline: {
                lineWidth: 3,
                states: {
                    hover: {
                        lineWidth: 3
                    }
                },
                pointStart: 1,
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        colors:['#71d4a7'],
        series: [{
            name: '液位',
            data: [10, 23, 24, 25, 20, 18, 30]
        }]
    });
    $('#chart4').highcharts({
        chart: {
            type: 'spline'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            allowDecimals: false,
            labels: {
                formatter: function () {
                    return this.value; // clean, unformatted number for year
                }
            }
        },
        yAxis: {
            title: {
                text: '含水量'
            },
            // labels: {
            //     formatter: function () {
            //         return this.value / 1000 + 'k';
            //     }
            // }
        },
        tooltip: {
            headerFormat:'',
            pointFormat: '{series.name}：<b>{point.y:,.0f}</b> <br/> 时间：<b>{point.x}</b>时'
        },
        plotOptions: {
            spline: {
                lineWidth: 3,
                states: {
                    hover: {
                        lineWidth: 3
                    }
                },
                pointStart: 1,
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        colors:['#71d4a7'],
        series: [{
            name: '含水量',
            data: [20, 23, 24, 25, 20, 12,18]
        }]
    });
    $('#chart5').highcharts({
        chart: {
            type: 'spline'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            allowDecimals: false,
            labels: {
                formatter: function () {
                    return this.value; // clean, unformatted number for year
                }
            }
        },
        yAxis: {
            title: {
                text: '污染度'
            },
            // labels: {
            //     formatter: function () {
            //         return this.value / 1000 + 'k';
            //     }
            // }
        },
        tooltip: {
            headerFormat:'',
            pointFormat: '{series.name}：<b>{point.y:,.0f}</b> <br/> 时间：<b>{point.x}</b>时'
        },
        plotOptions: {
            spline: {
                lineWidth: 3,
                states: {
                    hover: {
                        lineWidth: 3
                    }
                },
                pointStart: 1,
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        colors:['#71d4a7'],
        series: [{
            name: '污染度',
            data: [20, 23, 24, 25, 20, 12, 10]
        }]
    });
});