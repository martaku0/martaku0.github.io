let btn = document.getElementById("btn");

function randomColor() {
    return Math.floor(Math.random() * 16777215).toString(16)
}

function getWidth() {
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
}

function getHeight() {
    return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.documentElement.clientHeight
    );
}

function getRandom(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    rand = Math.floor(Math.random() * (max - min) + min)
    return rand
}

function getRandomMove(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    rand = Math.floor(Math.random() * (max - min) + min)
    if (rand < 120 && rand > -120) {
        return getRandomMove(min, max)
    }
    return rand
}

function move() {
    let direction = ["left", "top"]
    let direc = direction[getRandom(0, 2)]
    if (direc == "left") {
        let val = btn.offsetLeft + getRandomMove(-300, 300)
        if (val > 100 && val < (getWidth() - 100)) {
            btn.style.left = val + "px"
            console.log(val)
        } else {
            move()
        }
    } else {
        let val = btn.offsetTop + getRandomMove(-300, 300)
        if (val > 100 && val < (getHeight() - 100)) {
            btn.style.top = val + "px"
            console.log(val)
        } else {
            move()
        }
    }
    btn.style.backgroundColor = "#" + randomColor()
}

function baton() {
    alert("You've clicked me!")
}