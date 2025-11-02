const cav = document.getElementById("canva");
const ctx = cav.getContext("2d");
const chatBox = document.getElementById("chatMsg");
const sendMsg = document.getElementById("sendMsg");
ctx.imageSmoothingEnabled = false;
cav.style.imageRendering = "pixelated";
cav.width = window.innerWidth;
cav.height = window.innerHeight;

const params = new URLSearchParams(window.location.search);
const Pcolor = params.get("Pcolor");
const Pname = params.get("Pname");

const img0 = new Image();
const img1 = new Image();
const img2 = new Image();
const img3 = new Image();
const img4 = new Image();
const img5 = new Image();
const img6 = new Image();
const img7 = new Image();
const img8 = new Image();

img0.src = "slim0.png";
img1.src = "slim1.png";
img2.src = "slim2.png";
img3.src = "slim3.png";
img4.src = "slim4.png";
img5.src = "slim5.png";
img6.src = "slim6.png";
img7.src = "slim7.png";
img8.src = "slim8.png";


const mages=[img0, img1, img2, img3, img4, img5, img6, img7, img8]


const bac = new Image();
const lay = new Image();

const isAndroid = /Android/i.test(navigator.userAgent);

let keysa = {
    "left": false,
    "right": false,
    "up": false,
    "down": false
};

// **Joystick setup for Android**
if (isAndroid) {
    let joystick = {
        startX: 0,
        startY: 0,
        moveX: 0,
        moveY: 0,
        active: false
    };

    cav.addEventListener("touchstart", (e) => {
        let touch = e.touches[0];
        joystick.startX = touch.clientX;
        joystick.startY = touch.clientY;
        joystick.active = true;
    });

    cav.addEventListener("touchmove", (e) => {
        if (joystick.active) {
            let touch = e.touches[0];
            joystick.moveX = touch.clientX - joystick.startX;
            joystick.moveY = touch.clientY - joystick.startY;

            keysa.left = joystick.moveX < -20;
            keysa.right = joystick.moveX > 20;
            keysa.up = joystick.moveY < -20;
            keysa.down = joystick.moveY > 20;
        }
    });

    cav.addEventListener("touchend", () => {
        keysa.left = keysa.right = keysa.up = keysa.down = false;
        joystick.active = false;
    });
} else {
    // **Keyboard controls for PC**
    window.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "ArrowUp":
                keysa.up = true;
                break;
            case "ArrowDown":
                keysa.down = true;
                break;
            case "ArrowLeft":
                keysa.left = true;
                break;
            case "ArrowRight":
                keysa.right = true;
                break;
        }
    });

    window.addEventListener("keyup", (e) => {
        switch (e.key) {
            case "ArrowUp":
                keysa.up = false;
                break;
            case "ArrowDown":
                keysa.down = false;
                break;
            case "ArrowLeft":
                keysa.left = false;
                break;
            case "ArrowRight":
                keysa.right = false;
                break;
        }
    });
}



class Boundary {
constructor(position){
    this.x=position.x
    this.y=position.y}
}

class Player{
    constructor(x,y,color,name,anim,chat,img){
        this.x=x
        this.y=y
        this.color=color
        this.name=name
        this.anim=anim
        this.frame=0
        this.crop=0
        this.chat=chat
        this.chatf=0
        this.img= mages[color]
    }
    draw(anim){
        if (anim=="walk") {
            this.frame = (this.frame+1)%40
            if (this.frame==5) this.crop=16
            if (this.frame==10) this.crop=32
            if (this.frame==15) this.crop=48
            if (this.frame==20) this.crop=64
            if (this.frame==25) this.crop=80
            if (this.frame==30) this.crop=64
            if (this.frame==35) this.crop=48
            if (this.frame==40) this.crop=32
            ctx.drawImage(this.img,this.crop,0,16,15,this.x,this.y,48,48)
        }

        if (anim=="idle"){
            ctx.drawImage(this.img,16,0,16,15,this.x,this.y,48,48)
        }
        ctx.font = "20px pixel";
        ctx.fillStyle="black"
        ctx.fillText(this.name,(this.x+24)-(ctx.measureText(this.name).width/2),this.y-10)
        
        if(!this.chat==""){
            if(this.chatf==240){this.chatf=0; this.chat=""}
            this.chatf+=1
            ctx.fillStyle="white";
            ctx.fillRect((this.x+24)-((ctx.measureText(this.chat).width/2)),this.y+66,ctx.measureText(this.chat).width,20)
            ctx.fillRect((this.x+24)-((ctx.measureText(this.chat).width/2)+5),this.y+72,ctx.measureText(this.chat).width+10,10)
            ctx.fillRect((this.x+24)-5,this.y+59,10,10)
            ctx.fillRect((this.x+24)-2,this.y+54,4,10)
            ctx.font = "15px pixel";
            ctx.fillStyle="black";
            ctx.fillText(this.chat,(this.x+24)-((ctx.measureText(this.chat).width/2)),this.y+80)
            
        }
    }
}
const collisionMap =[]

for (let i =0; i<collision.length; i +=70) {
    collisionMap.push(collision.slice(i, 70+i))
}

const edges =[]
for (let i=0; i<collisionMap.length; i++){
    for (let j=0; j<collisionMap[i].length; j++){
        if(collisionMap[i][j]==1021) edges.push(new Boundary(position={x:(j*24),y:(i*24)}))
    }
}


bac.src = "the wall.png";
lay.src = "the wall2.png";
ctx.translate(0,0);


var cam_pos = {x:0, y:0}
var can_play=false
var onliners=[]
var onlAttr={}
var updated=""

sendMsg.onclick = () =>{
    if(!chatBox.value==""){
        
        if (ws.readyState == WebSocket.OPEN){
            ws.send(JSON.stringify({name:mainPlayer.name, msg: chatBox.value, type:"chat"}))
            mainPlayer.chat=chatBox.value
            chatBox.value=""
        }
        
    }
}

const ws = new WebSocket(
  (location.protocol === "https:" ? "wss://" : "ws://") + "serve.abubazar.name.ng"
);

ws.onopen = () => {
    
    if (ws.readyState == WebSocket.OPEN){ws.send(JSON.stringify({name:mainPlayer.name, color:mainPlayer.color, type:"bio"
    }));}

    ws.onmessage = (event) => {
        let dar = JSON.parse(event.data)
        if (dar.type=="bio" && !(dar.name==mainPlayer.name)) {
            onliners.push(new Player(250, 150, dar.color, dar.name, "idle",""))
            onlAttr[dar.name]={x:250, y:150}
            showMessage.msg=dar.name+" joined the game!";

            if (ws.readyState == WebSocket.OPEN){
                ws.send(JSON.stringify({name:mainPlayer.name, x:mainPlayer.x, y:mainPlayer.y, type:"upd"}))
            }}
        
        if(dar.type=="chat") {
            for(let i=0; i<onliners.length; i++){
                if (onliners[i].name==dar.name) onliners[i].chat=dar.msg
            }
        }

        if (dar.type=="upd" ){onlAttr[dar.name]={x:dar.x, y:dar.y, anm:"walk", lag:7};}

        if (dar.type=="deleteU"){
            onliners = onliners.filter(p => p.name !== dar.name)
            showMessage.msg=dar.name+" left the game!"
        }



        };
}

function sendPosition(){
    if (ws.readyState == WebSocket.OPEN){
        ws.send(JSON.stringify({name:mainPlayer.name, x:mainPlayer.x, y:mainPlayer.y, type:"upd"}))
    }
}

lay.onload = () => {
can_play=true
animate();}

cav.width=window.innerWidth-6;
cav.height=window.innerHeight-6;

function checkCollide(x,y) {
    let permit=true
    for (let i = 0; i<edges.length; i++){
        if (mainPlayer.x+32+x >= edges[i].x && mainPlayer.x+16+x <= edges[i].x+24 && mainPlayer.y+46+y >= edges[i].y && mainPlayer.y+26+y <= edges[i].y+24)permit=false
    }
    if (permit==true){
        mainPlayer.x+=x
        mainPlayer.y+=y
    }
}
function drawOnliners(){

    for(let i=0; i<onliners.length; i++){
        onliners[i].x=onlAttr[onliners[i].name].x
        onliners[i].y=onlAttr[onliners[i].name].y
        onlAttr[onliners[i].name].lag = (onlAttr[onliners[i].name].lag-1)%12;
        onliners[i].draw(onlAttr[onliners[i].name].anm)
        if (onlAttr[onliners[i].name].lag<=1) onlAttr[onliners[i].name].anm="idle"
    }
    
}

class Showtxt{
    constructor(msg,y){
        this.msg=msg
        this.y=y
        this.frame=0
        this.loopa=[-1,1,2,3,4,5,6,
            7,10,10,10,10,10,10,10,
            10,10,10,10,10,10,10,10,
            10,10,10,10,10,10,10,10,
            10,10,10,10,10,10,10,10,
            10,10,10,10,10,10,10,10,
            10,10,10,10,10,10,10,10,
            10,10,10,10,10,10,10,10,
            10,10,10,10,10,10,10,10,
            10,10,10,10,10,10,10,10,
            10,10,10,10,10,10,10,10,
            10,10,10,10,7,6,5,4,3,2,1]
    }
    draw(){
        if(!this.msg==""){
        this.frame+=1
        this.y=this.loopa[this.frame]*3
        if (this.frame==this.loopa.length) {this.frame=0; this.msg=""}
    ctx.font = "20px pixel";
    ctx.fillStyle="black";
    ctx.fillText(this.msg,-cam_pos.x+30,this.y+(-cam_pos.y))
        }
    }
}

showMessage = new Showtxt("",30)


const mainPlayer = new Player(250,150,Pcolor,Pname,"idle","") 

function animate(){
    
    ctx.imageSmoothingEnabled = false;
    if (can_play){
    ctx.clearRect(0,0,cav.width,cav.height)
    ctx.drawImage(bac,0,0,1680,1920)

    drawOnliners()

    if (keysa.left || keysa.right || keysa.up || keysa.down){ mainPlayer.draw("walk"); sendPosition(); }
    else {mainPlayer.draw("idle")}
    ctx.drawImage(lay,0,0,1680,1920)
    
    if (keysa.up) {checkCollide(0,-3);}
    else if (keysa.down) checkCollide(0,3)
    if (keysa.left) checkCollide(-3,0)
    else if (keysa.right) checkCollide(3,0)
    
    
    if (mainPlayer.x >cav.width/2 && mainPlayer.x <1680-cav.width/2)cam_pos.x = -mainPlayer.x+ cav.width/2
    if (mainPlayer.y >cav.height/2 && mainPlayer.y <1920-cav.height/2)cam_pos.y = -mainPlayer.y+ cav.height/2
    
    showMessage.draw()
    ctx.setTransform(1,0,0,1,cam_pos.x,cam_pos.y)


    setTimeout(() => requestAnimationFrame(animate), 1000/60)}
};

window.addEventListener("resize",() => {
    if(!isAndroid){mainPlayer.x=250;
    mainPlayer.y=150;
    cam_pos.x=0;
    cam_pos.y=0;

    cav.width=window.innerWidth-6;
    cav.height=window.innerHeight-6;}
})










