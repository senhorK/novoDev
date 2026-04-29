


var VerJogos    = document.querySelector("#VerJogos");
var VerProjetos = document.querySelector("#VerProjetos");
var abaJogos = document.querySelector(".abaJogos");
var abaProjetos = document.querySelector(".abaProjetos");   

VerJogos.addEventListener("click", () => {
  abaJogos.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

VerProjetos.addEventListener("click", () => {
  abaProjetos.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});




function verificarDiaNoite() {
    const hora = new Date().getHours();

    if (hora >= 6 && hora < 18) {
        document.querySelector("#linkCSS").href = "./styleDia.css";        
        console.log("☀️ Dia");
    } else {
        document.querySelector("#linkCSS").href = "./styleNoite.css";      
        console.log("🌙 Noite");
    }
}

verificarDiaNoite();







