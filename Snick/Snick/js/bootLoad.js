






class OnLoad {
  constructor() {
    this.js = [
      "./js/joystick.js",
      "./js/som.js",
      "./js/snike.js",
      "./main.js"
    ];
    
   this.init() 
  }
  
  loadJs(idx = 0, f){
      if(idx >= this.js.length) return f(idx);
      
      const js     = document.createElement("script");    
            js.src = this.js[idx];
            js.onload = ()=>{
              this.loadJs(idx+1, f);
            }
            js.onerror = ()=>{
              console.log(`erro scrip ${this.js[idx]}`)
              this.loadJs(idx+1, f);
            }
            
            document.body.appendChild(js);
            
  }
  
  init(){
    
    
    this.loadJs(0, (idx)=>{
       console.log(`${idx} script carregado`)
    })
    
  }
}



const onLoad = new OnLoad();