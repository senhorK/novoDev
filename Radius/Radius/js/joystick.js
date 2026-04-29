



class Joystick{
  constructor(obj) {
    this.stage = document.createElement("div");   
    this.bg    = document.createElement("div");   
    this.joy   = document.createElement("div");   
    
        
    
    this.p     = document.createElement("p");
    
    this.stage.className = obj.className;
    this.bg.className = "joyBg";
    this.joy.className = "joyjoy";
    this.p.className   = "p1"
    this.p.innerText   = ""
    
        
    this.stage.appendChild(this.bg);
    this.stage.appendChild(this.joy);
    this.stage.appendChild(this.p);
    document.body.appendChild(this.stage);
    
    this.dbug = obj.dbug;
    
    this.subX = 0; 
    this.subY = 0;
    this.cx   = 0;
    this.cy   = 0;
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
    
    
    this.stage.addEventListener("pointerdown", (e)=>{
      if(!this.visible) return;
      this.Dow(e);
    })         
    this.stage.addEventListener("pointermove", (e)=>{
      if(!this.visible) return;
      this.Move(e);
    })
    this.stage.addEventListener("pointerup", (e)=>{
      if(!this.visible) return;
      this.End(e);
    })
  }
  
  
  bug(){
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
      
      
      this.angle = Math.atan2(this.subY,this.subX);
      this.force = Math.min(dist / this.raio, 1);
      
      // limita no raio
      if (dist > this.raio) {
        let ratio = this.raio / dist;
        
        this.subX *= ratio;
        this.subY *= ratio;
      }
      
      this.joy.style.left = this.cx + this.subX + "px";
      this.joy.style.top = this.cy + this.subY + "px";
      
      
      
      if(this.subX > 0){
        this.key.left = true;
        this.key.right = false;
      }
      else{
        this.key.left = false;
        this.key.right = true;
      }
      
      if(this.subY > 0){
        this.key.top    = false;
        this.key.bottom = true;
      }
      else{
        this.key.top = true;
        this.key.bottom = false;
      }
      
      
      
      if (this.dbug) this.bug();
    }
    End(e) {
      if (e.pointerId !== this.touchId) return;
      
      this.touchId = null;
      
      this.subX = 0;
      this.subY = 0;
      
      this.joy.style.left = this.cx + "px";
      this.joy.style.top = this.cy + "px";
      
      this.joy.style.display = "none";
      this.bg.style.display = "none";
      
      if (this.dbug) this.bug();
    }
}

//const stick = new Joystick({className:"Stage"})
