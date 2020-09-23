import * as PIXI from 'pixi.js';

export default {
    init: function() {

        
        const app = new PIXI.Application({
            width: 750,
            height: 699,
            resolution: window.devicePixelRatio || 1,
            transparent: true
        });
       
        const blurFilter = new PIXI.filters.BlurFilter();
        let maxBlur = 20,
            blurAmount = maxBlur, 
            pauseCounter = 0, 
            pauseAmount = 2, 
            fadeQ = -0.25, 
            alphaQ = 0.01,
            fadeIn = true,
            pause = false,
            fadeOut = true;



             
        document.getElementById("canvas-div").appendChild(app.view);
        const container = new PIXI.Container();
        app.stage.addChild(container);

   
        
        const cloudTexture = PIXI.Texture.from('/bmps/clouds.png');
        const clouds = new PIXI.Sprite(cloudTexture);
        clouds.alpha = 0.5;
        clouds.anchor.set(0.5);
        clouds.scale.set(0.5)
        container.addChild(clouds);

        const circleTexture = PIXI.Texture.from('/bmps/circle.png');
        const circle = new PIXI.Sprite(circleTexture);
        circle.anchor.set(0.5);
        container.addChild(circle);

        const videoTexture = PIXI.Texture.from('https://walthermidcoast.s3.amazonaws.com/Annabelle+Gurwitch-Circle3.mp4');
        videoTexture.muted = true;
        const videoSprite = new PIXI.Sprite( videoTexture );
        videoSprite.anchor.set(0.5);

        videoSprite.width = videoSprite.height = 700;

        /**@type {HTMLVideoElement}*/
    
        const videoControler = videoSprite.texture.baseTexture.resource.source;
        videoControler.loop = true;
        videoControler.autoplay = true;
        videoControler.muted = true;
        videoControler.play();

        videoSprite.mask = circle;

       

        let graphicTexture1 = PIXI.Texture.from(`/bmps/v2/graphic_1.png`);
        let graphicTexture2 = PIXI.Texture.from(`/bmps/v2/graphic_2.png`);
        let graphicTexture3 = PIXI.Texture.from(`/bmps/v2/graphic_3.png`);
        let graphicTexture4 = videoTexture;
        graphicTexture4.mask = circle;
//
        let textures = [graphicTexture1, graphicTexture2, graphicTexture3, graphicTexture4];
        let textureCounter = 0;

        let graphic = new PIXI.Sprite(textures[0]);
        graphic.anchor.set(0.5);
        graphic.alpha = 0;
        container.addChild(graphic);
        graphic.mask = circle;
        graphic.filters = [blurFilter];

        const coverTexture = PIXI.Texture.from('/bmps/cover.png');
        const cover = new PIXI.Sprite(coverTexture);
        cover.anchor.set(0.5);
        cover.x -= 1;
        container.addChild(cover);
        clouds.mask = circle;
    
        container.x = app.screen.width / 2;
        container.y = app.screen.height / 2;
        container.pivot.x = container.width / 2;
        container.pivot.y = container.height / 2;
        
        app.ticker.add((delta) => {

            if (fadeIn) {
                //console.log("fadeIn")
                blurAmount += fadeQ;
                if(graphic.alpha < 1) graphic.alpha += alphaQ;
                if(blurAmount < 0) {
                    fadeIn = false;
                    fadeOut = false;
                    pause = true;
                }
                
            } else if (pause) {
               // console.log("pause")
                pauseCounter += .01;
                graphic.alpha = 1;
                if (pauseCounter > pauseAmount) {
                    fadeIn = false;
                    fadeOut = true;
                    pause = false;
                }
            } else if (fadeOut) {
                //console.log("fade out")
                blurAmount -= fadeQ;
                if (graphic.alpha > 0) graphic.alpha -= alphaQ;
                if (blurAmount > maxBlur) {
                    
                    pause = false;
                    blurAmount = maxBlur;
                    pauseCounter = 0;
                    textureCounter ++;
                    if (textureCounter > textures.length - 1) {
                        textureCounter = 0;
                    }
                    graphic.texture = textures[textureCounter]
                    if (textures[textureCounter] === graphicTexture4) {

                        graphic.width = graphic.height = 600;
                    } else {
                        graphic.scale.set(1)
                    }
                    fadeIn = true;
                    fadeOut = false;
                }

            }
            
            blurFilter.blur = (blurAmount);
            let newScale = this.cosWave(1, 0.25, 0.0005);
            clouds.scale.set(Math.abs(newScale))
            clouds.rotation -= 0.001 * newScale;
        });
        
        
    },
    cosWave: function (startPoint, differential, speed) {
        var currentDate = new Date();
        return startPoint + (Math.cos(currentDate.getTime() * speed) * differential);
    },



}