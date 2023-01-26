/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
const cxt = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 500
const CANVAS_HEIGHT = canvas.height = 700;
const numberOfNpc = 4;
const npc1Array = [];
const npc2Array = [];
const npc3Array = [];
const npc4Array = [];
const boogerImg = new Image();
let goodCount = 0;
boogerImg.src = 'https://static.vecteezy.com/system/resources/previews/001/202/843/non_2x/poo-emoji-png.png';
let sound1 = new Audio("sounds/squish.mp3");
let sound2 = new Audio('sounds/fart1.mp3');
let sound3 = new Audio('sounds/fart2.mp3');
let backgroundMusic = new Audio('sounds/Homies.mp3');
let scoreCount = document.getElementById('score');
let livesElement = document.getElementById('lives');
let lives = 3;

let volumeSlider = document.getElementById("volumeSlider");
let muteBtn = document.getElementById("muteBtn");
let muted = false;
let sliderVol = 1;

scoreCount.innerHTML = 'Score: ' + goodCount;
livesElement.innerHTML = 'lives: ' + lives;
backgroundMusic.volume = 1;

volumeSlider.addEventListener("input", function() {
  backgroundMusic.volume = this.value;
  sliderVol = this.value;
});
muteBtn.addEventListener("click", function(){
    if(muted == false){
        backgroundMusic.volume = 0;
        muted = true;
    }else{
        backgroundMusic.volume = sliderVol;
        muted = false;
    }
   
})


backgroundMusic.play();

class npc {
constructor(x){
        this.x = x;
        this.y = -100;
        this.width = 100;
        this.height = 100;
        this.speed = Math.random()*3*(goodCount/15) + 1;
    }
    update(){
        this.y = this.y+this.speed;
    }
    draw(){
        cxt.drawImage(boogerImg, this.x, this.y, this.width, this.height);
    }
};
    npc1Array.push(new npc());
        npc1Array[0].x = (CANVAS_WIDTH/4 * 0)+10;
    npc2Array.push(new npc());
        npc2Array[0].x = (CANVAS_WIDTH/4 * 1)+10;
    npc3Array.push(new npc());
        npc3Array[0].x = (CANVAS_WIDTH/4 * 2)+10;
    npc4Array.push(new npc());
        npc4Array[0].x = (CANVAS_WIDTH/4 * 3)+10;

function animate(){
    //1st row booger animation
    cxt.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    npc1Array.forEach(npc => {
        npc.update();
        npc.draw();
    });
    for (let i = 0; i<npc1Array.length; i++){
        if(npc1Array[i].y > CANVAS_HEIGHT){
        checkLose();
        npc1Create();
        }

    }
    //2nd row booger animation
    npc2Array.forEach(npc => {
        npc.update();
        npc.draw();
    });  
    for (let i = 0; i<npc2Array.length; i++){
        if(npc2Array[i].y > CANVAS_HEIGHT){
        checkLose();
        npc2Create(i);
        }
    }

    
    //3rd row booger animation
    npc3Array.forEach(npc => {
        npc.update();
        npc.draw();
    });
    for (let i = 0; i<npc3Array.length; i++){
        if(npc3Array[i].y > CANVAS_HEIGHT){
        checkLose();
        npc3Create(i);
        }
    }

    
    //4th row booger animation
    npc4Array.forEach(npc => {
        npc.update();
        npc.draw();
    });
    for (let i = 0; i<npc4Array.length; i++){
        if(npc4Array[i].y > CANVAS_HEIGHT){
        checkLose();
        npc4Create(i);
        }
    }

    
    requestAnimationFrame(animate);
}

function npc1Create(i) {
    npc1Array.splice(i, 1);
    npc1Array.push(new npc());
    npc1Array[npc1Array.length-1].x =(CANVAS_WIDTH/4 * 0)+10; 
}

function npc2Create(i) {
    npc2Array.splice(i, 1);
    npc2Array.push(new npc());
    npc2Array[npc2Array.length-1].x =(CANVAS_WIDTH/4 * 1)+10; 
}

function npc3Create(i) {
    npc3Array.splice(i, 1);
    npc3Array.push(new npc());
    npc3Array[npc3Array.length-1].x =(CANVAS_WIDTH/4 * 2)+10; 
}

function npc4Create(i) {
    npc4Array.splice(i, 1);
    npc4Array.push(new npc());
    npc4Array[npc4Array.length-1].x =(CANVAS_WIDTH/4 * 3)+10; 
}


animate();

canvas.addEventListener('click', function(event) {
const rect = canvas.getBoundingClientRect();
const canvasX = event.clientX - rect.left;
const canvasY = event.clientY - rect.top*1.4;
  
  const clickX = event.clientX;
  const clickY = event.clientY;

  npc1Array.forEach((npc, index) => {
    if (canvasX > npc.x && canvasX < npc.x + npc.width && canvasY > npc.y - npc.height && canvasY < npc.y) {
        sound1.play();
        npc1Array.splice(index, 1);
        npc1Create(index);
        scoreUpdate();
    }
  });
  
  npc2Array.forEach((npc, index) => {
    if (canvasX > npc.x && canvasX < npc.x + npc.width && canvasY > npc.y - npc.height && canvasY < npc.y) {
        sound2.play();
        npc2Array.splice(index, 1);
        npc2Create(index);
        scoreUpdate();
    }
  });
  
  npc3Array.forEach((npc, index) => {
    if (canvasX > npc.x && canvasX < npc.x + npc.width && canvasY > npc.y - npc.height && canvasY < npc.y) {
        sound1.play();
        npc3Array.splice(index, 1);
      npc3Create(index);
      scoreUpdate();
    }
  });
  
  npc4Array.forEach((npc, index) => {
    if (canvasX > npc.x && canvasX < npc.x + npc.width && canvasY > npc.y - npc.height && canvasY < npc.y) {
        sound3.play();
        npc4Array.splice(index, 1);
      npc4Create(index);
      scoreUpdate();
    }
  });
});

function scoreUpdate(){
    if(goodCount == 0){
        goodCount = 1;
    }
    scoreCount.innerHTML = 'Score: ' + goodCount++;
}

function checkLose(){
    lives--;
    if(lives == 0){
        location.href="lose.html";
    }
    livesElement.innerHTML = 'lives: ' + lives;
}


function pooStain(npc) {
    const fadeDuration = 2000; // fade duration in milliseconds
    let img = new Image();
    img.src = 'images/pooStain.png';
    cxt.drawImage(img, npc.x, npc.y, npc.width, npc.height);
    
    // fade out image
    let start = new Date().getTime();
    let fadeOut = setInterval(() => {
      let now = new Date().getTime();
      let elapsed = now - start;
      let progress = elapsed / fadeDuration;
      cxt.globalAlpha = 1 - progress;
      cxt.drawImage(img, npc.x, npc.y, npc.width, npc.height);
      if (progress >= 1) {
        clearInterval(fadeOut);
        cxt.globalAlpha = 1;
      }
    }, 20);
  }