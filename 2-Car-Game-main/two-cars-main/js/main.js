score=0;
laneItemcolorCode = ["blue", "blue", "red", "red"]
blueCar = document.getElementById('blue-car')
redCar = document.getElementById('red-car')

blueCarCurrentLane = 1
redCarCurrentLane = 3
time = 1000
countItem=0;
item = ["obstacle", "point"]

var start = document.getElementById("start");
var running = document.getElementById("running");
var end = document.getElementById("end");

function changeDashboardVisibility(state) {

    if (state == "start") {
        start.style.display = "block";
        running.style.display = "none";
        end.style.display = "none";
    }
    else if (state == "running") {
        start.style.display = "none";
        running.style.display = "block";
        end.style.display = "none";
    }
    else if (state == "end") {
        start.style.display = "none";
        running.style.display = "none";
        end.style.display = "block";
    }
}
changeDashboardVisibility("start")


function mainGame() {
    document.addEventListener('click', function () {

        document.addEventListener('keydown', function (e) {


            if (e.key == 'a') {
                moveCar('blue')
            }
            else if (e.key == 'd') {
                moveCar('red')
            }
        })
       interval= setInterval(run, time);
        

    })

    function moveCar(code) {

        if (code == 'blue') {
            if (blueCarCurrentLane == 1) {
                blueCar.style.marginLeft = '146px'
                blueCarCurrentLane = 2
            }
            else if (blueCarCurrentLane == 2) {
                blueCar.style.marginLeft = '28px'
                blueCarCurrentLane = 1
            }
        }
        else if (code == 'red') {
            if (redCarCurrentLane == 3) {
                redCar.style.marginLeft = '146px'
                redCarCurrentLane = 4
            }
            else if (redCarCurrentLane == 4) {
                redCar.style.marginLeft = '24px'
                redCarCurrentLane = 3
            }
        }

    }

    function generateLaneItem(laneNo, itemType, itemId) {
        countItem+=1;
        if (countItem>10) {
            time = time - 50;
            countItem = 0
        }
        
        var item = document.createElement('div')

        item.className = laneItemcolorCode[laneNo - 1] + " " + itemType

        var laneId = "lane-".concat(laneNo.toString())
        var lane = document.getElementById(laneId)

        lane.appendChild(item)

        $(item).animate({ marginTop: "650px" }, time, "linear")

        timeout = setTimeout(function () {
            if (laneNo < 3 && laneNo == blueCarCurrentLane) {
                if (itemId == 0) {

                    changeDashboardVisibility('end')
                    win();
                    clearInterval(interval);
                }
                else {
                    score += 1;
                    }
            }
            else if (laneNo > 2 && laneNo == redCarCurrentLane) {

                if (itemId == 0) {

                    changeDashboardVisibility('end')
                    win();
                    clearInterval(interval);
                }
                else {
                    score += 1;
                }
            } 
            document.querySelector('.score').innerHTML = "Your score: " + score;
            item.remove()
        }, time)

    }


    function run() {
        var laneNo = 1 + Math.floor(Math.random() * 4)
        var itemId = Math.floor(Math.random() * 2)
        generateLaneItem(laneNo, item[itemId], itemId)
        

    }
}
function reload() {
    location.reload();
}
function win() {
    document.querySelector('.winning').innerHTML = "Game Over!!<br> Your Score is:  " + score;
}
