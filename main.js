





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




