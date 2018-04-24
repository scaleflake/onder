/*jshint esversion: 6 */
class ProfilesChart {
    constructor() {
        this.data = {
            labels: [
                "00:--", " ", "01:--", " ", "02:--", " ", "03:--", " ", "04:--", " ", "05:--", " ",
                "06:--", " ", "07:--", " ", "08:--", " ", "09:--", " ", "10:--", " ", "11:--", " ",
                "12:--", " ", "13:--", " ", "14:--", " ", "15:--", " ", "16:--", " ", "17:--", " ",
                "18:--", " ", "19:--", " ", "20:--", " ", "21:--", " ", "22:--", " ", "23:--", " ",
            ],
            datasets: []
        };

        this.handlers = [];

        var options = {};
        Object.assign(options, charts.options);

        this.canvasElement = document.getElementById("dayProfile");
        this.canvasContext = this.canvasElement.getContext("2d");
        this.chart = new Chart(this.canvasContext, {
            type: 'line',
            data: this.data,
            options: options
        });
    }
    addChart(label, color, handler) {
        this.data.datasets.push({
            label: label,
            backgroundColor: color.replace('rgb', 'rgba').replace(')', ', 0.1)'),
            borderColor: color.replace('rgb', 'rgba').replace(')', ', 0.8)'),
            data: [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            ],
            borderWidth: 2.0,
            fill: true,
            hidden: false, // hides dataset
            pointRadius: 2.0,
            pointHoverRadius: 4.0,
            pointBackgroundColor: color
        });
        this.handlers.push(handler);
    }
    start() {
        var chart = this;

        adapter.add(this);

        function updateData() {
            for (var i = 0; i < chart.handlers.length; i++) {
                chart.handlers[i](chart.data, i);
            } 
        }

        updateData();
        chart.chart.update();
        setTimeout(function() {
            chart.chart.update();
        }, 1000);
        setInterval(function() {
            updateData();
            chart.chart.update();
        }, 1000 * 10);
    }
}

function startCollecting(web3, contract) {
    var profilesChart = new ProfilesChart();
    profilesChart.addChart('Generation', charts.colors.generation, function(chartdata, i) {
        contract.getProfileByType(0, function(error, result) {
            if (!error) {
                for (j = 0; j < 48; j++) {
                    chartdata.datasets[i].data[j] = result[j].toNumber() / -1000;
                }
            } else {
                console.error(error);
            }
        });
    });
    profilesChart.addChart('Factories', charts.colors.factories, function(chartdata, i) {
        contract.getProfileByType(1, function(error, result) {
            if (!error) {
                for (j = 0; j < 48; j++) {
                    chartdata.datasets[i].data[j] = result[j].toNumber() / 1000;
                }
            } else {
                console.error(error);
            }
        });
    });
    profilesChart.addChart('Households', charts.colors.households, function(chartdata, i) {
        contract.getProfileByType(2, function(error, result) {
            if (!error) {
                for (j = 0; j < 48; j++) {
                    chartdata.datasets[i].data[j] = result[j].toNumber() / 1000;
                }
            } else {
                console.error(error);
            }
        });
    });
    profilesChart.addChart('Your consumption', charts.colors.your, function(chartdata, i) {
        contract.getProfileById(parseInt(getCookie('sensorid')), function(error, result) {
            if (!error) {
                for (j = 0; j < 48; j++) {
                    chartdata.datasets[i].data[j] = result[j].toNumber() / 1000;
                }
            } else {
                console.error(error);
            }
        });
    });
    profilesChart.addChart('Deficiency', charts.colors.deficiency, function(chartdata, i) {
        for (j = 0; j < 48; j++) {
            chartdata.datasets[i].data[j] = chartdata.datasets[0].data[j] - chartdata.datasets[1].data[j] - chartdata.datasets[2].data[j];
        }
    });
    profilesChart.start();
}

startFunctions.push(startCollecting);