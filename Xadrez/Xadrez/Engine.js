class Engine {
  constructor() {
    this.size  = 40;
    this.li    = 8;
    this.co    = 8;
    this.casas = [];
    this.pecas = [];
    this.poite = [];
    this.posivel = [];
    this.vez   = "branco";
    this.selet = null;
    this.cell  = null;
    
  
    this.body = document.querySelector("body");
  }
  
  ///////Metotos Utils
  getPeca(x, y) {return this.pecas.find(p => p.x === x && p.y === y);}
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
  

  
  
  ////////Metoros de Movimentos//////////
  
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
        
       render.showPos();
      }
  posTorre() {
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
    
    
    render.showPos();
  }
  posCavalo() {
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
    
    
    
    
    render.showPos();
  }
  posPeao() {
    
    const x = this.selet.x;
    const y = this.selet.y;
    
    const dir = this.selet.cor === "preto" ? 1 : -1;
    
    let moves = [];
    
    // frente 1
    const frente1 = { x, y: y + dir };
    
    if (
      this.isDentro(frente1) &&
      !this.getPeca(frente1.x, frente1.y)
    ) {
      
      moves.push(frente1);
      
      // frente 2 (só se a frente1 estiver livre)
      const frente2 = { x, y: y + dir * 2 };
      
      const inicio =
        (this.selet.cor === "preto" && y === 1) ||
        (this.selet.cor === "branco" && y === 6);
      
      if (
        inicio &&
        !this.getPeca(frente2.x, frente2.y)
      ) {
        moves.push(frente2);
      }
    }
    
    // diagonais de captura
    const ataques = [
      { x: x - 1, y: y + dir },
      { x: x + 1, y: y + dir }
    ];
    
    for (let a of ataques) {
      
      if (!this.isDentro(a)) continue;
      
      const alvo = this.getPeca(a.x, a.y);
      
      // só captura inimigo
      if (alvo && alvo.cor !== this.selet.cor) {
        moves.push(a);
      }
    }
    
    this.posivel = moves;
    render.showPos();
  }
  posRainha() {
    this.posivel = [];
    this.posTorre();
    
    const torreMoves = [...this.posivel];
    
    this.posBispo();
    const bispoMoves = [...this.posivel];
    
    this.posivel = [...torreMoves, ...bispoMoves];
    
    render.showPos();
  }
  posRei() {
    const x = this.selet.x;
    const y = this.selet.y;
    
    const moves = [
      { x: x, y: y + 1 },
      { x: x, y: y - 1 },
      { x: x + 1, y: y },
      { x: x - 1, y: y },
      
      { x: x + 1, y: y + 1 },
      { x: x - 1, y: y + 1 },
      { x: x + 1, y: y - 1 },
      { x: x - 1, y: y - 1 },
    ];
    
    this.posivel = moves.filter(m => this.isCasaValida(m))
    render.showPos();
  }
  
  

  
  
  movePeca(origen, destino){
      const x = destino.x;
      const y = destino.y;
    
  
      const pode = this.posivel.some(p => p.x === x && p.y === y);
      
      if(pode) {
        
        let p = this.getPeca(origen.x, origen.y);
        if (!p) return;
        
        // 👉 remove peça da casa origem (DOM)
        
        render.linparCasa(origen.x,origen.y)
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
        
        this.vez = this.selet.cor === "preto" ? "branco" : "preto"
        /*if(this.vez === "preto") {
          this.body.classList.add("ativo")
         
          this.getMoves();
          this.iaMove()
        }*/
        
        if (this.vez === "preto") {
          this.body.classList.add("ativo")
          
          this.selet = null;
          
          setTimeout(() => {
           // this.iaMove();
          }, 200);
          
        }
        else this.body.classList.remove("ativo")
      }
      
      
      
      this.selet = null;
      this.posivel = [];
      render.hidePos();

  }
  
}




class Render {
  constructor(engine,box) {
    this.engine = engine;
    
    
    this.body = document.querySelector("body");
    this.box   = typeof box === "string" ? this.DOW(box) : box;  
    this.box.style.gridTemplateColumns = `repeat(8, ${this.engine.size}px)`;
    this.box.style.gridTemplateRows    = `repeat(8, ${this.engine.size}px)`;
    this.box.innerHTML = "";
    
    
    
    
    
    this.setup()
    this.init();
  }
  
  DOW(e){return document.querySelector(e);}
  on(f){this.box.addEventListener("pointerdown", f);}
  addPeca(x, y, tipo, cor, src){this.engine.pecas.push({x,y,tipo,cor,src})}
  setup(){
        // peões
        for (let x = 0; x < 8; x++) {
          this.addPeca(x, 1, "peao", "preto", "./pedras/peaoPreto.svg");
          this.addPeca(x, 6, "peao", "branco", "./pedras/peaoBranco.svg");
        }
        
        // cavalos
        let cavaloP = "./pedras/CavaloPreto.svg"
        let cavaloB = "./pedras/cavaloBranco.svg"
        this.addPeca(1, 0, "cavalo", "preto", cavaloP);
        this.addPeca(6, 0, "cavalo", "preto", cavaloP);
        
        this.addPeca(1, 7, "cavalo", "branco", cavaloB);
        this.addPeca(6, 7, "cavalo", "branco", cavaloB);
        
        this.addPeca(3, 0, "rei", "preto", "./pedras/reiP.svg");
        this.addPeca(3, 7, "rei", "branco", "./pedras/reiB.svg");
        
        this.addPeca(4, 0, "rainha", "preto", "./pedras/rainhaP.svg");
        this.addPeca(4, 7, "rainha", "branco", "./pedras/rainhaB.svg");
        
        this.addPeca(2, 0, "bispo", "preto", "./pedras/bispoPreto.svg");
        this.addPeca(5, 0, "bispo", "preto", "./pedras/bispoPreto.svg");
        
        this.addPeca(2, 7, "bispo", "branco", "./pedras/bispoBranco.svg");
        this.addPeca(5, 7, "bispo", "branco", "./pedras/bispoBranco.svg");
        
        this.addPeca(0, 7, "torre", "branco", "./pedras/torreBranca.svg");
        this.addPeca(7, 7, "torre", "branco", "./pedras/torreBranca.svg");
        
        this.addPeca(0, 0, "torre", "preto", "./pedras/torrePreta.svg");
        this.addPeca(7, 0, "torre", "preto", "./pedras/torrePreta.svg");
        
        
        if (this.engine.vez === "preto") this.body.classList.add("ativo")
        else this.body.classList.remove("ativo")
  }
  
  
  
  showPos() {
    const casas = this.box.querySelectorAll(".casaPreta, .casaBranca");
    const mapa = new Set(this.engine.posivel.map(p => `${p.x}-${p.y}`))
        
    casas.forEach(casa => {
      const key = `${casa.dataset.x}-${casa.dataset.y}`;
      casa.classList.toggle("ativo", mapa.has(key));
    });
  }
  hidePos() {
    const casas = this.box.querySelectorAll(".casaPreta, .casaBranca");
    const mapa = new Set(this.engine.posivel.map(p => `${p.x}-${p.y}`))
    
    casas.forEach(casa => {
      const key = `${casa.dataset.x}-${casa.dataset.y}`;
      casa.classList.remove("ativo", mapa.has(key));
    });
  }
  linparCasa(x,y){this.engine.casas[y][x].innerHTML = "";}
  
  
  init(){
    
    for(var y = 0; y < 8; y++) {
      this.engine.casas[y] = [];
      for(var x = 0; x < 8; x++) {
        
        const clas = (x + y) % 2 === 0;
        const casa = document.createElement("div");    
              casa.dataset.x = x;
              casa.dataset.y = y;
              casa.className = clas ? "casaPreta" : "casaBranca";
              this.box.appendChild(casa)
              this.engine.casas[y][x] = casa;
        
      }
    }
    
    
    this.engine.pecas.forEach(p => {
      const img = document.createElement("img");
            img.src = p.src;
            this.engine.casas[p.y][p.x].appendChild(img)
    })
  }
}