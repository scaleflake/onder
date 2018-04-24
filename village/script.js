var contract;  
var accounts;

var currentHour = 40;
function startTimeticking() {
    var div = document.getElementById('hour');
    var input = document.getElementById('day-input');
    input.addEventListener('input', function() {
        div.innerHTML = String(input.value);
        currentHour = input.value * 2.0;
    });
    setInterval(function() {
        if (currentHour != 47) {
            currentHour += 1;
            div.innerHTML = String(currentHour / 2);
            input.value = currentHour / 2;
        } else {
            currentHour = 0;
            div.innerHTML = String(currentHour / 2);
            input.value = currentHour / 2;
        }
        contract.recalcProfiles.sendTransaction(currentHour, { from: accounts[0], gas: 800000, gasPrice: 1 }, function(error, result) {
            if (!error) {
                console.log(currentHour);
            } else {
                console.error(error);
            }
        });
    }, 10000);
}

var sensorsCount = 0;
var sensors = $('#sensors');

function addSensor(type, owner) {
    var id = sensorsCount;
    var consumption = 0.9;
    var profile = getRandomProfile(type);

    sensorsCount++;

    var sensor = $('<div class="sensor ' + Types[type] + '">\n</div>');
    sensors.append(sensor);

    sensor.append('<div class="id">' + String(sensorsCount - 1) + '</div>');

    var watts = $('<div class="watts">0.0 watt</div>');
    sensor.append(watts);

    var usage = $('<div class="usage">90%</div>');
    sensor.append(usage);

    var input = $('<input type="range" max="100" min="0" value="90">');
    input.on('input', function() {
        consumption = parseFloat(input.val()) / 100.0;
        usage.html(input.val() + '%');
    });
    sensor.append(input);

    sensor.append('<div class="owner">' + owner + '</div>');

    var options = { 
        from: owner, 
        gas: 800000, 
        gasPrice: 20 * 1000 * 1000 * 1000
    };

    contract.addSensor.sendTransaction(type, options, function(error, result) {
        if (error) { console.error(error); } else {
            console.log('Sensor added: ' + result);
            setInterval(function() {
                if (true) {
                    var energy = profile[currentHour] * getRandomFloat(0.95, 1.05) * consumption;
                    contract.process.sendTransaction(id, Math.floor(energy * 1000), options, function(error, result) {
                        if (error) { console.error(error); } 
                        else {
                            console.log('Consumption sent: ' + result);
                        }
                    });
                    watts.html(energy.toFixed(3) + ' watt');
                }
            }, 5000);
        }
    });
}

function start(web3) {
    accounts = web3.eth.accounts;

    var accountsContainer = $('#accounts');
    accounts.forEach(function(e) {
        var account = $('<div class="account-address"></div>');

        var address = $('<div style="width: 73%">' + e + '</div>');
        account.append(address);

        var balance = $('<div style="width: 27%">' + web3.eth.getBalance(e).toString(10) + '</div>');
        account.append(balance);

        accountsContainer.append(account);

        account.on('click', function() {
            addSensor(2, address.html());
        });

        setInterval(function() {
            balance.html(web3.eth.getBalance(e).toString(10));
        }, 20000);
    });

    contract = web3.eth.contract(interface).at(address);

    startTimeticking();

    contract.getSensorsCount(function(error, result) {
        if (error) { console.error(error); }
        else {
            console.log(result.toString(10));
        }
    });

    addSensor(0, accounts[0]);
    addSensor(1, accounts[1]);
    addSensor(2, accounts[1]);
    addSensor(2, accounts[2]);
    addSensor(2, accounts[3]);
    addSensor(2, accounts[4]);

    

    // var buffer = 0;

    // var balance = web3.eth.getBalance(account);
    // console.log(balance.toString(10));

    // setInterval(function() {
    //     buffer = balance;
    //     balance = web3.eth.getBalance(account);
    //     console.log(balance.toString(10), ':', (buffer.minus(balance)).toString(10));
    // }, 20000);
}


    // function switchState(sensor) {
    //     if (sensor.active) {
    //         sensor.active = false;
    //         sensor.div.style.backgroundColor = "lightgray";
    //     } else {
    //         sensor.active = true;
    //         sensor.div.style.backgroundColor = "#FFDA73";
    //     }
    // }
    // this.div = document.getElementById(String(elementId));
    // this.div.addEventListener("click", switchState.bind(null, this));

    // .addEventListener("input", function() { 
    //     return function() {
    //         sensor.consumption = parseFloat(input.value) / 100.0;
    //         console.log(sensor.consumption);
    //     }
    // });