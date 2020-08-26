import * as PIXI from 'pixi.js';
export default {
    init: function() {
        const app = new PIXI.Application({
            width: 800, height: 600, backgroundColor: 0x110b3f, resolution: window.devicePixelRatio || 1,
        });
        document.body.appendChild(app.view);
        
        const container = new PIXI.Container();
        
        app.stage.addChild(container);
        
        // Create a new texture

        const cloudTexture = PIXI.Texture.from('/bmps/clouds.png');

        const clouds = new PIXI.Sprite(cloudTexture);
        clouds.alpha = 0.5;
        clouds.anchor.set(0.5);
        clouds.scale.set(0.5)
        container.addChild(clouds);


        const circleTexture = PIXI.Texture.from('/bmps/circle.png');
        
        const circle = new PIXI.Sprite(circleTexture);
        //circle.scale.set(0.5)
        circle.anchor.set(0.5);
        container.addChild(circle);

        const coverTexture = PIXI.Texture.from('/bmps/cover.png');

        const cover = new PIXI.Sprite(coverTexture);
        cover.anchor.set(0.5);
        cover.x -= 1;

        container.addChild(cover);

        clouds.mask = circle;
        // Create a 5x5 grid of bunnies

        const basicText = new PIXI.Text('one-on-one\nmentoring');
        basicText.anchor.set(0.5);
        container.addChild(basicText);
       
        console.log(basicText.width)

        basicText.mask = circle;
        // Move container to the center
        container.x = app.screen.width / 2;
        container.y = app.screen.height / 2;
        
        // Center bunny sprite in local container coordinates
        container.pivot.x = container.width / 2;
        container.pivot.y = container.height / 2;

        const blurFilter1 = new PIXI.filters.BlurFilter();
        let count = 0;
        basicText.filters = [blurFilter1];
        
        // Listen for animate update
        app.ticker.add((delta) => {
            count += 0.005;
            const blurAmount = Math.cos(count);
            blurFilter1.blur = 20 * (blurAmount);
            // rotate the container!
            // use delta to create frame-independent transform
            //container.rotation -= 0.01 * delta;
            let newScale = this.cosWave(1, 0.25, 0.0005);
            clouds.scale.set(Math.abs(newScale))
            clouds.rotation -= 0.001 * newScale;
        });
        
    },
    cosWave: function (startPoint, differential, speed) {
        //place in an onEnterFrame Handler0.0015

        var currentDate = new Date();
        return startPoint + (Math.cos(currentDate.getTime() * speed) * differential);
    },



}