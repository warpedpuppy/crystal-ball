import * as PIXI from 'pixi.js';
export default {
    init: function() {
        const app = new PIXI.Application({
            width: 800,
            height: 600,
            backgroundColor: 0x110b3f, 
            resolution: window.devicePixelRatio || 1,
        });
       
       // document.getElementById("canvas-div").appendChild(app.view);
        document.body.appendChild(app.view);
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

        const coverTexture = PIXI.Texture.from('/bmps/cover.png');
        const cover = new PIXI.Sprite(coverTexture);
        cover.anchor.set(0.5);
        cover.x -= 1;
        container.addChild(cover);

        clouds.mask = circle;
 

        const basicText = new PIXI.Text('one-on-one\nmentoring',{fontFamily : 'Arial', fontSize: 50, fill : 0xffffff, align : 'center',fontStyle: 'italic'});
        basicText.anchor.set(0.5);
        container.addChild(basicText);
       

        basicText.mask = circle;
        container.x = app.screen.width / 2;
        container.y = app.screen.height / 2;
        

        container.pivot.x = container.width / 2;
        container.pivot.y = container.height / 2;

        const blurFilter1 = new PIXI.filters.BlurFilter();
        let count = 0;
        basicText.filters = [blurFilter1];
        

        app.ticker.add((delta) => {
            count += 0.005;
            const blurAmount = Math.cos(count);
            blurFilter1.blur = 20 * (blurAmount);
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