const left = document.getElementById("left");
const right = document.getElementById("right");
const ima = document.getElementById("player-con");
const entg = document.getElementById("entg");
const name = document.getElementById("usrname");
var gos = 5
var Pcolor=5
var Pname="Slime"

left.onclick = () => {
    gos = (gos-1 + 9)%9
    ima.style.background="url('slim" + gos + ".png'" + ")"
    ima.style.backgroundSize="auto 100%"
    Pcolor = gos
}

right.onclick = () => {
    gos = (gos+1 + 9)%9
    ima.style.background="url('slim" + gos + ".png'" + ")"
    ima.style.backgroundSize="auto 100%"
    Pcolor = gos
}


entg.onclick = () => {
    if(!name.value=="") Pname=name.value
    window.location.href = "game.html?Pcolor="+Pcolor+"&Pname="+Pname
}

