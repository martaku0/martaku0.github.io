let yes = document.getElementById("yes");
let no = document.getElementById("no");
let question = document.getElementById("question");

let currentTxt = 0;
txt = ["Are you sure?", "Please?", "I know you want to!", "Don't do that!", "What are you doing?", "Just be mine!", ":(((("]

no.addEventListener("click", () => {
    currW = yes.offsetWidth;
    currH = yes.offsetHeight;
    yes.style.width = currW * 1.2 + "px";
    yes.style.height = currH * 1.2 + "px";
    if(currentTxt < txt.length){
        question.innerHTML = txt[currentTxt];
        currentTxt+=1;
    }
    else{
        currentTxt = 0;
        question.innerHTML = txt[currentTxt];
        currentTxt+=1;
    }
});

yes.addEventListener("click", ()=>{
    document.getElementById("ask").style.display = "none";
    document.getElementById("thank").style.display = "flex";
});