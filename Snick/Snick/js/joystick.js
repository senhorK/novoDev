





/*class Joystick{
  constructor(){
    this.bug   = document.querySelector(".dbug");
    this.bug   = document.querySelector(".dbug");
    this.stage = document.querySelector(".stage");     
    this.bg    = document.querySelector(".bg");
    this.joy   = document.querySelector(".joy");
    
    this.cx = 0;
    this.cy = 0; 
    this.subX = 0;
    this.subY = 0;

    this.raio = 15;
    this.touchId = null;
    this.key ={
      left:  false,
      right: false,
      up:    false,
      dow:   false
    }
    
    this.stage.addEventListener("touchstart", (e)=>{this.Dow(e);})         
    this.stage.addEventListener("touchmove", (e)=>{this.Move(e);})
    this.stage.addEventListener("touchend", (e)=>{this.End(e);})
    
    
  }
  
  
  depura() {

    
}
  
  
  

  Dow(e) {
      const touch = e.changedTouches[0];
      
      this.touchId = touch.identifier;
      
      this.cx = touch.pageX;
      this.cy = touch.pageY;
      
      this.bg.style.display = "block";
      this.joy.style.display = "block";
      
      this.bg.style.left = this.cx + "px";
      this.bg.style.top = this.cy + "px";
      
      this.joy.style.left = this.cx + "px";
      this.joy.style.top = this.cy + "px";
      this.depura();
}
  Move(e) {
        let touch = null;
        
        for (let t of e.touches) {
          if (t.identifier === this.touchId) {
            touch = t;
            break;
          }
        }
        
        if (!touch) return;
        
        const x = touch.pageX;
        const y = touch.pageY;
        
        const r = Math.sqrt(
          (x - this.cx) * (x - this.cx) +
          (y - this.cy) * (y - this.cy)
        );
        
        if (r > this.raio) {
          this.subX = x - this.cx;
          this.subY = y - this.cy;
          
          const sub = Math.sqrt(
            this.subX * this.subX +
            this.subY * this.subY
          );
          
          if (sub !== 0) {
            let ratio = 1 / sub;
            
            this.subX *= ratio * this.raio;
            this.subY *= ratio * this.raio;
          }
          
          this.joy.style.left = this.cx + this.subX + "px";
          this.joy.style.top = this.cy + this.subY + "px";
        }
        
        
        
        
        
        
        
        if (this.subX > 0) {
          this.key.left = true;
          this.key.right = false;
        }
        else {
          this.key.left = false;
          this.key.right = true;
        }
        
        if (this.subY < 0) {
          this.key.up = true;
          this.key.dow = false;
        }
        else {
          this.key.up = false;
          this.key.dow = true;
        }
        
        this.depura();
  }
  End(e) {
  for (let t of e.changedTouches) {
    if (t.identifier === this.touchId) {
      this.touchId = null;
      
      //this.subX = 0;
      //this.subY = 0;
      
      this.joy.style.left = this.cx + "px";
      this.joy.style.top = this.cy + "px";
      this.joy.style.display = "none";
      this.bg.style.display = "none"
      break;
    }
  }
  
  this.depura();
}
  
  
}*/
class Joystick {
  constructor(obj) {
    this.stage = document.createElement("div");
    this.bg = document.createElement("div");
    this.joy = document.createElement("div");
    
    
    
    this.p = document.createElement("p");
    
    this.stage.className = obj.className;
    this.bg.className = "joyBg";
    this.joy.className = "joyjoy";
    this.p.className = "p1"
    this.p.innerText = ""
    
    
    this.stage.appendChild(this.bg);
    this.stage.appendChild(this.joy);
    this.stage.appendChild(this.p);
    document.body.appendChild(this.stage);
    
    this.dbug = obj.dbug;
    
    this.subX = 0;
    this.subY = 0;
    this.cx = 0;
    this.cy = 0;
    this.raio = 15;
    this.angle = 0;
    this.force = 0;
    this.touchId = null;
    this.key = {
      left: false,
      right: false,
      top: false,
      bottom: false
    }
    
    
    this.visible = true;
    
    
    this.stage.addEventListener("pointerdown", (e) => {
      if (!this.visible) return;
      this.Dow(e);
    })
    this.stage.addEventListener("pointermove", (e) => {
      if (!this.visible) return;
      this.Move(e);
    })
    this.stage.addEventListener("pointerup", (e) => {
      if (!this.visible) return;
      this.End(e);
    })
  }
  
  
  bug() {
    this.p.innerHTML = `
       subx: ${this.subX} <br>
       suby: ${this.subY} <br>
       cx: ${this.cx} <br>
       cx: ${this.cy} <br>
       angle: ${this.angle} <br>
       forca: ${this.force} <br>
       <pre>${JSON.stringify(this.key, null, 2)}</pre> <br>
    `
    
  }
  
  
  Dow(e) {
    this.touchId = e.pointerId;
    this.stage.setPointerCapture(e.pointerId);
    
    const rect = this.stage.getBoundingClientRect();
    
    this.cx = e.pageX - rect.x;
    this.cy = e.pageY - rect.y;
    
    this.bg.style.display = "block";
    this.joy.style.display = "block";
    
    this.bg.style.left = this.cx + "px";
    this.bg.style.top = this.cy + "px";
    
    this.joy.style.left = this.cx + "px";
    this.joy.style.top = this.cy + "px";
    
    if (this.dbug) this.bug();
  }
  Move(e) {
    if (e.pointerId !== this.touchId) return;
    
    const rect = this.stage.getBoundingClientRect();
    const x = e.pageX - rect.x;
    const y = e.pageY - rect.y;
    
    this.subX = x - this.cx;
    this.subY = y - this.cy;
    
    const dist = Math.sqrt(
      this.subX * this.subX +
      this.subY * this.subY
    );
    
    
    this.angle = Math.atan2(this.subY, this.subX);
    this.force = Math.min(dist / this.raio, 1);
    
    // limita no raio
    if (dist > this.raio) {
      let ratio = this.raio / dist;
      
      this.subX *= ratio;
      this.subY *= ratio;
    }
    
    this.joy.style.left = this.cx + this.subX + "px";
    this.joy.style.top = this.cy + this.subY + "px";
    
    
    
    if (this.subX > 0) {
      this.key.left = true;
      this.key.right = false;
    }
    else {
      this.key.left = false;
      this.key.right = true;
    }
    
    if (this.subY > 0) {
      this.key.top = false;
      this.key.bottom = true;
    }
    else {
      this.key.top = true;
      this.key.bottom = false;
    }
    
    
    
    if (this.dbug) this.bug();
  }
  End(e) {
    if (e.pointerId !== this.touchId) return;
    
    this.touchId = null;
    
    //this.subX = 0;
    //this.subY = 0;
    
    this.joy.style.left = this.cx + "px";
    this.joy.style.top = this.cy + "px";
    
    this.joy.style.display = "none";
    this.bg.style.display = "none";
    
    if (this.dbug) this.bug();
  }
}



//var stick = new Joystick();
var stick = new Joystick({className:"Stage"})


/*
const stick= new Joystick({ className: "Stage1", dbug: true })
const stick1 = new Joystick({ className: "Stage2", dbug: false })
*/


