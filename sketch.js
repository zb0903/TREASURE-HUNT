var PLAY = 1;
var END = 0;
var gameState = PLAY;

var path,boy,cash,diamonds,jwellery,sword,gameOver;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg, gameOverImage;
var treasureCollection = 0, lives = 3;
var cashG,diamondsG,jwelleryG,swordGroup;
var winSound, lostSound, boostSound, backgroundSound;
var lifeLost;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  gameOverImage =loadImage("gameOver.png");
  
  boostSound = loadSound("boost.wav");
  lostSound = loadSound("lost.wav");
  winSound = loadSound("win.wav");
  backgroundSound = loadSound("background.mp3") 
  
  
}

function setup(){
  
  backgroundSound.loop();
  
  createCanvas(400,400);
  // Moving background
  path=createSprite(200,200);
  path.addImage(pathImg);

  //creating boy running
  boy = createSprite(70,330,20,20);
  boy.addAnimation("SahilRunning",boyImg);
  boy.scale=0.08;

  gameOver = createSprite(200,200);
  gameOver.addImage(gameOverImage);


  cashG=new Group();
  diamondsG=new Group();
  jwelleryG=new Group();
  swordGroup=new Group();
  
  lifeLost = false;
  
  boy.setCollider("circle",0,0,700);
  //boy.debug = true

}

function draw() {

  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  
  if(gameState === PLAY){
     gameOver.visible = false;
     
     path.velocityY = 4;
     
     createCash();
     createDiamonds();
     createJwellery();
     createSword();
    
  //code to reset the background
  if(path.y > 400 ){
     path.y = height/2;
   }
  
  if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection + 1
      winSound.play();
  }
    
  if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection + 1
      winSound.play();     
    }
    
    
  if(jwelleryG.isTouching(boy)) {
     jwelleryG.destroyEach();
     treasureCollection = treasureCollection + 1
     winSound.play();
    }
    
    if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
        lives = lives - 1
        lifeLost = true;
        lostSound.play();
        

       
    }
        if (lives <= 0) {
            gameState = END;
            lostSound.play();
        }
        if (treasureCollection%20 === 0 && treasureCollection > 0) {
            boostSound.play();
       }
     }
   
  
     else if (gameState === END) {
              path.velocityY = 0
              gameOver.visible = true;
              cashG.setVelocityYEach(0);
              diamondsG.setVelocityYEach(0);
              jwelleryG.setVelocityYEach(0);
              swordGroup.setVelocityYEach(0);
              cashG.setLifetimeEach(-1);
              diamondsG.setLifetimeEach(-1);
              jwelleryG.setLifetimeEach(-1);
              swordGroup.setLifetimeEach(-1);     
    }
  
    drawSprites();
    textSize(20);
    fill(255);
    text("Treasure: "+ treasureCollection,50,30);
    if (lifeLost){
       textSize(15);
       fill(200);
       text("Lives: ",50,60);
       textSize(30);
       fill("red");
       text( lives, 100,60);
    }
    else{
       textSize(15);
       fill(200);
       text("Lives: "+ lives, 50,60);
    }
   
   
  
    /*if (lifeLost){
        textSize(10);
        fill(200);
        text("YOU LOST A LIFE!",150,200);
        lifeLost = false;
    }*/

}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
      cash.addImage(cashImg);
      cash.scale=0.12;
      cash.velocityY = 3;
      cash.lifetime = 150;
      cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
      var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
      diamonds.addImage(diamondsImg);
      diamonds.scale=0.03;
      diamonds.velocityY = 3;
      diamonds.lifetime = 150;
      diamondsG.add(diamonds);
  }
}

function createJwellery() {
  if (World.frameCount % 100 == 0) {
      var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
      jwellery.addImage(jwelleryImg);
      jwellery.scale=0.13;
      jwellery.velocityY = 3;
      jwellery.lifetime = 150;
      jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
      var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
      sword.addImage(swordImg);
      sword.scale=0.1;
      sword.velocityY = 3;
      sword.lifetime = 150;
      swordGroup.add(sword);
  }
}