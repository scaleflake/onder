/*jshint esversion: 6 */
class RealTimeChart {
    constructor() {
        this.buffer = {
            values: []
        };

        this.data = {
            labels: [
                " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ",
                " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ",
                " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "
            ],
            datasets: []
        };

        this.handlers = [];

        var options = {};
        Object.assign(options, charts.options);

        this.canvasElement = document.getElementById("generationAndConsumption");
        this.canvasContext = this.canvasElement.getContext("2d");
        this.chart = new Chart(this.canvasContext, {
            type: 'line',
            data: this.data,
            options: options
        });
    }
    addChart(label, color, handler) {
        this.buffer.values.push(0);
        this.data.datasets.push({
            label: label,
            backgroundColor: color.replace('rgb', 'rgba').replace(')', ', 0.1)'),
            borderColor: color.replace('rgb', 'rgba').replace(')', ', 0.8)'),
            data: [
                NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN,
                NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN
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

        function getData() {
            for (var i = 0; i < chart.handlers.length; i++) {
                chart.handlers[i](chart.buffer, i);
            }
        }

        var add = true;
        function pushData() {
            for (var i = 0; i < chart.data.datasets.length; i++) {
                chart.data.datasets[i].data.push(chart.buffer.values[i]);
                chart.data.datasets[i].data.shift();
            }
            if (add) {
                var time = new Date();
                chart.data.labels.push(String(time.getHours()) + ":" + String(time.getMinutes()) + ":" + String(time.getSeconds()));
            } else {
                chart.data.labels.push("");
            }
            add = !add;
            chart.data.labels.shift();
        }

        getData();
        chart.chart.update();
        setInterval(function() {
            getData();
            pushData();
            chart.chart.update();
        }, 5000);
    }
}

function startMonitoring(web3, contract) {
    var realTimeChart = new RealTimeChart();
    realTimeChart.addChart('Generation', charts.colors.generation, function(buffer, i) {
        contract.getEnergyByType(0, function(error, result) {
            if (!error) {
                buffer.values[i] = result.toNumber() / -1000.0;
            } else {
                console.error(error);
            }
        });
    });
    realTimeChart.addChart('Factories', charts.colors.factories, function(buffer, i) {
        contract.getEnergyByType(1, function(error, result) {
            if (!error) {
                buffer.values[i] = result.toNumber() / 1000.0;
            } else {
                console.error(error);
            }
        });
    });
    realTimeChart.addChart('Households', charts.colors.households, function(buffer, i) {
        contract.getEnergyByType(2, function(error, result) {
            if (!error) {
                buffer.values[i] = result.toNumber() / 1000.0;
            } else {
                console.error(error);
            }
        });
    });
    realTimeChart.addChart('Your consumption', charts.colors.your, function(buffer, i) {
        contract.getEnergyById(parseInt(getCookie('sensorid')), function(error, result) {
            if (!error) {
                buffer.values[i] = result.toNumber() / 1000.0;
            } else {
                console.error(error);
            }
        });
    });
    realTimeChart.addChart("Deficiency", charts.colors.deficiency, function(buffer, i) {
        var generation = buffer.values[0] * -1;
        var ownConsumption = buffer.values[1];
        var othersConsumtion = buffer.values[2];

        var deficiency = generation + ownConsumption + othersConsumtion;
        document.getElementById('deficiency').innerHTML = String(deficiency.toFixed(3)) + '  kW⋅h';
        document.getElementById('wholeExpenses').innerHTML = String((deficiency * charts.wattCost).toFixed(3)) + ' rub.';
        document.getElementById('ownExpenses').innerHTML = String((deficiency * charts.wattCost * ownConsumption / (ownConsumption + othersConsumtion)).toFixed(3)) + ' rub.';

        buffer.values[i] = deficiency;
    });
    realTimeChart.start();
}

startFunctions.push(startMonitoring);