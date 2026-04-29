




class Colisoes {
  constructor() {
    
  }
  
  Colid(rect1, rect2) {
      return (
        rect1.x + rect1.w > rect2.x &&
        rect1.x < rect2.x + rect2.w &&
        rect1.y + rect1.h > rect2.y &&
        rect1.y < rect2.y + rect2.h);
    }

   balaEnemy(balas, eny){
    for(let i = balas.length - 1; i >= 0; i--) {
        let bala = balas[i];
  
        for (let j = eny.length - 1; j >= 0; j--) {
          let enemy = eny[j];
          
          if (this.Colid(bala, enemy)) {
            // remove bala
            balas.splice(i, 1);
            somLataria();
            // remove inimigo
               enemy.life -= 10;
               if(enemy.life <= 0){
                 player.score+= 100;
                 part.add(enemy.x,enemy.y, "#f00")
                 somExplosaoPesada();
                 eny.splice(j, 1);
                 
                 if(Inimigos.length <= 0){
                   main.idxF++;
                   status.modo = "vinheta"
                 }
               }
               break;
          }
        }
    }

  }

   playerEnemy(mi, inimy) {
      if (!mi.vivo) return;
        
      for(let i = 0; i < inimy.length; i++) {
          let enemy = inimy[i];
          
          if (this.Colid(mi, enemy)) {
            mi.life -= 1;
            
            if(mi.life <= 0) {
              mi.vivo = false;
              
              part.add(mi.x, mi.y, "#f00");
              somExplosaoPesada();
              status.modo = "menu";
              main.menu.classList.add("ativo")
              break;
            }
          }
        }
  }
}
const status ={
      modo: "menu",
      draw(mi){
        app.draw.text({ctx,txt: `life: ${mi.life}`,x: 20, y: 20,font: "20px Arial",cor: "#fff"});   
        app.draw.text({ctx,txt: `score: ${mi.score}`,x: 100, y: 20,font: "20px Arial",cor: "#fff"});   
        app.draw.text({ctx,txt: `enemy: ${Inimigos.length}`,x: 250, y: 20,font: "20px Arial",cor: "#fff"});   

      }
}
const vinheta ={
  time: 180,
  draw(nome, fase){
    vinheta.time--;
    
    if(vinheta.time <= 0) {
       status.modo = "jogando";
       vinheta.time = 180;
       main.newGame();
    }
    
    ctx.clearRect(0, 0, lar, alt);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    app.draw.text({ ctx, txt: fase, x: lar / 2, y: alt / 2 - 40, cor: "#888", font: "20px Arial" });
    app.draw.text({ ctx, txt: nome, x: lar / 2, y: alt / 2 + 10, cor: "#fff", font: "40px Arial" });
    ctx.textAlign = "start";
    ctx.textBaseline = "alphabetic";
  }
}


var lar = window.innerWidth;
var alt = window.innerHeight;
var ctx;



const stick1 = new Joystick({ className: "Stage1", dbug: false })
const stick2 = new Joystick({ className: "Stage2", dbug: false })
      //stick1.visible = false;
      //stick2.visible = false;

var mundo;
var player;
var camera;
//var addDrado;
var colisao;
var part;
var Inimigos;


class Main{
  constructor() {
    this.menu = document.querySelector(".menu");
    
    this.idxF = 0;
    this.Danges =[];
    this.init();
    
    
    
    
  }
  
  newGame(){
    mundo = new Mundo()
    player = new Player()
    app.camera.follow(player)
    app.camera.limites = true;
    
    //this.Danges = [fase1(),fase2(),fase3(),fase4(),faseInsana()]
    this.Danges = [fase1(), fase2(),fase3(),fase4(),fase5(), bossStage()];

    Inimigos    = this.Danges[this.idxF].enemies;
    
    part    = new Part();
    colisao = new Colisoes();
  }
  draw(){
     ctx.clearRect(0,0,lar,alt)
    
     app.camera.begin(ctx);
     mundo.draw()
     app.draw.rect({ctx,x: 100, y: 100, w: 30, h: 30, cor: "#f00"})
     
     for(let e of Inimigos) {e.draw()}

     player.draw();
     part.part()
     
     
          
     
     app.camera.end(ctx)
     
     player.drawLife();
     
     
     status.draw(player)
  }
  update(){
    player.update()
    app.camera.update(ctx)

    for(let e of Inimigos) {e.update()}
    
     
    colisao.balaEnemy(player.balas, Inimigos) 
    colisao.playerEnemy(player, Inimigos);
  }
  loop = ()=>{
    
    if(status.modo === "jogando"){
       this.update();
       this.draw();
    }
    else 
    if(status.modo === "vinheta") {
        let ii = this.Danges[this.idxF];
        vinheta.draw(ii.nome, ii.fase);
        
      }
    
    window.requestAnimationFrame(this.loop);    
  }
  
  init(){
    ctx = document.querySelector("canvas").getContext("2d");    
    ctx.canvas.width  = lar;
    ctx.canvas.height = alt;
    ctx.canvas.style.width  = lar +"px";
    ctx.canvas.style.height = alt +"px";
 
 

    
    
    this.newGame()
    this.loop()
    
    
    
    this.menu.addEventListener("click", (e)=>{
       const p = e.target.closest("p");
       if(!p) return;
       
       somLataria()
    })
    this.menu.addEventListener("dblclick", (e) => {
      const p = e.target.closest("p");
      if (!p) return;
      
      this.menu.classList.remove("ativo");
      status.modo = "vinheta";
      this.newGame();
    })
    
  
  }
  
}


const main = new Main();






