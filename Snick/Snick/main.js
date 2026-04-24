

function Colid(rect1, rect2) {
  return (
  rect1.x + rect1.w > rect2.x &&
  rect1.x < rect2.x + rect2.w &&
  rect1.y + rect1.h > rect2.y &&
  rect1.y < rect2.y + rect2.h);
}







var dbug = document.querySelector(".dbug");
var ctx = document.querySelector("canvas").getContext("2d");    
var lar;
var alt;


var mundo;
var snick;
var groud;
var comida;
var camera;
class Game {
  constructor() {
    
    
    this.init()
  }
  
  newGame(){
    mundo  = new Mundo();
    //snick  = new Snick(100,100,"player");
    comida = new Comida();
    camera = new Camera();
    camera.follow(snakes[0]);
    
    
  }
  
  
  update(){
    //snick.update();
    comida.update();
    camera.update();
    
    /*const player = snakes.find(s => s.modo === "player");
    
    if(player) {const index = comida.ls.findIndex(food => Colid(food, player));
    if(index !== -1) {
    comida.ls.splice(index, 1);
    player.tamanho++;
    somPuloUooop();
  }
}*/
    if(snakes[0].modo != "but"){
      let obj = snakes[0];
      
      const index   = comida.ls.findIndex(obs =>  Colid(obs, obj));
      if (index !== -1) {
        comida.ls.splice(index, 1);
        obj.tamanho++;
        somPuloUooop()
      }
    }
    
    /*const psSnick = {
      x: snick.x,
      y: snick.y,
      w: snick.size,
      h: snick.size
    }*/
   /* const index   = comida.ls.findIndex(obs =>  Colid(obs, psSnick));
    
    if(index !== -1) {
       comida.ls.splice(index, 1);
       snick.tamanho++;
       somPuloUooop()
    }*/
    
    for(let bot of bots) {bot.update();}
    for(let snake of snakes) {snake.update();}
    
    for(let i = snakes.length - 1; i >= 0; i--) {
        let snake = snakes[i];
        
        
        if(snake.checkCollision(snakes)) {
            snakes.splice(i, 1);
        }
        
        //mi
        /*if(snick.checkCollision(snakes)) {
          console.log("player morreu 💀");
        }*/
        
        
        
        
        
    }

    dbug.innerHTML =`
      camX: ${camera.x} <br>
      camY: ${camera.y}
    `
  }
  draw(){
    ctx.fillStyle = "#0000004A";
    ctx.fillRect(0,0,lar,alt);
    
  
    camera.begin();
        ctx.fillStyle = "#f00"
        ctx.fillRect(100, 100, 50, 50)
        mundo.draw();
        comida.draw();
        //snick.draw()
        
        
        
        for(let snake of snakes) { snake.draw();}
    camera.end()
    
  }
  loop = ()=>{
    this.update();
    this.draw();
    
    window.requestAnimationFrame(this.loop)
  }
  
  
  
  init(){
     lar = window.innerWidth;
     alt = window.innerHeight;
     ctx.canvas.width = lar;
     ctx.canvas.height = alt;
     ctx.canvas.style.width = lar + "px";
     ctx.canvas.style.height = alt + "px";   
    
    
    this.newGame();
    this.loop()
   
   
  }
}




const game = new Game(); 