



class Camera {
  constructor() {
    this.x = 0;
    this.y = 0;
    
    this.smooth = 0.1; // suavização
    this.target = null; // quem ela vai seguir
  }
  
  follow(obj) {
    this.target = obj;
  }
  
  isVisible(obj) {
  return (
    obj.x + obj.w > this.x &&
    obj.x < this.x + ctx.canvas.width &&
    obj.y + obj.h > this.y &&
    obj.y < this.y + ctx.canvas.height
  );
}
  
  update() {
    if (!this.target) return;
    
    let targetX =
      this.target.x - ctx.canvas.width / 2;
    
    let targetY =
      this.target.y - ctx.canvas.height / 2;
    
    /* câmera suave */
    this.x += (targetX - this.x) * this.smooth;
    this.y += (targetY - this.y) * this.smooth;
  }
  
  begin() {
        
    
    ctx.save();
    
    ctx.translate(
      -this.x,
      -this.y
    );
  }
  
  end() {
    ctx.restore();
  }
  
  draw() {}
}

class Mundo {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.w = 1000;
    this.h = 1000;
    
    this.borda1 = { x: 0, y: 0, w: 2, h: 1000 }
    this.borda2 = { x: 0, y: 0, w: 1000, h: 2 }
    this.borda3 = { x: 1000, y: 0, w: 2, h: 1000 }
    this.borda4 = { x: 0, y: 1000, w: 1000, h: 2 }
    
    
    
  }
  
  
  draw() {
    if (!camera.isVisible(this)) return;
    
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#00ffff";
    
    ctx.strokeRect(
      this.x,
      this.y,
      this.w,
      this.h
    );
  }
  
}





class newComida {
  constructor() {
    this.x = Math.random() * 1000;
    this.y = Math.random() * 1000;
    this.w =  10;
    this.h =  10;
    
  }
  update(){}
  draw(){
    
    if (!camera.isVisible(this)) return;
    ctx.fillStyle = "#0f0";
    ctx.beginPath();
    ctx.arc(this.x,this.y, this.w, 0 , Math.PI*2)
    ctx.fill()
    //ctx.fillRect(this.x,this.y, this.w, this.h)
  }
}
class Comida {
  constructor() {
    this.ls = [];
    
    
    for(var i = 0; i < 20; i++) {
        this.ls.push(new newComida());
    }
  }
  
  update(){}
  draw(){
    for(var i = this.ls.length-1; i  > 0; i--) {
        this.ls[i].draw() 
    }
    
    
  }
}


/*class Snick {
  constructor() {
    this.x = 200;
    this.y = 200;
    
    this.size = 15;
    this.w = 15;
    this.h = 15;
    this.calda = [];
    this.tamanho = 1;
    this.speed = 0.1;
  }
  


  
  
  update() {
   this.x += stick.subX * this.speed;
   this.y += stick.subY * this.speed;
  
   if(this.x < 0) this.x = 0;
   if(this.y < 0) this.y = 0;
   if(this.x + this.size  > 1000)  this.x = 1000 - this.size;
   if(this.y + this.size  > 1000)  this.y = 1000 - this.size;
  
 
  

    
  

  
  
  

  
  
  let last = this.calda[0];
  
  if (!last) {
    this.calda.unshift({
      x: this.x,
      y: this.y
    });
  } 
  else {
    let dx = this.x - last.x;
    let dy = this.y - last.y;
    
    let dist = Math.sqrt(dx * dx + dy * dy);
    
    // só adiciona se andou suficiente
    if (dist > this.w/2) {
      this.calda.unshift({
        x: this.x,
        y: this.y
      });
    }
  }
  
  if (this.calda.length > this.tamanho) {
    this.calda.pop();
  }
  
  
}
  
  
  
  
  draw() {
 
  for (let i = this.calda.length - 1; i >= 0; i--) {
    let x = this.calda[i].x;
    let y = this.calda[i].y;
    
    
    let alpha = 1 + (i / this.calda.length) * 0.1;
    
    //ctx.fillStyle = `rgba(0, 180, 255, ${alpha})`;
    ctx.fillStyle = `rgba(0, 180, 255, 1)`;

    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.arc(
      x,
      y,
      this.w / 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ///ctx.stroke();
  }
  

  ctx.shadowBlur = 0;
  ctx.shadowColor = "rgba(0,255,100,0.8)";
  
  ctx.fillStyle = "#00ff88";
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  
  ctx.beginPath();
  ctx.arc(
    this.x,
    this.y,
    this.w / 2,
    0,
    Math.PI * 2
  );
  ctx.fill();
  ctx.stroke();
  
  
  ctx.fillStyle = "#111";
  
  ctx.beginPath();
  ctx.arc(
    this.x - 6,
    this.y - 4,
    2,
    0,
    Math.PI * 2
  );
  ctx.arc(
    this.x + 6,
    this.y - 4,
    2,
    0,
    Math.PI * 2
  );
  ctx.fill();
  
  
  ctx.shadowBlur = 0;
}

  

}*/


class Snick {
  constructor(x, y,modo) {
    this.x = x;
    this.y = y;
    
    this.w = 15;
    this.h = 15;
    this.size = 15;
    
    this.subX = 0;
    this.subY = 0;
    
    this.speed = 0.2;
    
    this.calda = [];
    this.tamanho = 5;
    
    this.modo = modo;
    this.color = "#F00"
  }
  
  update() {
    if(this.modo === "player"){
      this.subX = stick.subX;
      this.subY = stick.subY;
      this.speed = 0.2;
    }
    else this.speed = 2;
    
    this.x += this.subX * this.speed;
    this.y += this.subY * this.speed;
    
    /* limite mundo */
    if (this.x < 0) this.x = 0;
    if (this.y < 0) this.y = 0;
    if (this.x + this.w > 1000) this.x = 1000 - this.w;
    if (this.y + this.h > 1000) this.y = 1000 - this.h;
    
    this.updateTail();
  }
  
  updateTail() {
    let last = this.calda[0];
    
    if (!last) {
      this.calda.unshift({
        x: this.x,
        y: this.y
      });
    } else {
      let dx = this.x - last.x;
      let dy = this.y - last.y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist > this.w / 2) {
        this.calda.unshift({
          x: this.x,
          y: this.y
        });
      }
    }
    
    if (this.calda.length > this.tamanho) {
      this.calda.pop();
    }
  }
  
  draw() {
  
  for (let i = this.calda.length - 1; i >= 0; i--) {
    let x = this.calda[i].x;
    let y = this.calda[i].y;
    
    
    let alpha = 1 + (i / this.calda.length) * 0.1;
    
    if(this.modo === "but") ctx.fillStyle = `rgba(0, 180, 255, 1)`;
    else{
      ctx.fillStyle = `#f00`;
    }
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.arc(x, y,this.w / 2,0,Math.PI * 2);
    ctx.fill();
  }
  
  
  ctx.shadowBlur = 0;
  ctx.shadowColor = "rgba(0,255,100,0.8)";
  
  ctx.fillStyle = "#00ff88";
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.w / 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  }
  
  
  checkCollision(snakes) {
  let head = {
    x: this.x,
    y: this.y,
    w: this.w,
    h: this.h
  };
  
  for (let other of snakes) {
    /* ignora a própria cobra */
    if (other === this) continue;
    
    for (let part of other.calda) {
      let bodyPart = {
        x: part.x,
        y: part.y,
        w: other.w,
        h: other.h
      };
      
      if (Colid(head, bodyPart)) {
        //this.dead = true;
        
        return true;
      }
    }
  }
}
}




class SnakeAI {
  constructor(snake) {
    this.snake = snake;
    this.target = null;
  }
  
  update() {
    this.findClosestFood();
    
    if (!this.target) return;
    
    let dx = this.target.x - this.snake.x;
    let dy = this.target.y - this.snake.y;
    
    let dist = Math.sqrt(dx * dx + dy * dy);
    
    if (dist > 0) {
      this.snake.subX = dx / dist;
      this.snake.subY = dy / dist;
    }
    
    /* se chegou perto → come */
    if (dist < 20) {
      this.eatFood();
    }
  }
  
  findClosestFood() {
    let menor = Infinity;
    let alvo = null;
    
    for (let food of comida.ls) {
      let dx = food.x - this.snake.x;
      let dy = food.y - this.snake.y;
      
      let dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < menor) {
        menor = dist;
        alvo = food;
      }
    }
    
    this.target = alvo;
  }
  
  eatFood() {
    let index = comida.ls.indexOf(this.target);
    
    if (index !== -1) {
      comida.ls.splice(index, 1);
      
      /* cresce */
      this.snake.tamanho += 2;
      
      /* nasce nova comida */
      comida.ls.push(new newComida());
    }
    
    this.target = null;
  }
  
  
  
  
  
}
let snakes = [new Snick(100,100,"player")];
let bots = [];

for (let i = 0; i < 10; i++) {
  let s = new Snick(
    Math.random() * 1000,
    Math.random() * 1000,
    "but"
  );

  let ai = new SnakeAI(s);

  snakes.push(s);
  bots.push(ai);
}

