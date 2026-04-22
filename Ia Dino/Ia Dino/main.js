



class Carcara {
  constructor() {
    this.nome = "Carcara";
    this.x = lar+100;
    this.y = alt-200;
    this.w = 52;
    this.h = 31;
    this.carc1 = {x: 260, y: 14, w: 91, h: 68}
    this.carc2 = {x: 353, y: 2, w: 91, h: 60}
    this.sprite = [this.carc1,this.carc2];
    this.frame  = 0;
    this.time   = 7;
  }
  
  draw(){
    Img.draw(this.sprite[this.frame], this.x,this.y, this.w,this.h);
  }
  
  update(){
    this.x -= delta*2;
    if(this.x + this.w <= 0)
      this.x = lar + Math.floor(Math.random() * 1400);
    
    this.time--;
    if(this.time <= 0){
      this.frame++;
      this.time = 7;
      if(this.frame >= this.sprite.length) this.frame = 0;
    }
    
    
  }
  
  Colid(e){
    if(Colid(e, this)){
      e.kill(e.y);
    }
  }
}





cenario = function(){
  ctx.fillStyle = "#70A9FF";
  ctx.fillRect(0, 0, lar, alt-100);
  
  ctx.fillStyle = "#9C8351";
  ctx.fillRect(0, alt-108, lar,150);
  
  
}








/*************************/
var ctx = document.querySelector("canvas").getContext("2d");
var lar = window.innerWidth;
var alt = 300;
      ctx.canvas.width  = lar;
      ctx.canvas.height = alt;
var   delta = 2;
var   aceleracao = .1;
var   tm         = 10;
var POPULACAO = 100;
var VIVOS     = POPULACAO;





class Game {
  constructor() {
    this.gameOver = false;
    this.player   = [];
    this.color   = "#222"
    this.newGame();
    
  }
  
  
  newGame(){
    
    this.nuven   = new NuvenMae();
    this.carcara = new Carcara();
    this.chao    = new ChaoMae();
    this.cacto   = new Cacto();
   
    for (var i = 0; i < POPULACAO; i++) {
      this.player.push(new Play());
    }
    
    this.family = new Geracao(this.player);
    console.log(this.family);
    
    
    
    document.addEventListener("touchstart", ()=>{
      this.player[0].JUMP();
    })
  }
  
  reset(a = false){
    this.gameOver = true;
    this.nuven    = new NuvenMae();
    this.carcara = new Carcara();
    this.chao     = new ChaoMae();
    this.cacto    = new Cacto();
    this.family.nextGeneration(a);
    VIVOS = POPULACAO;
    delta = 2;
    aceleracao = .01;
    this.gameOver = false;
  }
  
  
 
  
  draw(){
    
    
    cenario();
    
    this.nuven.draw();
    this.carcara.draw();
    this.chao.draw();
    this.cacto.draw();
    //this.my.draw();
    
    this.player.forEach((e) =>{
       e.draw();
    });
  }
  
  update(){
    this.nuven.update();
    this.carcara.update();
    this.chao.update();
    this.cacto.update();
   // this.my.update();
    
    this.player.forEach((e) => {
      if(e.vivo){
        e.decidir(this.cacto);
        //e.decidir(this.carcara);
        this.cacto.Colid(e);
       // this.carcara.Colid(e);
        e.update();
        
    
      }
      else e.x -= delta;
      
    });
    
    
    if(VIVOS === 0) {
      
      this.reset();
    }
    
    
    tm--; 
    if(tm <= 0){
      //delta += aceleracao;
      //aceleracao += 0.001;
      if(aceleracao >= 0.1){
      //  aceleracao = 0.1;
       // this.color = "#000"
      }
      tm = 10;
    }
    
    
  }
  
  loop(){
    if(!this.gameOver){
      this.draw();
      this.update();
      
      
      bug.innerHTML = `POPULACAO: ${POPULACAO} <br> y: ${this.player[0].y} <br>
                      Vivos: ${VIVOS} <br>
                      
                      x: ${this.player[0].x} <br>
                      y: ${this.player[0].y} <br>
                      jump: ${this.player[0].bjump}<br>
                      neoronio: ${this.player[0].ne} <br>
                      aceleração: ${aceleracao}
                      `
      
    }
  }
}




Img.load();
var game = new Game();

loop = function(){
  game.loop();
  window.requestAnimationFrame(loop);
}

loop();



