






class Particulas {
  constructor(x, y,c) {
    this.x = x;
    this.y = y;
    this.vx = Math.random() * 4 - 2;
    this.vy = Math.random() * 4 - 2;
    this.cor = c;
    this.life = 30;
    this.opacite = 1;
    this.size = Math.random() * 10;
    
  }
  
  
  update() {
    this.x += this.vx;
    this.y += this.vy;
    // this.vy += 0.05;
    
    this.life--;
    this.opacite = this.life / 30;
    
  }
  
  draw() {
    ctx.save()
    
    ctx.globalAlpha = this.opacite;
    ctx.beginPath()
    ctx.fillStyle = this.cor;
    
    ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
    ctx.fill()
    ctx.restore()
  }
  
  
}
class Part {
  constructor() {
    this.ls = [];
    this.f = false;
  }
  
  add(x, y, c) {
    for (var i = 0; i < 20; i++) {
      this.ls.push(new Particulas(x, y,c));
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



class Mundo {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.w = 1000;
    this.h = 1000;
  }
  
  draw(){
    ctx.beginPath()
    ctx.strokeStyle = "#fff";
    ctx.strokeRect(this.x , this.y, this.w, this.h);
  }
}
class Balas {
  constructor(o) {
    this.x = o.x;
    this.y = o.y;
    this.w = o.w;
    this.h = o.h;
    this.c = o.c;
    
    this.rot = o.rot+24.6;
    this.speed = 8;
    this.vx = Math.cos(this.rot) * this.speed;
    this.vy = Math.sin(this.rot) * this.speed;
  }
  
  
  update(){
     this.x += this.vx;
     this.y += this.vy;
  }
  draw() {
  ctx.save();
  
  ctx.translate(this.x, this.y);
  ctx.rotate(this.rot + Math.PI/2);
  
  ctx.fillStyle = "#f00";
  ctx.fillRect(0, 0, this.w, this.h);
  
  ctx.restore();
}
  
}
class Player {
  constructor() {
    this.x = 200;
    this.y = 300;
    this.w = 18;
    this.h = 18;
    this.size = 18;
    this.rot = 0;
    this.offsetRot = Math.PI / 7;
    this.balas = [];
    this.cdTiro = 10;
    this.life = 100;
    this.vivo = true;
    this.cor = "#f00"
    this.score = 0;
    
    this.vx = 0;
    this.vy = 0;
     this.parts = [
       Math.PI / 4,
       Math.PI * 0.9,
       Math.PI * 1.6
     ];
  }
  
  
  add() {
     this.balas.push(new Balas({
    x: this.x,
    y: this.y,
    w: 3,
    h: 10,
    rot: this.rot
  }));
  }
  update(){
    if(!this.vivo) return;
    
    this.x = Math.max(this.w, Math.min(mundo.w, this.x));
    this.y = Math.max(this.h, Math.min(mundo.h, this.y));
    this.rot = stick2.angle + this.offsetRot;

    
     if(this.cdTiro > 0) this.cdTiro--;
     if(stick2.subX != 0 && this.cdTiro <= 0) {
        this.add();
       // somTiro();
        somLaize()
        this.cdTiro = 5;
     }
     
     
     
     
     for(let i = this.balas.length-1; i >= 0; i--) {
         let b = this.balas[i];
         
         b.update();
         if(b.x < 0 ||
            b.x > mundo.w ||
            b.y < 0 ||
            b.y > mundo.h
         ) this.balas.splice(i,1)
     }
     
     
     
 
  }
  draw(){
    if(!this.vivo) return;
    
      app.physics.inertia({
        target: this,
        inputX: stick1.subX,
        inputY: stick1.subY,
        acc: 0.02,
        drag: 0.95,
        maxSpeed: 5
        
      });
      
      for(var i = 0; i < this.balas.length; i++) {
        let b = this.balas[i];

        b.draw()
      }
      
  
      for (var i = 0; i < this.parts.length; i++) {
          var ang = this.parts[i];
          const isHead = i === 2;
          const cor = isHead ? "#FF00008C" : "#FFFFFFED";
          
          
          
          ctx.save();
          ctx.translate(this.x, this.y);
          ctx.rotate(ang + this.rot);
          
          app.draw.rect({
            ctx,
            x: 0,
            y: 0,
            w: this.size,
            h: this.size,
            cor: cor,
      
          });
          
          ctx.restore();
      }
      
    
    
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((Math.PI / 4) + this.rot); 
    app.draw.circle({ctx, x: 0, y: 0, size: (this.size/1.5), cor: "#fff"})
    ctx.restore();
    
    
    
    
    app.draw.text({
       ctx,
       txt: this.balas.length,
       
       x: 100,
       y: 50,
       font: "15px",
       cor: "#fff"
       
     })
  }
  drawLife(){app.draw.rect({ctx,x: 20, y: 30,w: 3,h: this.life,cor: "#0f0"})}
}

























class criarEnemy {
  constructor(o = {}){
    const {
      x = Math.random() * mundo.w,
      y = Math.random() * mundo.h,
      w = 40,
      h = 40,
      typo = "base",
      life = 100,
      speed = 2,
      range = 200,
      cor  = "#00ffff",
      nome = "..."
    } = o;
    
    this.nome = nome;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.type = typo;
    this.life = life;
    this.cor = cor;
    
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2;
    this.speed = 2;
    this.timeMove = 0;
    this.visao = false;
    this.range = 200;
    this.dx; 
    this.dy; 
    this.dist;
  }
  
  update(){
      this.dx = player.x - this.x;
      this.dy = player.y - this.y;
      
      this.dist = Math.sqrt((this.dx * this.dx) + (this.dy * this.dy));
      
      this.visao = this.dist < this.range;
      if(this.visao){
        this.atacar()
      }
      else{
        this.patrulha()
      }
  }
  
  atacar() {
       if(this.dist <= 0) return; 
       
       this.dx /= this.dist;
       this.dy /= this.dist;

       this.x += this.dx * this.speed;
       this.y += this.dy * this.speed;
  }
  patrulha() {
      this.timeMove--;
      
      if (this.timeMove <= 0) {
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        
        this.timeMove = 120;
      }
      
      this.x += this.vx;
      this.y += this.vy;
      this.x = Math.max(0, Math.min(mundo.w, this.x));
      this.y = Math.max(0, Math.min(mundo.h, this.y));
  }
  
  
  draw(){
    
    if(this.visao) app.draw.circle({ctx,x: this.x, y: this.y,size: 200, cor: "rgba(0, 0, 0, 0.4)", stroke: "#f00"});
    
    let lifeBar = Math.max(0, this.life);
    app.draw.rect({ctx, x: this.x -(this.life/2),y: this.y-(this.h),w: lifeBar, h: 2, cor: "#f00"})
      
    if(this.type === "base") {
      ctx.fillStyle = this.cor;
      ctx.fillRect(this.x, this.y, this.w, this.h);
    }
    
    if(this.type === "tri") {
       app.draw.triangle({ctx, x: this.x, y: this.y,size: this.w/2,cor: this.cor})
    }
  }
}

/*
function enemyBase(total, typo) {
   
   let liste =[];
   
   
   
   for(var i = 0; i < total; i++) {
     liste.push(new criarEnemy({
       x: Math.random() * mundo.w,
       y: Math.random() * mundo.h,
       w: 40, h: 40,
       typo: typo
     }));
      
   }
   
   return liste;
}
*/
function enemyBase(o) {
  const {
      total = 5,
      w     = 40,
      h     = 40,
      typo  = "base",
      life  = 100,
      speed = 2,
      range = 200,
      cor   = "#00ffff",
      nome  = "fase"
    } = o;
  
  
  let liste = [];
  
  
  
  for (var i = 0; i < total; i++) {
    liste.push(new criarEnemy({
      x: Math.random() * mundo.w,
      y: Math.random() * mundo.h,
      w,
      h,
      typo,
      life,
      speed,
      range,
      cor,
      nome
    }));
    
  }
  
  return liste;
}









function fase1() {
  return {
    nome: "INTRODUÇÃO",
    fase: "FASE I",
    enemies: [
      ...enemyBase({
        total: 5,
        typo: "base",
        cor: "#00f"
      }),
      
      ...enemyBase({
        total: 3,
        typo: "tri"
      })
    ]
  };
}

function fase2() {
  return {
    nome: "PRESSÃO LEVE",
    fase: "FASE II",
    enemies: [
      ...enemyBase({
        total: 8,
        typo: "base",
        cor: "#0ff",
        speed: 2.5
      }),
      
      ...enemyBase({
        total: 5,
        typo: "tri",
        speed: 3
      })
    ]
  };
}

function fase3() {
  return {
    nome: "COMEÇA O MEDO",
    fase: "FASE III",
    enemies: [
      ...enemyBase({
        total: 10,
        typo: "base",
        life: 150,
        range: 250
      }),
      
      ...enemyBase({
        total: 8,
        typo: "tri",
        speed: 4,
        range: 300
      })
    ]
  };
}

function fase4() {
  return {
    nome: "CAOS CONTROLADO",
    fase: "FASE IV",
    enemies: [
      ...enemyBase({
        total: 15,
        typo: "base",
        life: 200,
        speed: 3
      }),
      
      ...enemyBase({
        total: 10,
        typo: "tri",
        life: 250,
        speed: 4
      })
    ]
  };
}

function fase5() {
  return {
    nome: "SOFRIMENTO ORGANIZADO",
    fase: "FASE V",
    enemies: [
      ...enemyBase({
        total: 20,
        typo: "base",
        life: 250,
        speed: 3.5,
        range: 350
      }),
      
      ...enemyBase({
        total: 15,
        typo: "tri",
        life: 300,
        speed: 5,
        range: 400
      })
    ]
  };
}

function bossStage() {
  return {
    nome: "TRAUMA PERMANENTE",
    fase: "BOSS STAGE",
    enemies: [
      ...enemyBase({
        total: 1,
        typo: "boss",
        w: 120,
        h: 120,
        life: 5000,
        speed: 2,
        range: 700,
        cor: "#f00"
      }),
      
      ...enemyBase({
        total: 10,
        typo: "tri",
        speed: 4
      })
    ]
  };
}

/*
function fase1() {
  return [
    ...enemyBase({
      total: 5,
      typo: "base"
    }),
    
    ...enemyBase({
      total: 3,
      typo: "tri",
      speed: 3,
      range: 300
    })
  ];
}
function fase2() {
    return [
  ...enemyBase({ total: 5, typo: "base" , cor: "#00f", nome: "nome da faze"}),
  ...enemyBase({ total: 5, typo: "tri" , nome: "nome da faze"})
]
}
function fase3() {
  return [
  ...enemyBase({ total: 5, typo: "base" }),
  ...enemyBase({ total: 5, typo: "tri" })
]
}
function fase4() {
  return [
  ...enemyBase({ total: 5, typo: "base" }),
  ...enemyBase({ total: 5, typo: "tri" })
]
}
*/



function faseInsana() {
  return [
    // tropa básica gigante
    ...enemyBase({
      total: 25,
      typo: "base",
      life: 150,
      speed: 2.5,
      range: 300,
      cor: "#00ffff",
      nome: "nome da faze",
    }),

    // triangulares agressivos
    ...enemyBase({
      total: 15,
      typo: "tri",
      life: 250,
      speed: 4,
      range: 400,
      cor: "#00ff00"
    }),

    // tanques pesados
    ...enemyBase({
      total: 8,
      typo: "tank",
      w: 60,
      h: 60,
      life: 600,
      speed: 1.2,
      range: 500,
      cor: "#ff8800"
    }),

    // mini boss
    ...enemyBase({
      total: 2,
      typo: "miniBoss",
      w: 90,
      h: 90,
      life: 2000,
      speed: 2,
      range: 700,
      cor: "#ff0000"
    }),

    // O demônio final 😏
    ...enemyBase({
      total: 1,
      typo: "boss",
      w: 140,
      h: 140,
      life: 8000,
      speed: 1.5,
      range: 1000,
      cor: "#8B0000"
    })
  ];
}