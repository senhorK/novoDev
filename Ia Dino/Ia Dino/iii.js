

class Img {
  
   static load(){
          Img.m = new Image();
          Img.m.src = "/img/200-offline-sprite.png";
   }
   
  static getImg(){
    return Img.m;
  }
  
  static draw(image, x, y, w, h){
         ctx.drawImage(Img.getImg(),image.x, image.y, image.w ,image.h, x, y,  w, h );
  }
  
}







/**********Plata forma*************/
class ObjPlataForma {
  constructor(px) {
     this.x = px;
     this.y = 200;
     this.w = 1400;
     this.h = 25;
   
  }
  
  
  draw(){
    Img.draw(FLOOR, this.x, this.y, this.w,this.h);
  }
  
  update(){
    this.x -= DELTA;
    if(this.x + this.w <= 0) this.x = this.w;
  }
}

class Plata {
  constructor() {
    this.l1 = new ObjPlataForma(0);
    this.l2 = new ObjPlataForma(1400);
  }
  
  
  draw(){
    this.l1.draw();
    this.l2.draw();
  }
  
  update(){
    this.l1.update();
    this.l2.update();
  }
}
/**********Plata forma*************/
/**********Cria Cacto**************/

class Cacto {
  constructor() {
    this.x = lar-50;
    this.y = 170; 
    this.w = 40;
    this.h = 60;
    this.img = BCAC1;
  }
  
  draw(){
     
     Img.draw(this.img, this.x, this.y, this.w,this.h);
     
     
  }
  
  update(){
    this.x -= DELTA;
    var r = lar-100;
    if(this.x + this.w <= 0) this.x = r + Math.floor(Math.random() * 100);
    //return this.x <-this.w;
  }
  
  colisao(e){
    const obj = {x: this.x,
                y: this.y, 
                w: this.w, 
                h: this.h
    }
    
    if(Colid(e, obj)){
      e.kill(e.y);
    }
    
    return !e.vivo;
  }
}








/**********Cria Cacto**************/
/**********Nex Geração**************/
class Geracao
{
  constructor(players)
  {
    this.generation = 1;
    this.SURVIVORS = SURVIVOR_RATE * POPULACAO;
    this.players = players;
  }

  kill(a)
  {
    if (a)
      console.log(this.players);
    this.players.sort(function(a, b) { return b.meters - a.meters });
    if (a)
      console.log(this.players);
    for (let i = 0; i < POPULACAO - this.SURVIVORS; i++)
    {
      this.players.pop();
    }
    if (a)
      console.log(this.players);
  }


  procreate()
  {
    let baby = new Play();
    let brain = new Brain();
    let father = this.players[Math.floor(Math.random() * this.SURVIVORS)];
    let mother = this.players[Math.floor(Math.random() * this.SURVIVORS)];
    brain.weightX = Math.random() > 0.5 ? father.ia.weightX : mother.ia.weightX;
    brain.weightY = Math.random() > 0.5 ? father.ia.weightY : mother.ia.weightY;
    baby.brain = this.mutate(brain);
    this.players.push(baby);
  }

  mutate(brain)
  {
    if (Math.random() < MUTATION_RATE)
    {
      brain.mutate();
    }
    return brain;
  }

  
  nextGeneration(a = false)
  {
    this.kill(a);
    for (let i = this.SURVIVORS; i < POPULACAO; i++)
    {
      this.procreate();
    }
    this.players.forEach((e) => e.reset());
    this.generation++;
    /*
    * weightX: 0.004861720926817647
      we ightY: 0.0039266401669850026*/
  }
}




/*class Geracao {
  constructor(playes) {
    this.geracao = 1;
    this.servivos = SERVIVOR * POPULACAO;
    this.playes = playes;
  }
  
  kill(a){
    if(a)
      console.log(this.playes);
      this.playes.sort(function(a,b){return b.meters - a.meters;});
    if(a)
      console.log(this.playes);
    
    for(let i = 0; i < POPULACAO-this.servivos; i++){
      this.playes.pop();
    }
    
    if(a) console.log(this.playes);
  }
  
  
  
  
  
  proCreate(){
    
    
    
    
    let baby = new Play();
    let brain = new Brain();
    let father = this.playes[Math.floor(Math.random() * this.servivos)];
    let mother = this.playes[Math.floor(Math.random() * this.servivos)];
    brain.weightX = Math.random() > 0.5 ? father.brain.weightX : mother.brain.weightX;
    brain.weightY = Math.random() > 0.5 ? father.brain.weightY : mother.brain.weightY;
    baby.brain = this.mutate(brain);
    this.playes.push(baby);
    
  }
  
  
  mutate(brain) {
    if (Math.random() < SERVIVOR)
    {
      brain.mutate();
    }
    return brain;
  }
  
  
  nexGeracao(a = false){
     this.kill(a);
     
     for(let i = this.servivos; i < POPULACAO; i++){
       this.proCreate();
     }
     
     this.playes.forEach((e) =>{
       e.reset();
     })
     
     this.geracao++;
  }
  
  
  
  
  
}*/
/**********Nex Geração**************/






/***********Player***************/
class Play{
  constructor(){
    
    this.spriteList = [DINO3, DINO4]; 
    this.reset();
    this.ia = new Brain();
  }
  
  
  reset(){
    this.x = 10;
    this.y = 50;
    this.w = 50;
    this.h = 50;
    this.vy = 0;
    this.gravity = 1;
    this.jump    = false;
    this.isgraud = true;
    this.isDuck  = false;
    this.vivo    = true;
    this.metros  = 0;
    this.frame   = 0;
    this.timeF   = 5;
  }
  
  
  pula(){
    if(!this.jump) this.vy -= 18;
  }
  
  dow(){
    this.isDuck = true;
  }
  
  
  draw(){
    if(this.vivo){
       Img.draw(this.spriteList[this.frame], this.x,this.y,this.w,this.h);
    
      
    }
  }
  
  update(){
    this.y  += this.vy;
    this.vy += this.gravity;
    
    
    if(this.y + this.w >= 220){
      this.vy = 0;
      this.jump = false;
    }
    else this.jump = true;
    
    
    this.timeF--;
    if(this.timeF <= 0){
      this.frame++;
      this.timeF = 5;
      
      if(this.frame >= this.spriteList.length) this.frame = 0;
    }
  }
  
  think(enemy){
    this.metros++;
    let o = this.ia.getOutput(this,enemy);
    p1.innerHTML = "Neoral" + o;
    
    switch (o) {
      case 1: this.pula();
              break;
    }
    
  }
  
  
  
  kill(y){
    this.vivo = false;
    this.y = y;
    vivos -= 1;
  }
  
}
/***********Player***************/

















var ctx = document.querySelector("canvas").getContext("2d");
var lar = 400;
var alt = 300;
ctx.canvas.width  = lar;
ctx.canvas.height = alt;

/*******const******/
const POPULACAO = 50;
const SERVIVOR  = 0.5;
const MUTATION_RATE = 0.5;
const SURVIVOR_RATE = 0.1;
const STEP_SIZE = 0.01;



const CLOUD={x: 165, y:0, w:95, h:30};
const DINO={x: 74, y:0, w:90, h:95};
const DINO1={x: 1678, y:0, w:88, h:95};
const DINO2={x: 1766, y:0, w:88, h:95};
const DINO3={x: 1854, y:0, w:88, h:95};
const DINO4={x: 1942, y:0, w:88, h:95};
const DINO5={x: 2030, y:0, w:88, h:95};
const FLOOR={x: 1, y:105, w:2400, h:25};
const BCAC1={x: 650, y:0, w:52, h:100};
var DELTA = 4;
/*******const******/
var vivos = POPULACAO;





class Game {
  constructor() {
    this.gameOver = false;
    this.playes   = [];
    vivos = POPULACAO;
    this.time = 50;
    
    this.newGame();
    document.addEventListener("touchstart", ()=>{
      this.playes[0].pula();
    })
  }
  
  
  newGame(){
    
    
    for(let i = 0; i< POPULACAO; i++){
        this.playes.push(new Play());
    }
    
    
    this.groud     = new Plata();
    //this.fabricaC  = new fabricaCa();
    this.cacto     = new Cacto();
    this.family    = new Geracao(this.playes);
  }
  
  reset(a = false){
    this.gameOver = true;
    this.family.nextGeneration(a);
    this.cacto    = new Cacto();
    this.groud    = new Plata();
    vivos         = 50;
    DELTA         = 4;
    
   /* this.playes.forEach((e) =>{
      e.reset();
   })*/
    this.gameOver = false;
  }
  
  
  
  draw(){
     ctx.clearRect(0, 0,lar, alt);
     this.groud.draw();
     this.cacto.draw();
  }
  
  update(){
    
    this.playes.forEach((e) =>{
       if(e.vivo){
           e.think(this.cacto);
           this.cacto.colisao(e);
           e.draw();
           e.update();
       }
        
       if(vivos === 0) this.reset();
    });
    
    
   this.groud.update();
   this.cacto.update();
   
   
   this.time--;
   if (this.time <= 0) {
     DELTA += .1;
     this.time = 50;
   }
  }
  
  loop(){
    if(!this.gameOver){
        this.draw();
        this.update();
        
        p1.innerHTML = `x: 0  <br> y: 0 <br>
                        população:${POPULACAO}<br>
                        vivos: ${vivos} <br>
                        Delta_time: ${DELTA} <br>
                        
                        `;
  
    }   
  }
}


Img.load();
var game = new Game();

init = function(){
     game.loop();
     window.requestAnimationFrame(init);
}

window.onload = ()=>{init();}




