








      
const lsScript    = ["./js/Parti.js","./js/drawMundo.js","./js/backgroude.js","./js/drawPlayer.js","./js/soms.js","./js/Objs.js","./js/Fases.js","./main.js"];
const lsImg       = ["./img/bg1.jpg","./mapa.png"];

/*
const AUDIO = [];
const lsAudio = [
  "./soms/video game1.mp3"
];*/


const IMG         =[];






const AUDIO = {};
const lsAudio = {
    bg: "./js/video game1.mp3"
};




function loadAudio(callback) {
    const keys = Object.keys(lsAudio);
    let loaded = 0;

    keys.forEach((key) => {
        const audio = new Audio();
        audio.src = lsAudio[key];
        audio.preload = "auto";

        audio.addEventListener("canplaythrough", () => {
            loaded++;

            AUDIO[key] = audio;

            console.log(`carregado: ${key}`);

            if (loaded === keys.length) {
                callback();
            }
        }, { once: true });

        audio.addEventListener("error", () => {
            loaded++;

            console.log(`erro ao carregar: ${key}`);

            if (loaded === keys.length) {
                callback();
            }
        });
    });
}





/*
function loadAudio(idx = 0, f) {
  if (idx >= lsAudio.length) {
    if(f) f(idx);
    return;
  }
  
  const somm = new Audio();
  somm.src = lsAudio[idx];
  
  somm.oncanplaythrough = () => {
    somm.oncanplaythrough = null;
    
    AUDIO.push(somm);
    
    console.log(`audio carregado: ${lsAudio[idx]}`);
    
    loadAudio(idx + 1, f);
  };
  
  somm.onerror = () => {
    console.log(`erro ao carregar: ${lsAudio[idx]}`);
    
    loadAudio(idx + 1, f);
  };
}
*/




function loadJs(idx =0, f){
         if(idx >= lsScript.length && f){
              f(idx);
              return;
         }

         const script = document.createElement("script");
               script.src = lsScript[idx];

               script.onload = ()=>{ loadJs(idx +1, f); return;}
               script.onerror = ()=>{
                console.log(`erro ao carregar script  ${lsScript[idx]}`);
                loadJs(idx +1, f);
                return;
               }

               document.body.appendChild(script);
    }


function loadImg(idx = 0, f){
    if(idx >= lsImg.length && f){ f(idx); return;}

    const img = new Image();
          img.src = lsImg[idx];
          img.onload = ()=>{
            console.log(`image ${lsImg[idx]} carregada`);
            IMG.push(img);
            loadImg(idx +1, f);
            return;
          }
          

          img.onerror =()=>{
            console.log(`erro image >>(${lsImg[idx]} nao carregada !)`);
            loadImg(idx+1, f);
            return;
          }
}
/*function loadAudio(idx = 0, f){
    if(idx >= lsAudio.length && f){ f(idx); return;}
    
    
    
    const som = new Audio(); 
          som.src = lsAudio[idx];
          som.onload = ()=>{
            console.log(`som ${lsAudio[idx]} carregada`);
            AUDIO.push(som);
            console.log(AUDIO)
            loadAudio(idx +1, f);
            return;
          }
          

          som.onerror =()=>{
            console.log(`erro som >>(${lsAudio[idx]} nao carregada !)`);
            loadAudio(idx+1, f);
            return;
          }
}*/






loadImg(0, (idx)=>{
   console.log(`${idx} imagens carregadas .`);
   
   /*loadAudio(0, (i) => {
     console.log(i, "soms Carregados")
   })*/
   loadAudio(() => {
      console.log("todos os áudios carregados");
      
      
   });
   
    
       
   
   loadJs(0, (id) => {
      console.log(`${id} script carregado`);
   })
})




