

function Colid(rect1, rect2) {
  return (
  rect1.x + rect1.w > rect2.x &&
  rect1.x < rect2.x + rect2.w &&
  rect1.y + rect1.h > rect2.y &&
  rect1.y < rect2.y + rect2.h);
}
class Particulas {
   constructor(x,y) {
      this.x = x; 
      this.y = y;
      this.vx = Math.random() * 4 - 2;
      this.vy = Math.random() * 4 - 2;
      this.life = 30;
      this.opacite = 1;
      this.size = Math.random() * 10;
   
   }
   
   
   update(){
      this.x += this.vx;
      this.y += this.vy;
     // this.vy += 0.05;
      
      this.life--;
      this.opacite = this.life/30;
     
   }
   
   draw(){
      ctx.save()
         
         ctx.globalAlpha = this.opacite;
         ctx.beginPath()
         ctx.fillStyle = "#E400FF";
        
         ctx.arc(this.x,this.y , this.size/2, 0, Math.PI*2);
         ctx.fill()
      ctx.restore()
   }
   
   
}
class Part {
   constructor() {
     this.ls = [];
     this.f  = false;
   }
   
   add(x,y){
      for (var i = 0; i < 20; i++) {
          this.ls.push(new Particulas(x,y));
      }
   }
   
   
   part() {
      for (let i = this.ls.length - 1; i >= 0; i--) {
        let p = this.ls[i];
        
        p.update();
        p.draw();
        
        if (p.life <= 0) {
          this.ls.splice(i, 1);
        }
      }
    }

   /*part(){
      this.ls.forEach((p,i) =>{
         p.update()
         p.draw()
         
         if(p.life <= 0) this.ls.splice(i,1)
      })
   }*/
}

class Scores {
  constructor(p,e) {
     this.miPontos   = p;
     this.totalEnemy = e;
     
  }
  
  
  draw() {
  ctx.fillStyle = "#fff";
  ctx.font = "20px Arial";
  
  ctx.fillText(`Pontos: ${this.miPontos}`, 20, 40);
  ctx.fillText(`Inimigos: ${this.totalEnemy}`, 20, 70);
  //ctx.fillText(`Kills: ${this.kills}`, 20, 100);
}
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
var scores;
var part;


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
    scores    = new Scores(0,0);
    part       = new Part();
    camera.follow(SNAKES.snake[0]);
    
    
    
  }
  
  
  
  miComida(){
    if(SNAKES.snake[0].modo != "but"){
      let obj = SNAKES.snake[0];
      
      const index   = comida.ls.findIndex(obs =>  Colid(obs, obj));
      if(index !== -1) {
        comida.ls.splice(index, 1);
        obj.tamanho++;
        
        part.add(obj.x,obj.y)
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
            
            else {
              SNAKES.snake.splice(i, 1);
              part.add(snake.x,snake.y)
            }
        }
        
        
        
        
        
        
    }

  }
  
  
  update(){
    comida.update();
    camera.update();
    
    this.miComida();  
    this.Ia_Snike();
    
    scores.miPontos = SNAKES.snake[0].tamanho;
    scores.totalEnemy = SNAKES.snake.length;  
    if(SNAKES.snake.length  <= 1){
      this.status = "menu";
      this.menu.classList.add("ativo")
    }
   /* dbug.innerHTML =`
      camX: ${camera.x} <br>
      camY: ${camera.y}
    `*/
  }
  
  
  
  
  
  draw(){
    ctx.clearRect(0,0,lar, alt)
    scores.draw()
    camera.begin();
         ctx.fillStyle = "#f00"
         ctx.fillRect(100, 100, 50, 50)
         mundo.draw();
         comida.draw();
         
         for (let snake of SNAKES.snake) { snake.draw(); }
         
         
         part.part()
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