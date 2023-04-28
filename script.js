let settings = ""

class LoadingScreen extends Phaser.Scene {
    constructor(){
        super("loading");
    }
    preload(){
    }
    create(){
        this.graphics = this.add.graphics();
        this.graphics.fillStyle(0x000000, 1);
        this.graphics.fillRect(0, 0, 1000, 600);
        this.graphics.setDepth(2);
        this.tweens.add({
            targets: [this.graphics],
            alpha:0,
            duration:1000,
            ease:"Linear",
            repeat:0,
        });

        this.circle = this.add.circle(500, 300, 200, 0x47d1ff);
        this.circle.setDepth(1);
        this.rect = this.add.rectangle(500, 300, 200, 200,  0xffffff);
        this.rect.setOrigin(0.5,0.5);
        this.rect.rotation = 45;
        this.rect2 = this.add.rectangle(500, 300, 200, 200,  0xffffff);
        this.rect.setOrigin(0.5,0.5);
        this.textObject = this.add.text(
            30, 
            525, 
            "Loading", 
            {
                font:"40px",
                color:"#ffffff",
            }
        );
        this.textObject.setFontFamily('Amatic SC');
        this.timing = 0;

        if (settings == "tip1") {
            this.textObject2 = this.add.text(
                100, 
                20, 
                "Protip: When your dreaming points drop to 0, you wake up. Game over.", 
                {
                    font:"40px",
                    color:"#ffffff",
                }
            );
            this.textObject2.setFontFamily('Amatic SC');
        }
        else if (settings == "tip2") {
            this.textObject2 = this.add.text(
                220, 
                20, 
                "ProProProtip: Did you know that dreams are not real????", 
                {
                    font:"40px",
                    color:"#ffffff",
                }
            );
            this.textObject2.setFontFamily('Amatic SC');
        }

        if (settings == "tip2") {
            this.time.delayedCall(2000, ()=>{
                this.cameras.main.fadeOut(1000);
                this.time.delayedCall(1500, ()=>{      
                    this.scene.start('cutscene');
                });
            });
        }
        else {
            this.time.delayedCall(5500, ()=>{
                this.cameras.main.fadeOut(1000);
                this.time.delayedCall(1500, ()=>{      
                    console.log(settings);    
                    if(settings == "tip1") {
                        settings = "tip2";
                        this.scene.start('loading');
                    } else {
                        this.scene.start('menu');
                    }
                });
            });
        }
    }
    update(){
        this.timing += 1;
        this.rect.rotation += 0.02;
        this.rect2.rotation += 0.01;
        this.circle.radius = Math.sin(this.rect.rotation+0.5)*120;
        if (this.timing%50 == 0) {
            if (this.textObject.text.length < 10) {
                this.textObject.setText(this.textObject.text + ".");
            }
            else {
                this.textObject.setText("Loading");
            }
            this.timing = 0;
        }
    }
}

class StudioScreen extends Phaser.Scene {
    constructor(){
        super({key:"studio"});
    }
    preload(){
        this.load.path = "./assets/";
        this.load.image("background", "studioLogoBg.png");
        this.load.image("logo", "studioLogo.png");
    
    }
    create(){
        this.graphics = this.add.graphics();
        this.graphics.fillStyle(0x000000, 1);
        this.graphics.fillRect(0, 0, 1000, 600);
        this.graphics.setDepth(1);
        this.tweens.add({
            targets: [this.graphics],
            alpha:0,
            delay:2000,
            duration:2000,
            ease:"Linear",
            repeat:0,
        });

        let backgroundImg = this.add.image(
            500,
            300,
            "background",
        );
        backgroundImg.setScale(1.2);

        let logoImg = this.add.image(
            500,
            300,
            "logo",
        );
        logoImg.setScale(0.45);
        logoImg.postFX.addShadow(-0.3,1.2,0.01,1,0x000000,12,1);
        this.time.delayedCall(5000, ()=>{
            this.cameras.main.fadeOut(1000);
            this.time.delayedCall(1500, ()=>{
                this.scene.start('loading');
            });
        });
    }
    update(){}
}

class MenuScreen extends Phaser.Scene {
    constructor(){
        super({key:"menu"});
    }
    preload(){
        this.load.path = "./assets/";
        this.load.image("background2", "menuScreenBg.png");
        this.load.image("title","mockGameTitle.png");
        this.load.plugin('rexroundrectangleplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexroundrectangleplugin.min.js', true);
        this.load.plugin('rexdropshadowpipelineplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexdropshadowpipelineplugin.min.js', true);
        this.load.audio('bgMusic', "miamiSong.wav");
        this.load.audio('plink', "plink.mp3");
    }
    create(){
        this.sound.add('bgMusic', { loop: true });
        this.graphics = this.add.graphics();
        let fade = this.add.rectangle(500, 300, 1000, 600, 0x000000);
        fade.setDepth(1);
        this.tweens.add({
            targets: [fade],
            alpha:0,
            delay:1000,
            duration:1000,
            ease:"Linear",
            repeat:0,
        });

        let backgroundImg = this.add.image(
            600,
            500,
            "background2",
        );
        backgroundImg.setScale(1.2);

        let titleImg = this.add.image(
            300,
            450,
            "title",
        );
        titleImg.setScale(0.35);
        titleImg.postFX.addShadow(-0.3,1.2,0.01,1,0x000000,12,1);
        
        this.rect = this.add.rexRoundRectangle(750, 300, 350, 250, 20, 0xffffff, 1);
        this.rect.postFX.addShadow(0,0,0.02,1,0x000000,12,1);
        this.rect.postFX.addShadow(2,2,0.02,1,0x000000,12,1);
        
        this.textObject = this.add.text(
            650, 
            195, 
            "Start Dreaming\n      Options\n      Credits\n      Wake Up", 
            {
                font:"42px",
                color:"#007eed",
            }
        );
        this.textObject.setLineSpacing(10);
        this.textObject.setFontFamily('Amatic SC');
        
        this.graphics = this.add.graphics({x: -50, y: 175});
        this.graphics.fillStyle(0x007eed, 1);
        this.graphics.scaleCanvas(0.4, 0.4);
        this.graphics.setDepth(10);
        this.graphics.fillTriangle(0,50,0,150,100,100, 0xffffff, 1);

        this.tweens.add({
            targets: [this.graphics],
            x:600,
            // y:190,
            delay:2500,
            duration:1500,
            ease:"Cubic.easeOut",
            repeat:0,
        });

        this.tweens.add({
            targets: [this.graphics],
            // x:600,
            y:230,
            delay:4000,
            duration:1500,
            ease:"Cubic.easeOut",
            repeat:0,
        });

        this.tweens.add({
            targets: [this.graphics],
            // x:600,
            y:285,
            delay:5500,
            duration:1500,
            ease:"Cubic.easeOut",
            repeat:0,
        });

        this.time.delayedCall(7500, ()=>{
            this.sound.add('plink', { loop: false });
        });
        this.tweens.add({
            targets: [this.graphics],
            x:1050,
            // y:230,
            delay:7500,
            duration:1000,
            ease:"Cubic.easeOut",
            repeat:0,
        });

        // go to credits
        this.tweens.add({
            targets: [this.textObject, titleImg, this.rect],
            x:'-=1100',
            // y:230,
            delay:8000,// delay:7000,
            duration:1000,
            ease:"Cubic",
            repeat:0,
        });
        
        this.tweens.add({
            targets: [backgroundImg],
            x:320,
            // y:230,
            delay:8000,// delay:7000,
            duration:1000,
            ease:"Cubic.easeOut",
            repeat:0,
        });

        this.rectc = this.add.rexRoundRectangle(1400, 300, 325, 250, 20, 0xffffff, 1);
        this.rectc.postFX.addShadow(0,0,0.02,1,0x000000,12,1);
        this.rectc.postFX.addShadow(2,2,0.02,1,0x000000,12,1);
        
        this.textObject2 = this.add.text(
            1270, 
            195, 
            "Credits:\nPhotos By Benthan Vu\nImages By Benthan Vu\nSounds By Benthan Vu", 
            {
                font:"42px",
                color:"#007eed",
            }
        );
        this.textObject2.setLineSpacing(10);
        this.textObject2.setFontFamily('Amatic SC');

        this.tweens.add({
            targets: [this.rectc, this.textObject2],
            x:'-=900',
            // y:230,
            delay:8000,// delay:7000,
            duration:1000,
            ease:"Cubic.easeOut",
            repeat:0,
        });

        // back to menu
        this.tweens.add({
            targets: [this.textObject, titleImg, this.rect],
            x:'+=1100',
            // y:230,
            delay:12000,// delay:7000,
            duration:1000,
            ease:"Cubic",
            repeat:0,
        });

        this.tweens.add({
            targets: [backgroundImg],
            x:600,
            // y:230,
            delay:12000,// delay:7000,
            duration:1000,
            ease:"Cubic.easeOut",
            repeat:0,
        });

        this.time.delayedCall(12000, ()=>{
            this.sound.add('plink', { loop: false });
        });

        this.tweens.add({
            targets: [this.rectc, this.textObject2],
            x:'+=900',
            // y:230,
            delay:12000,// delay:7000,
            duration:1000,
            ease:"Cubic.easeOut",
            repeat:0,
        });

        //bring cursor back and go to start game
        this.tweens.add({
            targets: [this.graphics],
            x:600,
            // y:190,
            delay:13500,
            duration:1500,
            ease:"Cubic.easeOut",
            repeat:0,
        });

        this.tweens.add({
            targets: [this.graphics],
            // x:600,
            y:285,
            delay:15000,
            duration:1500,
            ease:"Cubic.easeOut",
            repeat:0,
        });

        this.tweens.add({
            targets: [this.graphics],
            // x:600,
            y:230,
            delay:16500,
            duration:1500,
            ease:"Cubic.easeOut",
            repeat:0,
        });

        this.tweens.add({
            targets: [this.graphics],
            // x:600,
            y:175,
            delay:18000,
            duration:1500,
            ease:"Cubic.easeOut",
            repeat:0,
        });

        this.tweens.add({
            targets: [this.graphics],
            x:1050,
            // y:230,
            delay:19500,
            duration:1000,
            ease:"Cubic.easeOut",
            repeat:0,
        });

        this.time.delayedCall(20500, ()=>{
            this.cameras.main.fadeOut(1000);
            this.time.delayedCall(1500, ()=>{
                settings = "tip1";
                this.scene.start('loading');
                // go_to_scene(this,'loading','tip1')
            });
        });
    }
    update(){}
}

class CutsceneScreen extends Phaser.Scene {
    constructor(){
        super({key:"cutscene"});
    }
    preload(){
        this.load.path = "./assets/";
        this.load.image("cloud", "cloud.png");
        this.load.image("character", "character.png");
        this.load.plugin('rexroundrectangleplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexroundrectangleplugin.min.js', true);
        this.load.audio('bgMusic', "miamiSong.wav");
        this.load.audio('plink', "plink.mp3");
    }
    create(){

        this.textbox = this.add.rexRoundRectangle(250, 1000, 450, 100, 20, 0xffffff, 1);
        this.textbox.postFX.addShadow(0,0,0.02,1,0x000000,12,1);
        this.textbox.postFX.addShadow(2,2,0.02,1,0x000000,12,1);
        this.textbox.setDepth(4);
        
        this.textObject = this.add.text(
            50, 
            980, 
            "Hello?", 
            {
                font:"42px",
                color:"#007eed",
            }
        );
        this.textObject.setFontFamily('Amatic SC');
        this.textObject.setDepth(5);

        this.tweens.add({
            targets: [this.textbox, this.textObject],
            y: '-=475',
            delay:1000,
            duration:1000,
            ease:"Cubic.easeOut",
            repeat:0,
        });

        this.time.delayedCall(3000, ()=>{
            this.textObject.y = 980;
            this.textObject.text = "You must have fallen asleep again.";
            this.tweens.add({
                targets: [this.textObject],
                y: '-=475',
                delay:1000,
                duration:1000,
                ease:"Cubic.easeOut",
                repeat:0,
            });
            this.time.delayedCall(3000, ()=>
            {
                this.textObject.y = 980;
                this.textObject.text = "Open your eyes.";
                this.tweens.add({
                    targets: [this.textObject],
                    y: '-=475',
                    delay:1000,
                    duration:1000,
                    ease:"Cubic.easeOut",
                    repeat:0,
                });
                this.time.delayedCall(3000, ()=>
                {
                    this.textObject.y = 980;
                    this.textObject.text = "Bruh where am I?";
                    this.tweens.add({
                        targets: [this.textbox],
                        y: '+=475',
                        delay:1000,
                        duration:1000,
                        ease:"Cubic.easeOut",
                        repeat:0,
                    });
                });
            });
        });


        this.rect = this.add.rectangle(500, 150, 1000, 300,  0x000000);
        this.rect.setOrigin(0.5,0.5);
        this.rect.setDepth(3);
        this.rect2 = this.add.rectangle(500, 450, 1000, 300,  0x000000);
        this.rect2.setOrigin(0.5,0.5);
        this.rect2.setDepth(3);

        this.tweens.add({
            targets: [this.rect,],
            y: -200,
            delay:14500,
            duration:1000,
            ease:"Sine.easeIn",
            repeat:0,
        });

        this.tweens.add({
            targets: [this.rect2],
            y: 900,
            delay:14500,
            duration:1000,
            ease:"Sine.easeIn",
            repeat:0,
        });

        this.tweens.add({
            targets: [this.textbox, this.textObject],
            y: '-=475',
            delay:16000,
            duration:1000,
            ease:"Cubic.easeOut",
            repeat:0,
        });

        this.graphics = this.add.graphics();
        this.graphics.fillGradientStyle(0xfffa96, 0x69e8ff, 0x69e8ff, 0x204eba);
        this.graphics.fillRect(0, 0, 1000, 600);

        let cloud4 = this.add.image(
            590,
            500,
            "cloud",
        );
        cloud4.setScale(-1.2);
        cloud4.postFX.addShadow(-0.3,1.2,0.01,1,0x000000,12,1);
        let cloud5 = this.add.image(
            200,
            350,
            "cloud",
        );
        cloud5.setScale(0.75);
        cloud5.postFX.addShadow(-0.3,1.2,0.01,1,0x000000,12,1);
        let cloud1 = this.add.image(
            500,
            400,
            "cloud",
        );
        cloud1.setScale(0.75);
        cloud1.postFX.addShadow(-0.3,1.2,0.01,1,0x000000,12,1);
        let cloud2 = this.add.image(
            0,
            500,
            "cloud",
        );
        cloud2.setScale(0.8);
        cloud2.setDepth(1);
        cloud2.postFX.addShadow(-0.3,1.2,0.01,1,0x000000,12,1);
        let cloud3 = this.add.image(
            1000,
            490,
            "cloud",
        );
        cloud3.setScale(-0.8);
        cloud3.postFX.addShadow(-0.3,1.2,0.01,1,0x000000,12,1);

        // let character = this.add.image(
        //     300,
        //     350,
        //     "character",
        // );
        // character.setScale(0.4);
        // character.postFX.addShadow(-0.3,1.2,0.01,1,0x000000,12,1);
        // character.setDepth(0);

        this.textbox2 = this.add.rexRoundRectangle(500, -300, 450, 200, 20, 0xffffff, 1);
        this.textbox2.postFX.addShadow(0,0,0.02,1,0x000000,12,1);
        this.textbox2.postFX.addShadow(2,2,0.02,1,0x000000,12,1);
        this.textbox2.setDepth(6);
        
        this.textObject2 = this.add.text(
            350, 
            -325, 
            "End of Cinematic", 
            {
                font:"42px",
                color:"#FF0000",
            }
        );
        this.textObject2.setFontFamily('Amatic SC');
        this.textObject2.setDepth(7);

        this.tweens.add({
            targets: [this.textbox2, this.textObject2],
            y: '+=475',
            delay:18000,
            duration:1000,
            ease:"Cubic.easeOut",
            repeat:0,
        });


        // this.time.delayedCall(5000, ()=>{
        //     this.cameras.main.fadeOut(1000);
        //     this.time.delayedCall(1500, ()=>{
        //         this.scene.start('loading');
        //     });
        // });
    }
    update(){}
}

let config = {
    type: Phaser.WEBGL,
    width: 1000,
    height: 600,
    backgroundColor: 0x47d1ff,
    scene: [StudioScreen, LoadingScreen, MenuScreen, CutsceneScreen],
    // scene: [MenuScreen]
    // scene: [StudioScreen, LoadingScreen, MenuScreen]
    // scene: [LoadingScreen] //[StudioScreen, LoadingScreen]
    // scene: [LoadingScreen] //[StudioScreen, LoadingScreen]

}

// function go_to_scene(self, scene_name, settings=""){
//     if (settings.length == 0){
//         self.scene.start(scene_name);
//     }
// }

let game = new Phaser.Game(config);