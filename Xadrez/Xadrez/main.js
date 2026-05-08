

class Tabuleiro{
  constructor() {
      this.li = 8;
      this.co = 8;
      this.size = 40;
      this.cell = null;
      this.selet = null;
      this.posivel = [];
      this.poite = [];
      this.casas =[];
      this.pecas = [];
      
      
      this.setup()
      
      
      
      
      
      this.init();
      
      this.draw();
      this.Event();
      
      
            
            
  }
  
  init(){
      this.lay   = document.querySelector(".lay");  
      this.box   = document.querySelector(".tabuleiro");  
      this.letras = document.querySelectorAll(".letras")
      this.layR  = this.lay.getBoundingClientRect();
      this.boxR  = this.box.getBoundingClientRect();
      this.ofset = this.boxR.x - this.layR.x;
      
      this.box.style.gridTemplateColumns = `repeat(8, ${this.size}px)`;
      this.box.style.gridTemplateRows    = `repeat(8, ${this.size}px)`;
      this.box.innerHTML = "";
      
      
  }
  
  addPeca(x,y, tipo, cor, src) {this.pecas.push({x,y, tipo, cor ,src});}
  setup() {
  // peões
  for (let x = 0; x < 8; x++) {
    //this.addPeca(x, 1, "peao", "preto", "./pedras/peaoPreto.svg");
    //this.addPeca(x, 6, "peao", "branco", "./pedras/peaoBranco.svg");
  }
  
  // cavalos
  let cavaloP = "./pedras/CavaloPreto.svg"
  let cavaloB = "./pedras/cavaloBranco.svg"
  this.addPeca(1, 0, "cavalo", "preto", cavaloP);
  this.addPeca(6, 0, "cavalo", "preto", cavaloP);
  
  this.addPeca(1, 7, "cavalo", "branco",cavaloB);
  this.addPeca(6, 7, "cavalo", "branco",cavaloB);
  
  this.addPeca(4, 0, "rei", "preto", "./pedras/reiPreto.svg");
  this.addPeca(4, 7, "rei", "branco", "./pedras/reiBranco.svg");
  
  this.addPeca(3, 0, "rainha", "preto", "./pedras/rainhaPreta.svg");
  this.addPeca(3, 7, "rainha", "branco", "./pedras/rainhaBranca.svg");
  
  this.addPeca(2,0, "bispo", "preto", "./pedras/bispoPreto.svg");
  this.addPeca(5,0, "bispo", "preto", "./pedras/bispoPreto.svg");
  
  this.addPeca(2,7, "bispo", "branco", "./pedras/bispoBranco.svg");
  this.addPeca(5,7, "bispo", "branco", "./pedras/bispoBranco.svg");

  this.addPeca(0,7, "torre", "branco", "./pedras/torreBranca.svg");
  this.addPeca(7,7, "torre", "branco", "./pedras/torreBranca.svg");

  this.addPeca(0,0, "torre", "preto", "./pedras/torrePreta.svg");
  this.addPeca(7,0, "torre", "preto", "./pedras/torrePreta.svg");

}
  
  draw(){
      
      for (let y = 0; y < this.co; y++) {
        this.casas[y] = [];
        for (let x = 0; x < this.li; x++) {
          
          const clas = (x + y) % 2 === 0;
          
          const casa = document.createElement("div");
                casa.dataset.y = y; 
                casa.dataset.x = x; 
                casa.className = clas ? "casaPreta" : "casaBranca";
          
                this.box.appendChild(casa);
                this.casas[y][x] = casa;
                
        }
     }
      
      

      // desenha peças
      this.pecas.forEach(p => {
        const img = document.createElement("img");
        img.src   = p.src;
        this.casas[p.y][p.x].appendChild(img);
      });
            
      

  }
  
  
  
  

  
  posBispo() {
      const x = this.selet.x;
      const y = this.selet.y;
      
      const direcoes = [
        { dx: 1, dy: 1 },
        { dx: -1, dy: 1 },
        { dx: 1, dy: -1 },
        { dx: -1, dy: -1 }
      ];
      
      this.posivel = [];
      
      for (let dir of direcoes) {
        for (let i = 1; i < 8; i++) {
          const nx = x + dir.dx * i;
          const ny = y + dir.dy * i;
          
          if (!this.isDentro({ x: nx, y: ny })) break;
          
          const alvo = this.getPeca(nx, ny);
          
          if (!alvo) {
            // casa livre
            this.posivel.push({ x: nx, y: ny });
          } else {
            // tem peça
            if (alvo.cor !== this.selet.cor) {
              // inimigo → pode capturar
              this.posivel.push({ x: nx, y: ny });
            }
            // parou (não passa por cima)
            break;
          }
        }
      }
      
      this.showPos();
    }
  posTorre(){
        const px = this.selet.x;
        const py = this.selet.y;
        
        
        const dir = [
          { x: 1, y: 0 },
          { x: -1, y: 0 },
          { x: 0, y: 1 },
          { x: 0, y: -1 }
        ]
        
        
        this.posivel = [];
        
        for (let d of dir) {
          let nx = px + d.x;
          let ny = py + d.y;
          
          
          while (this.isDentro({ x: nx, y: ny })) {
            
            const alvo = this.getPeca(nx, ny)
            
            
            
            
            if (!alvo) {
              this.posivel.push({ x: nx, y: ny })
            }
            else {
              if (alvo.cor !== this.selet.cor) {
                this.posivel.push({ x: nx, y: ny })
              }
              break;
            }
            
            nx += d.x;
            ny += d.y;
          }
          
          
        }
        
        
        this.showPos();
  }
  posCavalo(){
          const x = this.selet.x;
          const y = this.selet.y;
          
          const moves = [
            { x: x + 1, y: y + 2 },
            { x: x - 1, y: y + 2 },
            { x: x + 1, y: y - 2 },
            { x: x - 1, y: y - 2 },
            { x: x + 2, y: y + 1 },
            { x: x - 2, y: y + 1 },
            { x: x + 2, y: y - 1 },
            { x: x - 2, y: y - 1 }
          ];




          // 🔥 filtra só posições válidas
          //    verificar si e inimigo
         /* this.posivel = moves.filter(m => {
            if(!this.isDentro(m)) return false;
            
            const alvo = this.getPeca(m.x, m.y);
        
            return !alvo || alvo.cor !== this.selet.cor;
          });*/
          this.posivel = moves.filter(m => this.isCasaValida(m))



       
          this.showPos();
  }
  posRainha() {
      this.posivel = [];
      console.log("88888")
      this.posTorre();
      
      const torreMoves = [...this.posivel];
      
      this.posBispo();
      const bispoMoves = [...this.posivel];
      
      this.posivel = [...torreMoves, ...bispoMoves];
      
      this.showPos();
}
posRei() {}
  
  
  
  
  
  
  Event(){
    this.box.addEventListener("pointerdown", (e)=>{
      const casa = e.target.closest(".casaBranca,.casaPreta");
      if(!casa) return;
      
      const x = Number(casa.dataset.x);
      const y = Number(casa.dataset.y);
     
      
      const pos = {x,y};
      this.cell = pos;
      this.poite = [pos]
      
      
      const peca = this.getPeca(x, y);
      
      
      if(!this.selet && peca){
          this.selet = peca;
          
          if(this.selet.tipo === "cavalo") this.posCavalo()
          else 
          if(this.selet.tipo === "torre") this.posTorre()
          else 
          if(this.selet.tipo === "bispo") this.posBispo()
          else 
          if (this.selet.tipo === "rainha") this.posRainha()
            
          
            
            
            
             
          

      }

      
      
      
      
      else {
  
        const origen = { x: this.selet.x, y: this.selet.y };
        const destino = { x, y };
        
        const pode = this.posivel.some(p => p.x === x && p.y === y);
        
        if(pode) {
          
          let p = this.getPeca(origen.x, origen.y);
          if (!p) return;
          
          // 👉 remove peça da casa origem (DOM)
          this.casas[origen.y][origen.x].innerHTML = "";

          // 👉 captura (remove peça do destino da lista)
          this.pecas = this.pecas.filter(pe => !(pe.x === destino.x && pe.y === destino.y));
          
          // 👉 move peça (estado)
          p.x = destino.x;
          p.y = destino.y;
          
          // 👉 render no destino
          const casaDestino = this.casas[destino.y][destino.x];
          
          const novaImg = document.createElement("img");
          novaImg.src = p.src;
          
          casaDestino.innerHTML = "";
          casaDestino.appendChild(novaImg);
        }
        
        this.selet = null;
        this.posivel = [];
        this.hidePos();
      }
      
      
      
      
      
      
      
      
    })
    
    
    
    
    
    
    
  }
  isCasaValida(m) {
        if (!this.isDentro(m)) return false;
      
        const alvo = this.getPeca(m.x, m.y);
      
        if (!alvo) return true;
        if (alvo.cor !== this.selet.cor) return true;
      
        return false;
  }
  isDentro(p) {return p.x >= 0 && p.x < 8 && p.y >= 0 && p.y < 8;}
  getCasa(e) {
      const casa = e.target.closest("[data-x]");
      if (!casa) return null;
  
      return {
        x: Number(casa.dataset.x),
        y: Number(casa.dataset.y)
      };
    }
  getPeca(x, y) {return this.pecas.find(p => p.x === x && p.y === y);}
  showSelet() {
        const casas = this.box.querySelectorAll(".casaPreta, .casaBranca");
        const mapa = new Set(this.poite.map(p => `${p.x}-${p.y}`))
        
        casas.forEach(casa => {
          const key = `${casa.dataset.x}-${casa.dataset.y}`;
          casa.classList.toggle("ativo", mapa.has(key));
        });
  }
  hideSelet() {
        const casas = this.box.querySelectorAll(".casaPreta, .casaBranca");
        const mapa = new Set(this.poite.map(p => `${p.x}-${p.y}`))
        
        casas.forEach(casa => {
          const key = `${casa.dataset.x}-${casa.dataset.y}`;
          casa.classList.remove("ativo", mapa.has(key));
        });
  }
  
  showPos() {
        const casas = this.box.querySelectorAll(".casaPreta, .casaBranca");
        const mapa = new Set(this.posivel.map(p => `${p.x}-${p.y}`))
        
        casas.forEach(casa => {
          const key = `${casa.dataset.x}-${casa.dataset.y}`;
          casa.classList.toggle("ativo", mapa.has(key));
        });
  }
  hidePos() {
        const casas = this.box.querySelectorAll(".casaPreta, .casaBranca");
        const mapa = new Set(this.posivel.map(p => `${p.x}-${p.y}`))
        
        casas.forEach(casa => {
          const key = `${casa.dataset.x}-${casa.dataset.y}`;
          casa.classList.remove("ativo", mapa.has(key));
        });
  }
  
  
}


class Bug {
  constructor() {
    this.dbug = document.querySelector(".dbug")
  }
  
  show(tabuleiro){
    this.dbug.innerHTML = `
      cell: <pre>${JSON.stringify(tabuleiro.cell, null, 2)}</pre>     
      selet: <pre>${JSON.stringify(tabuleiro.selet, null, 2)}</pre>       
    `
  }
}


var tabuleiro;
var bug;

class Main {
  constructor() {
    
    this.init();
  }
  
  newGame(){
    tabuleiro = new Tabuleiro()
    bug       = new Bug()
  }
  
  
  loop = ()=>{
    bug.show(tabuleiro);
    
    window.requestAnimationFrame(this.loop)
  }
  
  
  init(){
    this.newGame();
    this.loop();
  }
}

const main = new Main();


