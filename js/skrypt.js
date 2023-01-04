var main = document.querySelector("main");

let a = 9;
let b = 9;
let mines = 10;
let opened = 0;
let game = false;
var timer = 1;
let sec = 0;
var nick = encodeURIComponent(document.querySelector("#nickLbl").value.toString());
var timerNow = Date.now();

let mode1 = `a${a}b${b}m${mines}`;

let bests = ["", "", "", "", "", "", "", "", "", ""];
let nicks = ["", "", "", "", "", "", "", "", "", ""];
let bestses = new Map();

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function create_main(a, b) {
    let table = document.createElement("table");
    main.appendChild(table);
    opened = 0;
    for (let i = 0; i < a; i++) {
        let row = document.createElement("tr");
        table.appendChild(row);
        for (let j = 0; j < b; j++) {
            let e = document.createElement("td");
            row.appendChild(e);
            e.classList.add(`elementa${i}b${j}`);
            e.classList.add("no-mine");
            e.onclick = function show() {
                if (!e.classList.contains("open") && !e.classList.contains("flaged") && !e.classList.contains("asked")) {
                    if (e.classList.contains("no-mine")) {
                        calc_mines(i, j);
                        is_win(a, b, mines);
                    } else {
                        if (game) {
                            lose();
                        }
                    }
                }
            };
            e.oncontextmenu = (event) => {
                if (event.button == 2) {
                    event.preventDefault();
                    if (!e.classList.contains("open")) {
                        flag(e);
                    }
                }
            };
        }
    }
}


let m_temp = parseInt(document.querySelector("[name='mines']").value);

function flag(e) {
    if (e.classList.contains("flaged")) {
        e.innerHTML = "❓";
        e.classList.remove("flaged");
        e.classList.add("asked");
        m_temp += 1;
        document.querySelector(".mines-to-get").value = m_temp;
    } 
    else if(e.classList.contains("asked")){
        e.innerHTML = "";
        e.classList.remove("asked");
    }
    else {
        if (m_temp > 0) {
            e.innerHTML = "🚩";
            e.classList.add("flaged");
            m_temp -= 1;
            document.querySelector(".mines-to-get").value = m_temp;
        }
    }
}

function create_mines(m, a, b) {
    let i = 0;
    while (i < m) {
        let k1 = getRandomInt(0, a);
        let k2 = getRandomInt(0, b);
        let mineHerePlease = document.querySelector(`.elementa${k1}b${k2}`);
        if (mineHerePlease.classList.contains("no-mine")) {
            mineHerePlease.classList.remove("no-mine");
            mineHerePlease.classList.add("mine");
            i++;
        }
    }
}

function calc_mines(i, j) {
    let e = document.querySelector(`.elementa${i}b${j}`);
    if (!e.classList.contains("open")) {
        let m = 0;
        if (e.classList.contains("no-mine")) {
            e.classList.add("no-mine-open");
            e.classList.add("open");
            opened++;
            if (document.querySelector(`.elementa${i-1}b${j-1}`) !== null) {
                if (document.querySelector(`.elementa${i-1}b${j-1}`).classList.contains("mine")) {
                    m++
                }
            }
            if (document.querySelector(`.elementa${i-1}b${j}`) !== null) {
                if (document.querySelector(`.elementa${i-1}b${j}`).classList.contains("mine")) {
                    m++
                }
            }
            if (document.querySelector(`.elementa${i-1}b${j+1}`) !== null) {
                if (document.querySelector(`.elementa${i-1}b${j+1}`).classList.contains("mine")) {
                    m++
                }
            }
            if (document.querySelector(`.elementa${i}b${j-1}`) !== null) {
                if (document.querySelector(`.elementa${i}b${j-1}`).classList.contains("mine")) {
                    m++
                }
            }
            if (document.querySelector(`.elementa${i}b${j+1}`) !== null) {
                if (document.querySelector(`.elementa${i}b${j+1}`).classList.contains("mine")) {
                    m++
                }
            }
            if (document.querySelector(`.elementa${i+1}b${j-1}`) !== null) {
                if (document.querySelector(`.elementa${i+1}b${j-1}`).classList.contains("mine")) {
                    m++
                }
            }
            if (document.querySelector(`.elementa${i+1}b${j}`) !== null) {
                if (document.querySelector(`.elementa${i+1}b${j}`).classList.contains("mine")) {
                    m++
                }
            }
            if (document.querySelector(`.elementa${i+1}b${j+1}`) !== null) {
                if (document.querySelector(`.elementa${i+1}b${j+1}`).classList.contains("mine")) {
                    m++
                }
            }
            if (m != 0) {
                e.innerHTML = m
            } else {
                e.innerHTML = " ";
                auto_open(i, j);
            }
        }
    }

}

function auto_open(i, j) {
    let e = document.querySelector(`.elementa${i}b${j}`);

    if (document.querySelector(`.elementa${i-1}b${j-1}`) !== null) {
        calc_mines(i - 1, j - 1)
    }
    if (document.querySelector(`.elementa${i-1}b${j}`) !== null) {
        calc_mines(i - 1, j)
    }
    if (document.querySelector(`.elementa${i-1}b${j+1}`) !== null) {
        calc_mines(i - 1, j + 1)
    }
    if (document.querySelector(`.elementa${i}b${j-1}`) !== null) {
        calc_mines(i, j - 1)
    }
    if (document.querySelector(`.elementa${i}b${j+1}`) !== null) {
        calc_mines(i, j + 1)
    }
    if (document.querySelector(`.elementa${i+1}b${j-1}`) !== null) {
        calc_mines(i + 1, j - 1)
    }
    if (document.querySelector(`.elementa${i+1}b${j}`) !== null) {
        calc_mines(i + 1, j)
    }
    if (document.querySelector(`.elementa${i+1}b${j+1}`) !== null) {
        calc_mines(i + 1, j + 1)
    }
}

var l = document.querySelector(".lost");
var w = document.querySelector(".won");
var all_t = document.querySelectorAll(".all_time");

function is_win(a, b, m) {
    let x = a * b - m;
    if (x == opened) {
        end_open_everything();
        w.style.display = "block";
        sec = Date.now() - timerNow;
        all_t[1].innerHTML = `Time: ${sec} ms`;
        load_highscores();
        if (nicks.includes(` ${nick}` || nick)) {
            var theCookies = document.cookie.split(';');
            for (let i = 0; i < theCookies.length; i++) {
                let cok = theCookies[i].split('=');
                if (cok.includes(` ${nick},a${a}b${b}m${mines}` || `${nick},a${a}b${b}m${mines} = ${sec}`)) {
                    if (cok[cok.length - 1] > sec) {
                        document.cookie = `${nick},a${a}b${b}m${mines} = ${sec}; expires=Tue, 19 Jan 2038 04:14:07 GMT;secure;SameSite=None`;
                        break;
                    }
                }
            }
        } else {
            document.cookie = `${nick},a${a}b${b}m${mines} = ${sec}; expires=Tue, 19 Jan 2038 04:14:07 GMT;secure;SameSite=None`;
        }
        write_highscores();
        stop();
    }
}

function lose() {
    sec = Date.now() - timerNow;

    end_open_everything();
    l.style.display = "block";
    all_t[0].innerHTML = `Time: ${sec} ms`;
    stop();
}

function close_lost() {
    l.style.display = "none";
}

function close_won() {
    w.style.display = "none";
}

function calc_all_mines(a, b) {
    for (let i = 0; i < a; i++) {
        for (let j = 0; j < b; j++) {
            let m = 0
            let e = document.querySelector(`.elementa${i}b${j}`)
            if (e.classList.contains("no-mine")) {
                if (document.querySelector(`.elementa${i-1}b${j-1}`) !== null) {
                    if (document.querySelector(`.elementa${i-1}b${j-1}`).classList.contains("mine")) {
                        m++
                    }
                }
                if (document.querySelector(`.elementa${i-1}b${j}`) !== null) {
                    if (document.querySelector(`.elementa${i-1}b${j}`).classList.contains("mine")) {
                        m++
                    }
                }
                if (document.querySelector(`.elementa${i-1}b${j+1}`) !== null) {
                    if (document.querySelector(`.elementa${i-1}b${j+1}`).classList.contains("mine")) {
                        m++
                    }
                }
                if (document.querySelector(`.elementa${i}b${j-1}`) !== null) {
                    if (document.querySelector(`.elementa${i}b${j-1}`).classList.contains("mine")) {
                        m++
                    }
                }
                if (document.querySelector(`.elementa${i}b${j+1}`) !== null) {
                    if (document.querySelector(`.elementa${i}b${j+1}`).classList.contains("mine")) {
                        m++
                    }
                }
                if (document.querySelector(`.elementa${i+1}b${j-1}`) !== null) {
                    if (document.querySelector(`.elementa${i+1}b${j-1}`).classList.contains("mine")) {
                        m++
                    }
                }
                if (document.querySelector(`.elementa${i+1}b${j}`) !== null) {
                    if (document.querySelector(`.elementa${i+1}b${j}`).classList.contains("mine")) {
                        m++
                    }
                }
                if (document.querySelector(`.elementa${i+1}b${j+1}`) !== null) {
                    if (document.querySelector(`.elementa${i+1}b${j+1}`).classList.contains("mine")) {
                        m++
                    }
                }
            }
            if (m != 0) {
                e.innerHTML = m
            } else {
                e.innerHTML = " "
            }
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function end_open_everything() {
    calc_all_mines(a, b);
    for (let i = 0; i < a; i++) {
        for (let j = 0; j < b; j++) {
            let e = document.querySelector(`.elementa${i}b${j}`);
            if (e.classList.contains("no-mine")) {
                e.classList.add("no-mine-open");
            } else {
                e.classList.add("mine-open")
                e.innerHTML = "💣"
            }
        }
    }
}


function start() {
    timerNow = Date.now();
    b = document.querySelector("[name='width']").value;
    if(b > 40){
        document.querySelector("[name='width']").value = 40;
        b = 40;
    }
    a = document.querySelector("[name='height']").value;
    if(a > 100){
        document.querySelector("[name='height']").value = 100;
        a = 100;
    }
    nick = encodeURIComponent(document.querySelector("#nickLbl").value.toString());
    mines = document.querySelector("[name='mines']").value;
    mode1 = `a${a}b${b}m${mines}`;
    if (a * b >= mines && nick!="") {
        sec = 0;
        game = true;
        document.querySelector("table").remove();

        let time = document.querySelector(".time");

        time.value = "0";

        clearInterval(timer);
        sec++;
        timer = setInterval(function() {
            sec++;
            time.value = sec-1;
        }, 1000);

        write_highscores();

        m_temp = mines;

        document.querySelector(".mines-to-get").value = mines;

        create_main(a, b);
        create_mines(mines, a, b);

    } else if(nick!=""){
        alert("Error!\nThe number of mines cannot exceed the number of fields.");
    }
    else{
        alert("Error!\nWrite your nick.");
    }
}

function stop() {
    game = false;
    clearInterval(timer);
}

function load_highscores() {
    nicks = ["", "", "", "", "", "", "", "", "", ""];
    bests = [0,0,0,0,0,0,0,0,0,0];
    bestses.clear();
    var theCookies = document.cookie.split(';');
    for (let i = 0; i < theCookies.length; i++) {
        let cok = theCookies[i].split('=');
        let cok1 = cok[0].split(',');
        score1 = parseInt(cok[cok.length-1]);
        mode = cok1[cok1.length-1];
        nick1 = cok1[0];
        if(mode == mode1){
            bestses.set(nick1, score1);
        }
        bestses[Symbol.iterator] = function*() {
            yield*[...this.entries()].sort((a, b) => a[1] - b[1]);
        }
        for (let i = 0; i < bests.length; i++) {
            let t = [...bestses][i];
            if (t != undefined) {
                bests[i] = t[1];
                nicks[i] = t[0];
            }
        }
    }
}

function write_highscores() {
    load_highscores();
    let highscores = document.querySelectorAll('.highscores');
    highscores.forEach(element => {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    });
    let highscores_header = document.querySelector('.highscores-mode');
    highscores_header.innerHTML = `(mode: ${mode}):`;
    highscores.forEach(element => {
        let j = 1
        for (let i = 0; i < bests.length; i++) {
            let h = document.createElement("p");
            element.appendChild(h);
            if (nicks[i] != "") {
                h.innerHTML = `${j}. ${decodeURIComponent(nicks[i])} - ${bests[i]}ms`;
                j += 1;
            }
        }
    });
}