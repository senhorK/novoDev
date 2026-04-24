var lsEstrela = [];

function addEster(w, h) {
  lsEstrela = [];
  
  for (var i = 0; i < 20; i++) {
    lsEstrela.push({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 2 + 2,
      speed: Math.random() * 0.6 - 0.3,
      vx: Math.random() * 0.8 - 0.4,
      vy: Math.random() * 0.8 - 0.4,
    })
  }
  
}

class Backgroude {
  constructor() {
    
  }
  
  update() {
    if (lsEstrela.length === 0) {
      addEster(lar, alt)
    }
    
    
    for (let e of lsEstrela) {
      e.x += e.vx;
      e.y += e.vy;
      //e.y += e.speed;
      
      if (e.x + e.size < 0) e.x = lar;
      if (e.x > lar) e.x = 0;
      
      if (e.y + e.size < 0) e.y = alt;
      if (e.y > alt) e.y = 0
      
      
      
      ctx.save();
      
      ctx.fillStyle = "#FFF";
      ctx.beginPath();
      ctx.arc(e.x, e.y, e.size / 2, 0, Math.PI * 2)
      ctx.fill()
      //ctx.fillRect(e.x,e.y, e.size, e.size)
      
      
      
      ctx.restore();
    }
  }
  
  
  draw() {
    
  }
}