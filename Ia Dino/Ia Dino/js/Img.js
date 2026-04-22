class Img {

  static load() {
    Img.m = new Image();
    Img.m.src = "./200-offline-sprite.png";
  }


  static getM() { return Img.m; }

  static draw(image, x, y, w, h) {
    ctx.drawImage(Img.getM(),
      image.x, image.y,
      image.w, image.h,

      x, y, w, h
    )
  }

}