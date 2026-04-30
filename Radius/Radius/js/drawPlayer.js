




function getDirecao(o) {
  const { x, y, size, rot } = o;
  
  const forward = size / 2 + 20;
  
  const cos = Math.cos(rot);
  const sin = Math.sin(rot);
  
  const bx = x + cos * forward;
  const by = y + sin * forward;
  
  const sideX = -sin;
  const sideY = cos;
  
  return { bx, by, cos, sin, sideX, sideY };
}

function calibre1(o) {
  const { balas = [], rot = 0 } = o;
  o.disparoMinuto = 5;

  const { bx, by } = getDirecao(o);

  const base = { w: 3, h: 10, rot, c: "#fff" };

  balas.push(new Balas({ ...base, x: bx, y: by }));
}
function calibre2(o) {
  const { balas = [], rot = 0 } = o;
  o.disparoMinuto = 3;
  
  const { bx, by } = getDirecao(o);
  
  const base = { w: 3, h: 10, rot, c: "#f00" };
  
  balas.push(new Balas({ ...base, x: bx, y: by }));
}
function calibre3(o) {
  const { balas = [], rot = 0 } = o;
  o.disparoMinuto = 3;
  
  const { bx, by, sideX, sideY } = getDirecao(o);
  
  const base = { w: 3, h: 10, rot, c: "#F8FF14" };
  const side = 15;
  
  balas.push(new Balas({
    ...base,
    x: bx + sideX * side,
    y: by + sideY * side
  }));
  
  balas.push(new Balas({
    ...base,
    x: bx - sideX * side,
    y: by - sideY * side
  }));
}
function calibre4(o) {
  const { balas = [], rot = 0 } = o;
  o.disparoMinuto = 3;
  
  const { bx, by, sideX, sideY } = getDirecao(o);
  
  const base = { w: 3, h: 20, rot, c: "#14FF14" };
  const side = 20;
  
  // tiro central
  balas.push(new Balas({ ...base, x: bx, y: by }));
  
  // laterais
  balas.push(new Balas({
    ...base,
    x: bx + sideX * side,
    y: by + sideY * side
  }));
  
  balas.push(new Balas({
    ...base,
    x: bx - sideX * side,
    y: by - sideY * side
  }));
}
function leque3(o) {
  const { balas = [], rot = 0 } = o;
  o.disparoMinuto = 3;
  
  const { bx, by } = getDirecao(o);
  
  const base = { w: 5, h: 20, c: "#E27DFF" };
  const spread = 0.25;
  
  balas.push(new Balas({ ...base, x: bx, y: by, rot: rot - spread }));
  balas.push(new Balas({ ...base, x: bx, y: by, rot: rot }));
  balas.push(new Balas({ ...base, x: bx, y: by, rot: rot + spread }));
  
  part.add(bx, by, 1, "#DC60FF");
}


function Player1(o) {
  const {
    x = 0,
    y = 0,
    rot = 0,
    size = 40
  } = o;
  
  const parts = [
        Math.PI / 4,
        Math.PI * 0.9,
        Math.PI * 1.6
  ];
  
  for (var i = 0; i < parts.length; i++) {
          var ang = parts[i];
          const isHead = i === 2;
          const cor = isHead ? "#FF00008C" : "#FFFFFFED";
          
      
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(ang + rot);
          
          app.draw.rect({
            ctx,
            x: 0,
            y: 0,
            w: size,
            h: size,
            cor: cor,
      
          });
          
          ctx.restore();
      }

}
function Player2(o) {
  const {
      x = 0,
      y = 0,
      rot = 0,
      rot2 = 0,
      size = 40
  } = o;
  
  const parts = [
      Math.PI / 4,
      Math.PI * 0.9,
      Math.PI * 1.6
  ];
  
  
  
  
  
  
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot+44.7);
  
  // corpo (uma vez só)
  app.draw.rect({
    ctx,
    x: -size / 2 + 1,
    y: -size / 2 - 1,
    w: size,
    h: size,
    cor: "#f00"
  });
  
  app.draw.rect({
    ctx,
    x: -size / 2,
    y: -size / 2,
    w: size,
    h: size,
    cor: "#FFFFFFED"
  });
  
  // órbita
  const total = 4;
  const radius = 20;
  
  for (let i = 0; i < total; i++) {
    let ang = (Math.PI * 2 / total) * i + rot2;
    
    let tx = Math.cos(ang) * radius;
    let ty = Math.sin(ang) * radius;
    
    app.draw.circle({
      ctx,
      x: tx,
      y: ty,
      size: 5,
      cor: "#00ffff"
    });
  }
  
  ctx.restore();
}
function Player3(o) {
  const {
      x = 0,
      y = 0,
      rot = 0,
      rot2 = 0,
      size = 40
  } = o;
  
  
  const parts = [
       Math.PI / 4,
       Math.PI * 0.9,
       Math.PI * 1.6
     ];
  
  
  for (var i = 0; i < parts.length; i++) {
    var ang = parts[i];
    const isHead = i === 2;
    const cor = isHead ? "#FF00008C" : "#FFFFFFED";
    
    
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(ang + rot + 44.5);
    
    app.draw.rect({
      ctx,
      x: 0,
      y: 0,
      w: size,
      h: size,
      cor: cor,
      
    });
    
    ctx.restore();
  }
  
  
  
  
  
  
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  
  // corpo (uma vez só)

  // órbita
  const total = 4;
  const radius = 30;
  
  for (let i = 0; i < total; i++) {
    let ang = (Math.PI * 2 / total) * i + rot2;
    
    let tx = Math.cos(ang) * radius;
    let ty = Math.sin(ang) * radius;
    
    app.draw.circle({
      ctx,
      x: tx,
      y: ty,
      size: 5,
      cor: "#0f0"
    });
  }
  
  ctx.restore();
}
function Player4(o) {
  const {
    x = 0,
    y = 0,
    rot = 0,
    rot2 = 0,
    size = 40
  } = o;

  const ctxBase = ctx;

  ctxBase.save();
  ctxBase.translate(x, y);
  ctxBase.rotate(rot);

  // centro da nave
  app.draw.rect({
    ctx,
    x: -size / 2,
    y: -size / 2,
    w: size,
    h: size,
    cor: "#FFFFFFED"
  });

  // asas simétricas (120° entre elas)
  const arms = 3;
  const armRadius = size * 0.8;

  for (let i = 0; i < arms; i++) {
    let ang = (Math.PI * 2 / arms) * i - rot2;

    let tx = Math.cos(ang) * armRadius;
    let ty = Math.sin(ang) * armRadius;

    ctxBase.save();
    ctxBase.translate(tx, ty);
    ctxBase.rotate(ang + Math.PI / 2);

    app.draw.rect({
      ctx,
      x: -size / 4,
      y: -size / 4,
      w: size / 2,
      h: size / 2,
      cor: "#FF00008C"
    });

    ctxBase.restore();
  }

  // órbita limpa
  const total = 4;
  const radius = 25;

  for (let i = 0; i < total; i++) {
    let ang = (Math.PI * 2 / total) * i + rot2;

    let tx = Math.cos(ang) * radius;
    let ty = Math.sin(ang) * radius;

    app.draw.circle({
      ctx,
      x: tx,
      y: ty,
      size: 5,
      cor: "#00ff88"
    });
  }

  ctxBase.restore();
}
function Player5(o) {
  const {
    x = 0,
    y = 0,
    rot = 0,
    rot2 = 0,
    size = 40
  } = o;
  
  
  const parts = [
        Math.PI / 4,
        Math.PI * 0.9,
        Math.PI * 1.6
  ];
  
  ctx.save()
  ctx.translate(x,y)
  ctx.rotate(rot +44.8)
  
  app.draw.rect({
        ctx,
        x: -size/2,
        y: -size/2,
        w: size,
        h: size,
        cor: "#2B6AFF",
  });
  
  
  // Cano 1
  ctx.save()
  ctx.rotate(45)
  app.draw.rect({ctx, x: -size, y: -size/3,w: 2,h: size,cor: "#f00",});
  ctx.restore()
  
  // Cano 2
  ctx.save()
  ctx.rotate(44.7)
  app.draw.rect({ctx,x: size,y: -size/3, w: 2, h: size,cor: "#f00",});
  ctx.restore()
  
  
  //órbita 
  const total = 3;
  const radius = 30;
  
  for(var i = 0; i < total; i++) {
     let ang = (Math.PI * 2 / total) * i + rot2;
     let tx = Math.cos(ang) * radius;
     let ty = Math.sin(ang) * radius;
     
     app.draw.circle({
      ctx,
      x: tx,
      y: ty,
      size: 5,
      cor: "#FFFC36"
    });
  }
  
  ctx.restore()
}

function Player6(o) {
  const {
    x = 0,
      y = 0,
      rot = 0,
      rot2 = 0,
      size = 40
  } = o;
  
  
  const parts = [
    Math.PI / 4,
    Math.PI * 0.9,
    Math.PI * 1.6
  ];
  
  var scale = 0.06;
  var ww = 700 * scale;
  var hh = 723 * scale;
  
  
  ctx.save()
  ctx.translate(x,y)
  ctx.rotate(rot)
  ctx.drawImage(img,
    0,0,
    700, 723,
    -ww/2, -hh/2,
    ww,hh
  )
  
  ctx.restore()
}
