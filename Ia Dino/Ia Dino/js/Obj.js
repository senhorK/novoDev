

class Play {
  constructor() {
    this.ia = new Brain();
    this.ne;
    this.reset();
    
  }


  reset() {
    this.x = 10;
    this.y = alt-90;
    this.w = 50;
    this.h = 45;
    this.vivo = true;
    this.vy = 0;
    this.gravity = 1;
    this.jump       = false;
    this.DINO3      = { x: 1854, y: 0, w: 88, h: 95 };
    this.DINO4      = { x: 1942, y: 0, w: 88, h: 95 };
    this.DEAT       ={x: 2118, y:0, w:85, h:95};
    this.DINO_DUCK1 ={x: 2203, y:0, w:118, h:95};
    this.DINO_DUCK2 ={x: 2321, y:0, w:118, h:95};
    this.abaixar    = false;
    
    this.sprite  = [this.DINO3, this.DINO4];
    this.spriteD = [this.DINO_DUCK1, this.DINO_DUCK2];
    this.frame = 0;
    this.time = 5;
    
  }


  JUMP() {
    if (!this.jump){
       this.vy += -15;
       this.abaixar = false;
       this.jump    = true;
    }
  }
  ABAIXAR(){
    this.abaixar = true;
    this.jump    = false;
  }
  DOW(){
    
    this.vy = 5;
  }

  draw() {
    if (this.vivo) {
      if(!this.abaixar)
           Img.draw(this.sprite[this.frame], this.x, this.y, this.w, this.h);
      else Img.draw(this.spriteD[this.frame], this.x, this.y, this.w, this.h);
      
    }
    else Img.draw(this.DEAT, this.x, this.y, this.w, this.h);
  }

  update() {
    if (this.vivo) {
    //if(!this.vivo) 
    
      this.y += this.vy;
      this.vy += this.gravity + (2*aceleracao);

      
      if (this.y + this.w > alt-90) {
        this.vy = 0;
        this.y = (alt -90) - this.w;
        this.jump = false;
      }

      else {
        this.jump = true;
      }








      this.time--;
      if (this.time <= 0) {
        this.frame++;
        this.time = 5;
        if (this.frame >= this.sprite.length) this.frame = 0;
      }


    }
    
    
  }

  decidir(enemy) {
    
    if(enemy.nome === "Cacto"){
      let o = this.ia.getOutput(this, enemy);
      this.ne= o;
      switch (o) {
        case 1:
          this.JUMP();
          break;
       case 0:
         this.ABAIXAR();
         break;
       
      }
    }
    
    /*else if(enemy.nome === "Cacto"){
      let p = this.ia.getOutput(this, enemy);
      
      
      switch (p) {
        case 1:
            this.DOW();
            break;
        case 0:
            this.ABAIXAR();
            break;
      }
    }*/
    
   
  }


  kill(e) {
    this.vivo = false;

    VIVOS--;
    // this.y = e.y
  }
}










class Nuven{
  constructor(px) {
    this.x = px;//Math.floor(Math.random() * lar);;
    this.y = Math.floor(Math.random() * 150);
    this.w = 93;
    this.h = 28;
    this.image = {x: 166, y: 2, w: 93, h: 28};
    
  }
  
  
  draw(){
    Img.draw(this.image, this.x,this.y,this.w,this.h);
  }
  
  update(){
    this.x -= delta/20;
    if(this.x + this.w <= 0){
      this.x = lar;
      this.y = Math.floor(Math.random() * 150);
    }
  }
}



class NuvenMae {
  constructor(){
    let d = 50 + Math.floor(Math.random() * lar);
    
    this.n1 = new Nuven(0);
    this.n2 = new Nuven(d);
    this.n3 = new Nuven(d*2);
    this.n4 = new Nuven(d*3);
  }
  
  draw(){
    this.n1.draw();
    this.n2.draw();
    this.n3.draw();
    //this.n4.draw();
  }
  
  
  update(){
    this.n1.update();
    this.n2.update();
    this.n3.update();
    //this.n4.update();
  }
}








class Chao {
  constructor(i) {
    this.x = i;
    this.y = alt-110;
    this.w = 1400;
    this.h = 20;
    this.frame = { x: 1, y: 105, w: 2400, h: 25 };
  }


  draw() {
    Img.draw(this.frame, this.x, this.y, this.w, this.h);
  }

  update() {
    this.x -= delta;
    if (this.x + this.w <= 0) this.x = this.w;
  }
}

class ChaoMae {
  constructor() {
    this.l1 = new Chao(0);
    this.l2 = new Chao(1400);
  }

  draw() {
    this.l1.draw();
    this.l2.draw();
  }

  update() {
    this.l1.update();
    this.l2.update();
  }
}



class Cacto {
  constructor() {
    this.nome = "Cacto";
    this.x = 250+ + Math.floor(Math.random() * 80);
    this.y =  alt - 140;
    this.w = 40;
    this.h = 45;
    this.img ={x: 650, y:0, w:52, h:100};
  }
  
  
  draw(){
    Img.draw(this.img, this.x, this.y, this.w,this.h);
    
  }
  
  update(){
    this.x -= delta +2;
    if(this.x + this.w <= 0) this.x = lar +  Math.floor(Math.random() * 80);
  }
  
  
  Colid(e){
    if(Colid(e, this)){
      e.kill(e.y);
    }
    
    return  !e.vivo;
  }
}
