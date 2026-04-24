




var ctx;
var alt;
var lar;
var tile;
var boot;
var snk;
var maca;
var jogando = false;
var pro = 15;
var fps = 1000/8;
var lsP =[];
var idxP  = 0;
var cor = ["#FFFFFF","#FF0000", "#00E2FF", "#0CFF00","#FFF700"];  
var p = document.getElementById("p1")
var key = {up: false,dow: false,left: false,rigth: false};






bootLoad = function(){
   this.w = 200;
   this.con = false;
   
   this.reload = function(){
      this.w = 200;
      this.con = false;
      Ld.style.background = "#00000000"
      Ld.style.display = "block"
   }
  
   this.update = function(){
     if(!this.con){
        if(this.w != 0) this.w -= 8;
        else{
          //this.w = 200;
          this.con = true;
          Ld.style.display = "none"
        }
     }
     
     barraLoad.style.width = this.w +"px";
   }
   this.draw   = function(){
     
   }
}





Touch = function(e,o){
  
  switch (e) {
    case "b1": key.up = true;
               key.dow = false;
               key.left = false;
               key.rigth = false;
             break;
    case "b3": key.up = false;
               key.dow = true;
               key.left = false;
               key.rigth = false;
               break;
    case "b2": key.up = false;
               key.dow = false;
               key.left = true;
               key.rigth = false;
               break;
    case "b4": key.up = false;
               key.dow = false;
               key.left = false;
               key.rigth = true;
               break;
  }
  
  navigator.vibrate([10]);
  
  o.setAttribute("class", "dr1");
}

Tend = function(e){
  e.setAttribute("class", "dr");
}



b1.addEventListener("touchstart", function(){Touch(b1.id,b1);})
b3.addEventListener("touchstart", function(){Touch(b3.id,b3);})
b2.addEventListener("touchstart", function(){Touch(b2.id,b2);})
b4.addEventListener("touchstart", function(){Touch(b4.id,b4);})

b1.addEventListener("touchend", function(){Tend(b1);})
b3.addEventListener("touchend", function(){Tend(b3);})
b2.addEventListener("touchend", function(){Tend(b2);})
b4.addEventListener("touchend", function(){Tend(b4);})





drawText = function(){
  ctx.font = "arial 20px";
  ctx.fillFont(50,50,"Snik")
}




Random = function(min, max){
  return Math.round( min + ( Math.random() * ( max - min ) ) );
} 


var Parti = function(op){
    this.x = op.x;
    this.y = op.y;
    this.size = 10;
    this.vx = -4 + Math.random() * 10; //Random(0, 5);
    this.vy = -4 + Math.random() * 10; //Random(0, 5);
    this.c = op.c
}

Parti.prototype.update = function(){
  this.x += this.vx;
  this.y += this.vy;
  this.size *= 0.8;
}

Parti.prototype.draw = function(){
  ctx.fillStyle = this.c;
  ctx.fillRect(this.x, this.y, this.size, this.size);  
}










Menu = function(){
    var jogar = document.getElementById("play");
    var scor = document.getElementById("scor");
    var contr = document.getElementById("contr");
    var btnMenu = document.getElementsByClassName("menu");
    
    
    
    
    var ls = [jogar, scor, contr];
    ls.forEach(e =>{
      e.addEventListener("touchstart", function(){
         e.removeAttribute("class");
         e.setAttribute("class", "mP2");
      });
      
      
      e.addEventListener("touchend", function(){
         e.removeAttribute("class");
         e.setAttribute("class", "mP");
      });
      
      e.addEventListener("dblclick", function(){
        jogando = true;
        menu.style.display = "none";
        game.newGame();
        
        if(e.id = "play") boot.reload();
      });
      
      
    });
      
    
     
    
    
    
    
}










var stato = {
  jogar: false,
  jogando: true,
  gameOver: false,
  
  
  JOGAR: function(){
    this.jogar   = true;
    this.jogando =  false;
    this.gameOver= false;
  },
  
  JOGANDO: function(){
    this.jogar   = false;
    this.jogando =  true;
    this.gameOver= false;
  },
  
  GAMEOVER: function(){
    this.jogar   = false;
    this.jogando = false;
    this.gameOver= true;
  }
}



grid = function(){
var x = (lar/tile);
var y = (alt/tile);


for (var i = 0; i < x*y; i++) {
  var px = Math.floor(i % x) * tile;
  var py = Math.floor(i / y) * tile;
  
  var rect = ctx.canvas.getBoundingClientRect();

  var d = document.createElement("div");
      d.setAttribute("class","grid");
      d.style.width  = tile+"px";
      d.style.height = tile+"px";
      d.style.left = px + rect.left +"px";
      d.style.top  = py + rect.top  +"px";
      
      document.body.appendChild(d);
}
}









SNIK =function(){
  this.cobra = [[0,5],[0,6]];
  this.cor = "#00C8FF";
  this.dir =[1,0];
  var ts = 1;
 
  
   this.update = function(){
     var nex = [this.cobra[0][0] + this.dir[0], this.cobra[0][1] + this.dir[1]]; 
    
     this.cobra.pop();
     this.cobra.splice(0,0, nex);
     
     if(this.cobra[0][0] <= -1) this.cobra[0][0] = Math.floor(lar/tile);
     else if(this.cobra[0][0] >=  Math.floor(lar/tile)) this.cobra[0][0] = 0;
     
     if(this.cobra[0][1] <= -1) this.cobra[0][1] = Math.floor(alt/tile);
     else if(this.cobra[0][1] >=  Math.floor(alt/tile)) this.cobra[0][1] = 0;

    
      
    /* if(this.cobra[0][0] <= 0) {this.cobra[0][0] = Math.floor(lar/tile);}
     else if(this.cobra[0][0] * tile > lar) this.cobra[0][0] = 1;
     
     if(this.cobra[0][1] <= -1) {this.cobra[0][1] = Math.floor(alt/tile);}
     else if(this.cobra[0][1] * tile > alt) this.cobra[0][1] = 0;*/

     if(jogando){
       if(key.up) this.dir = [0,-1];
       if(key.dow) this.dir = [0,1];
       if(key.left) this.dir = [-1,0];
       if(key.rigth) this.dir = [1,0];
     }
     
     else {
       
      if(this.dir[0] === 1 && this.cobra[0][0] >= (lar * .8 / tile) ) this.dir = [0,1];
      else if(this.dir[1] === 1  && this.cobra[0][1] >= (alt * .8 / tile)) this.dir = [-1,0];     
      else if(this.dir[0] === -1 && this.cobra[0][0] <= (lar * .2 / tile)) this.dir = [0,-1];  
      else if(this.dir[1] === -1 && this.cobra[0][1] <= (alt * .2 / tile)) this.dir = [1,0];     


      
       
     }
    
     
     
     
     
     
     
     if(this.cobra[0][0] === Math.floor(maca.x/tile) &&
        this.cobra[0][1] === Math.floor(maca.y/tile)){
        this.cobra.push([]);
        this.cor = maca.cor;
        for(var i = 0; i< 25; i++){
        lsP[idxP++] = new Parti({
          x: maca.x,
          y: maca.y,
          c: "#0f0"
        });
        }
        maca.newPos();
        
     }
     
     p.innerHTML = `cb: [${this.cobra[0][0]},${this.cobra[0][1]}]` + "<br/>" +
                   `m:  [${Math.floor(maca.x/tile)} ,${Math.floor(maca.y/tile)}`;
     
     
     
     
     
     
   },
   this.draw = function(){
     
     ctx.shadowBlur = 100;
     ctx.shadowColor = this.cor;
     ctx.fillStyle = this.cor;
     
     
     for(var i = 1; i < this.cobra.length; i++) {
       ctx.fillRect(this.cobra[i][0] * tile,this.cobra[i][1] * tile,tile,tile);    
        const x = this.body[i][0];
        const y = this.body[i][1];
        
        
        
        if (this.cobra[i][0] === this.cobra[0][0] &&
          this.cobra[i][1] === this.cobra[0][1]) {
          ts++;
          jogando = false;
          menu.style.display = "block";
          
        }
     }
     
     
    
     
     ctx.fillStyle = "#f00";
     ctx.shadowBlur  = 50;
     ctx.shadowColor = "#0f0"
     ctx.fillRect(this.cobra[0][0] * tile,this.cobra[0][1] * tile,tile,tile);
    
     
 
     
     
  
   }
}



Maca = function(){
  this.x = Math.floor(Math.random() * (lar/tile)) * tile;
  this.y = Math.floor(Math.random() * (alt/tile)) * tile;
  this.cor = cor[Random(0,cor.length)];
  
  this.newPos = function(){
    this.x = Math.floor(Math.random() * (lar/tile)) * tile;
    this.y = Math.floor(Math.random() * (alt/tile)) * tile;
    this.cor = cor[Random(0,cor.length)];
  }
  this.update = function(){}
  
  this.draw = function(){
    ctx.fillStyle = this.cor;
    ctx.fillRect(this.x , this.y, tile, tile);
  }
}




game = {
  newGame: function(){
    snk = new SNIK();
    maca = new Maca();
    boot = new bootLoad();
  },
  update: function(){
    tile = Math.max(Math.floor(lar/pro) , Math.floor(alt/pro));

    snk.update();
    maca.update();
    
    for(var i = 0; i< lsP.length; i++){
       lsP[i].update();
    }
  },
  draw: function(){
    ctx.clearRect(0,0,lar,alt);
    snk.draw();
    maca.draw();
    
    ctx.fillStyle = "#fff"
    ctx.font = "50px arial"
    ctx.fillText("snik",50,50);
    
    
    for(var i = 0; i< lsP.length; i++){
       lsP[i].draw();
    }
    
    
    
  },
  loop: function(){
    boot.update();
    boot.draw();
    
    if(boot.con){
       game.update();
       game.draw();
    }
    
    
    
    window.setTimeout(game.loop, fps)
  },
  
  init: function(){
    ctx = document.querySelector("canvas").getContext("2d");    
    alt = 300;
    lar = 300;
    ctx.canvas.height = alt;
    ctx.canvas.width  = lar;
    
    tile = Math.max(Math.floor(lar/pro) , Math.floor(alt/pro));
    //grid();
    console.log(ctx);
    
    //console.log(ctx);
    
    
    this.newGame();
    this.loop();
    Menu();
    
    
   /* window.addEventListener("touchstart", function(){
      for(var i = 0; i< 50; i++){
        lsP[idxP++] = new Parti({
          x: maca.x,
          y: maca.y,
          c: "#f00"
        });
        }
    });*/
    
  }
}

game.init();




