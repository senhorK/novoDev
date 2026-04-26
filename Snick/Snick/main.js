

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
var SNAKES;



class Game {
  constructor() {
    this.menu   = document.querySelector(".menu")
    this.status = "menu";
    this.init()
  }
  
  newGame(){
    mundo      = new Mundo();
    comida     = new Comida();
    camera     = new Camera();
    SNAKES    = new AddSnike(10);
    camera.follow(SNAKES.snake[0]);
  }
  
  
  
  miComida(){
    if(SNAKES.snake[0].modo != "but"){
      let obj = SNAKES.snake[0];
      
      const index   = comida.ls.findIndex(obs =>  Colid(obs, obj));
      if(index !== -1) {
        comida.ls.splice(index, 1);
        obj.tamanho++;
        somPuloUooop()
      }
    }
  }
  Ia_Snike(){
    //Updete Bots
    for(let bot of SNAKES.bots) {bot.update();}
    //Update Snick 
    for(let snake of SNAKES.snake) {snake.update();}
    // Colisão entre Snick 
    for(let i = SNAKES.snake.length - 1; i >= 0; i--){
        let snake = SNAKES.snake[i];
        
        if(snake.checkCollision(SNAKES.snake)){
            if(snake.modo === "player"){
               this.status = "menu";
               this.menu.classList.add("ativo")
            }
            
            else SNAKES.snake.splice(i, 1);
        }
        
        
        
        
        
        
    }

  }
  
  
  update(){
    comida.update();
    camera.update();
    
    this.miComida();  
    this.Ia_Snike();
    
        
    
    dbug.innerHTML =`
      camX: ${camera.x} <br>
      camY: ${camera.y}
    `
  }
  
  
  
  
  
  draw(){
    ctx.clearRect(0,0,lar, alt)
  
    camera.begin();
         ctx.fillStyle = "#f00"
         ctx.fillRect(100, 100, 50, 50)
         mundo.draw();
         comida.draw();
         
         for (let snake of SNAKES.snake) { snake.draw(); }
    camera.end()
        
  }
  loop = ()=>{
    if(this.status === "jogando"){
       this.update();
       this.draw();
    }
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
   
    
    this.menu.addEventListener("click", (e)=>{
        const btn = e.target.closest("p");
        if(!btn) return;
        
        if(btn.id === "btnPlay"){
          this.status = "jogando";
          this.menu.classList.remove("ativo")
          btnPlay.innerHTML = "▶ newGame"
          
          this.newGame()
        }
    })
  }
}




const game = new Game(); 