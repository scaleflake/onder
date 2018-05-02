// charts templates
var charts = {
	wattCost: 4.0,
	options: {
        maintainAspectRatio: false,
        animation: {
        	duration: 0,
        	easing: 'easeInOutSine'
        },
        responsive: true,
        elements: {
            line: { 
                tension: 0.5 
            }
        },
        title: {
            display: true,
            text: ''
        },
        legend: {
            display: false,
            labels: {
                boxWidth: 16
            }
        },
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: -43,
                bottom: 0
            }
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Time'
                },
                ticks: {
                    autoSkip: false,
                    maxRotation: 0,
                    minRotation: 0
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Watts'
                },
            }]
        }
    },
    colors: {
    	generation: 'rgb(0, 125, 255)',
    	factories: 'rgb(3, 220, 60)',
    	households: 'rgb(153, 102, 204)', // 'rgb(47, 79, 79)',
    	your: 'rgb(255, 79, 0)',
    	deficiency: 'rgb(210, 0, 20)' // 'rgb(146, 0, 10)'
    }
};

var adapter = {
    resolution: NaN,
    charts: [],
    setOptions: function(minRot, maxRot, legend, labels, dotsSize) {
        this.charts.forEach(function(e) {
            // ticks
            e.chart.options.scales.xAxes[0].ticks.minRotation = minRot;
            e.chart.options.scales.xAxes[0].ticks.maxRotation = maxRot;

            // legend
            e.chart.options.legend.display = legend;

            // scale labels
            e.chart.options.scales.yAxes[0].display = labels;
            e.chart.options.scales.yAxes[0].scaleLabel.display = labels;

            // dots size
            for (var i = 0; i < e.data.datasets.length; i++) {
                e.data.datasets[i].borderWidth = dotsSize;
                e.data.datasets[i].pointRadius = dotsSize;
            }
        });
    },
    adapt: function() {
        var width = window.innerWidth;

        if (width < 375) {
            if (adapter.resolution != 375) {
                adapter.setOptions(90, 90, false, false, 1.0);
                adapter.resolution = 375;
            }
        } else if (width < 425) {
            if (adapter.resolution != 425) {
                adapter.setOptions(90, 90, false, false, 1.5);
                adapter.resolution = 425;
            }
        } else if (width < 768) {
            if (adapter.resolution != 768) {
                adapter.setOptions(90, 90, true, false, 1.5);
                adapter.resolution = 768;
            }    
        } else {
            if (adapter.resolution != 100000) {
                adapter.setOptions(0, 45, true, true, 2.0);
                adapter.resolution = 100000;
            }   
        }
    },
    add: function(chart) {
        this.charts.push(chart);
        this.adapt();
    },
    start: function() {
        window.addEventListener("resize", this.adapt.bind(null, this));
    }
};

adapter.start();

// if (width < 320) {
//     chart.switchMobileS();
// } else if (width < 375) {
//     chart.switchMobileM();
// } else if (width < 425) {
//     chart.switchMobileL();
// } else if (width < 768) {
//     chart.switchTablet();
// } else if (width < 1024) {
//     chart.switchLaptop();
// } else if (width < 1440) {
//     chart.switchLaptopL();
// } else {
//     chart.switch4K();
// }
