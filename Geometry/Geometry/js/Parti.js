



class Particulas {
   constructor(x,y) {
      this.x = x; 
      this.y = y;
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



