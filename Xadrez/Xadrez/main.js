


















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






var engine;
var render;


class Super {
  constructor() {
     this.init();
  }
  
  
  
  init(){
    engine = new Engine();
    render = new Render(engine, ".tabuleiro");
    
    
    render.on((e)=>{
      
      const casa = e.target.closest(".casaBranca,.casaPreta");       
      if(!casa) return;
      
      const x = Number(casa.dataset.x);
      const y = Number(casa.dataset.y);
      
      const pos    = {x,y}
      engine.cell  = pos;
      engine.poite = [pos];
      
      const peca   = engine.getPeca(x,y);
      
      
      if(!engine.selet && peca && engine.vez === peca.cor){
          engine.selet = peca;
          
          if(engine.selet.tipo === "cavalo")   engine.posCavalo()
          else 
          if(engine.selet.tipo === "torre")    engine.posTorre()
          else 
          if(engine.selet.tipo === "bispo")    engine.posBispo()
          else 
          if (engine.selet.tipo === "rainha")  engine.posRainha()
          else
          if(engine.selet.tipo === "rei")      engine.posRei()
          else 
          if(engine.selet.tipo === "peao") engine.posPeao()
            
          
          else return
        
      }
      else{
        const origen  = {x: engine.selet.x ,y: engine.selet.y};
        const destino = {x,y}
        engine.movePeca(origen, destino)
      }
    })
    
  }
}



const main = new Super();