





class Joystick{
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
  
  
  depura() {/*
  this.bug.innerHTML = `
    this.cx: ${this.cx} <br>
    this.cy: ${this.cy} <br>
    this.subX: ${this.subX} <br>
    this.subY: ${this.subY} <br>
    <pre>${JSON.stringify(this.key, null, 2)}</pre>

    
    `*/
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
  
  
}
var stick = new Joystick();