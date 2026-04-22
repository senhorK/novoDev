



class Particulas {
   constructor(x,y) {
      this.x = x; 
      this.y = y;
      //this.vx = (Math.random() + 5) * 1;
      this.vx = Math.random() * 4 + 2;
      this.vy = (Math.random() - 0.5) * 2;
      this.life = 30;
      this.opacite = 1;
      this.size = Math.random() * 5;
   }
   
   
   update(){
      this.x -= this.vx;
      this.y += this.vy;
      this.vy += 0.05;
      
      this.life--;
      this.opacite = this.life/30;
   }
   
   draw(){
      ctx.save()
         
         ctx.globalAlpha = this.opacite;
         ctx.beginPath()
         ctx.fillStyle = "#E400FF";
         ctx.fillRect(this.x, this.y, this.size,this.size);    
         
      ctx.restore()
   }
   
   
}
class Part {
   constructor() {this.ls = [];}
   
   add(x,y){
      for (var i = 0; i < 2; i++) {
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





const colisoes ={
   
   colidPlayerEspinho() {
        ////colisão player e espinhos
        const colidLs = ["spike", "spikeTop"]
        const objPlayer = {
          x: player.x,
          y: player.y,
          w: player.size,
          h: player.size
        }
        
    
        const colidSpike = obstaculos.find(obs => {
          if (!colidLs.includes(obs.type)) return;
          
          return Colid(objPlayer, obs);
        })
        
        if (colidSpike) { game.newGame() }
   },
   colidLateral() {
       const tipos = ["platform", "coluna", "block"]
       const nextBoxX = {
         x: player.x + player.size,
         y: player.y,
         w: 4,
         h: player.size
       };
      
       const colidR = obstaculos.find(obs => {
         if(tipos.includes(obs.type)) {
            const sideLeft = { x: obs.x, y: obs.y, w: 4, h: obs.h };
            return Colid(nextBoxX, sideLeft);
         }
            
            return;
          });
          
          
        if (colidR) game.newGame();
    },
   colidMoedas() {
      const nextBox = {
        x: player.x + player.size,
        y: player.y,
        w: player.size,
        h: player.size
      };
      
      
      const index = obstaculos.findIndex(obs => obs.type === "moeda" && Colid(obs, nextBox));
      
      if (index !== -1) {
        obstaculos.splice(index, 1);
        somMoeda1()
      }
    }

  
  
}




const control ={
      jump: false
}
var scale = 1;
var lar = window.innerWidth;
var alt = window.innerWidth;


var lay;
var ctx;
var mundo;
var obstaculos;
var player;
var part;


const som1 = new Audio();
      som1.src ="./som/jump1.mp3"
      
      










class Game {
  constructor() {
    this.status = "nexLevel";
    this.p = document.querySelector("#p1")
    this.levelUp = document.querySelector(".level-complete-overlay")
    this.init()
  }
  
  newGame(){
    mundo  = new Mundo();
    //obstaculos = FaseTeste();
   // obstaculos = oterro()
    //obstaculos = tribunalDoCaos()
    //obstaculos = sofrimento_Sangrento()
    //obstaculos = espinhos_Sangrentos()
    //obstaculos = gargataColosal()
    //obstaculos = sofrimentoSupremo();
    //obstaculos = tunel();
    obstaculos = na_Maciota();
    const typ = ["platform", "coluna", "block"]
   
    obstaculos.forEach(obs => {
      if (typ.includes(obs.type)) {
        mundo.colid.push(obs);
      }
    });
    
    
    player = new Player();
    part   = new Part();
    
  }
  
  
  
  update(){
    mundo.update();
    
    for (let i = obstaculos.length-1; i >= 0; i--) {
        var obs = obstaculos[i];
        
        obs.update()
        if(obs.x + obs.w < 0) obstaculos.splice(i, 1)
    }
    player.update();
    
    
    
    
    
    colisoes.colidPlayerEspinho();
    colisoes.colidLateral();
    colisoes.colidMoedas()
    
  }
  
  
  jogando(){
    
     mundo.draw();
     obstaculos.forEach(obs => {obs.draw();});
     player.draw();
     part.add(player.x, player.y+(player.size-2))
     part.part()
     
     if(obstaculos.length <= 0){
       this.status = "nexLevel"
       //this.levelUp.classList.add("")
     }
  } 
  
  draw(){
    ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height)
    mundo.draw();
    
    if(this.status === "nexLevel"){
      this.levelUp.classList.add("ativo")
    }
    else 
    if(this.status === "jogando"){
      this.jogando()
    }
    
    
     //if(obstaculos.length > 0) this.jogando();
     //else mundo.draw();
     
     
  }
  
  dbug(){
    this.p.innerHTML = `
    control jump: ${control.jump} <br>
    vy: ${player.vy} <br>
    onGround: ${player.onGround} <br>
    colidBase: ${JSON.stringify(player.colidBase)} <br>
    rotation: ${player.rotation}
    `
  }
  
  loop = ()=>{
    this.update()
    this.draw()
    
    //this.dbug()
    window.requestAnimationFrame(this.loop)
  }
  
  
  init(){
    lay = document.querySelector(".lay");
    ctx = document.querySelector("canvas").getContext("2d");
    
    
    if(/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      scale = 1;
      lar = window.innerWidth;
      alt = window.innerWidth;
      
      
      console.log("Celular");
    } else {
      scale = 0.8;
      lar = window.innerWidth;
      alt = window.innerHeight;
      console.log("PC");
    }
    
    
    lay.style.width  = lar+"px";
    lay.style.height = lar+"px";
    
    ctx.canvas.width = lar*scale;
    ctx.canvas.height = alt*scale;
    ctx.canvas.style.width = (lar*scale) + "px";
    ctx.canvas.style.height = (alt*scale) + "px";
    
        
    
    


    
    
    this.newGame()
    this.loop()
    
    //startTrilha()
     

    document.body.addEventListener("pointerdown", (e)=>{
      e.preventDefault()
      control.jump = true;
      
      
      //somPuloUooop()
      if (audio.state === "suspended") {
        audio.resume();
      }
    })
     
     
    document.body.addEventListener("pointerup", ()=>{
      control.jump = false;
    })
    
    this.levelUp.addEventListener("click", (e)=>{
        const btn = e.target.closest("button");
        if(!btn) return;
        
        const nome = btn.innerText;
        if(nome === "NEXT LEVEL"){
          this.status = "jogando";
          this.levelUp.classList.remove("ativo")
          this.newGame()
        }
    })
  }
}
som1.onload = ()=>{console.log("som carregado")}
const game = new Game()




