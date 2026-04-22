








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
        
        if (colidSpike) {
          //game.newGame()
          game.status = "level"
          game.level.classList.add("ativo")
          }
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
          
          
        if (colidR){
          game.status = "level"
          game.level.classList.add("ativo")
          //game.newGame();
        }
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
    this.status = "home";
    this.p = document.querySelector("#p1")
    this.menu = document.querySelector(".menuHome")
    this.level = document.querySelector(".menuLevel")
    this.levelUp = document.querySelector(".level-complete-overlay")
    
    
    
    this.idxObs = 0;
    this.lsObs= []
    
    this.init()
  }
  
  newGame(){
    mundo  = new Mundo();
    this.lsObs = [
      na_Maciota(),
      FaseTeste(),
      oterro(),
      tribunalDoCaos(),
      sofrimento_Sangrento(),
      espinhos_Sangrentos(),
      gargataColosal(),
      sofrimentoSupremo(),
      tunel()
    ];
    
    
    
    
    
    
    obstaculos = this.lsObs[this.idxObs];
   // obstaculos = oterro()
    //obstaculos = tribunalDoCaos()
    //obstaculos = sofrimento_Sangrento()
    //obstaculos = espinhos_Sangrentos()
    //obstaculos = gargataColosal()
    //obstaculos = sofrimentoSupremo();
    //obstaculos = tunel();
    //obstaculos = this.lsObs[this.idxObs];
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
    if(this.status === "jogando"){
     
      for (let i = obstaculos.length-1; i >= 0; i--) {
          var obs = obstaculos[i];
          
          obs.update()
          if(obs.x + obs.w < 0) obstaculos.splice(i, 1)
      }
    
    
      player.update();
      colisoes.colidPlayerEspinho();
      colisoes.colidLateral();
      colisoes.colidMoedas()
      
      if(obstaculos.length <= 0){
        this.status = "nexLevel"
        this.levelUp.classList.add("ativo")
      }
    }
    
    this.p.innerHTML = this.status;
  }
  
  
  jogando(){
     obstaculos.forEach(obs => {obs.draw();});
     player.draw();
     part.add(player.x, player.y+(player.size-2))
     part.part()
     
     if(obstaculos.length <= 0){
       this.status = "nexLevel"
     }
  } 
  
  draw(){
    ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height)
    mundo.draw();
    
    if(this.status === "jogando"){
      this.jogando()
    }
    else  
    if(status.atual === "nexLevel"){
      
    }
    
    /*if(this.status === "home"){
      
    }
    else
    if(this.status === "nexLevel"){
      this.levelUp.classList.add("ativo")
    }
    else */
    
    
    
    /*if(this.status === "jogando"){
      this.jogando()
    }*/
    
    
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
    
    
    this.menu.addEventListener("click", (e)=>{
        const btn = e.target.closest("button");
        if(!btn) return;
        
        const nome  = btn.innerText;
        const dataX = e.target.dataset.x;
        
        if(dataX === "jogar"){
           this.status = "level"
           
           this.menu.classList.remove("ativo");
           this.level.classList.add("ativo");
           this.newGame();
        }
        
    })
    this.level.addEventListener("click", (e)=>{
       const to = e.target.closest(".item");
       if(!to) return;
       
       const nubem = to.querySelector(".numero").innerText;
       const lock  = to.querySelector(".status").innerText;
       
       console.log(`
         numero: ${nubem} 
         lock: ${lock}
       `)
       
       
       this.level.classList.remove("ativo")
       this.status = "jogando";
       this.idxObs = Number(nubem);
       this.newGame()
    })
    this.levelUp.addEventListener("click", (e)=>{
        const btn = e.target.closest("button");
        if(!btn) return;
        
        const nome = btn.innerText;
        if(nome === "NEXT LEVEL"){
          this.levelUp.classList.remove("ativo")
          this.status = "jogando"
          this.idxObs++;
          this.newGame();
        }
        else  
        if (nome === "HOME") {
          this.status = "home";
          this.levelUp.classList.remove("ativo")
          this.menu.classList.add("ativo")
          //this.newGame()
        }
    })
  
    
  }
}
som1.onload = ()=>{console.log("som carregado")}
const game = new Game()




