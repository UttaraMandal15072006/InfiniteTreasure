var path,path2,path3,boy,cash,diamonds,jwellery,sword,coin;
var pathImg,boyImg,cashImg,diamondsImg;
var jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup,coinG;
var restart, restart_Img;
var coin,coinImg,coinG;
var gift, backGround;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload()
{
  pathImg = loadImage("icy path.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadImage("gameOver.png");
  restart_Img=loadAnimation("donut1.png","donut2.png");
  coinImg=loadAnimation("coin1.png","coin22.png","coin3.png","coin4.png","coin5.png","coin6.png");
  gift=loadSound("vibrant_game_positive_achievement_1.mp3");
  backGround=loadSound("wave.mp3");
}

function setup()
{
  
    createCanvas(windowWidth,windowHeight);
    // Moving background
    path=createSprite(windowWidth/2,windowHeight/2,windowWidth,windowHeight);
    path.addImage("path1",pathImg);
    path.velocityY = 4+treasureCollection/50;

    path2=createSprite(windowWidth/6.5,windowHeight/2,windowWidth,windowHeight);
    path2.addImage("Path2",pathImg);
    path2.velocityY = 4+treasureCollection/50;
    path2.velocityY = 4+treasureCollection/50;
    

    path3=createSprite(windowWidth-200,windowHeight/2,windowWidth,windowHeight);
    path3.addImage("Path2",pathImg);
    path3.velocityY = 4+treasureCollection/50;

    //creating boy running
    boy = createSprite(windowWidth+70,windowHeight-80,20,20);
    boy.addAnimation("SahilRunning",boyImg);
    boy.scale=0.08;
  
    //restart the game
   restart=createSprite(50,50);
    restart.x=windowWidth/9;
    restart.y=windowHeight/9;
    restart.addAnimation("restart",restart_Img);
    restart.scale=0.8;
    restart.visible=true;
  
    cashG=new Group();
    diamondsG=new Group();
    jwelleryG=new Group();
    swordGroup=new Group();
    //coinsG=new Group();
    //coinG=new Group();
}

function draw() 
{
  path.rotation=90;
  path.scale=1.3;
  console.log(gameState);
  path2.rotation=270;
  path2.scale=1.3;
  path3.rotation=270;
  path3.scale=1.3;

  if(gameState===PLAY)
  {
      background(0);
      drawSprites();
      boy.x = World.mouseX;
      boy.setCollider("circle",0,0,300);
  
      edges= createEdgeSprites();
      boy.collide(edges);

      //code to reset the background
      if(path.y > 400 )
      {
        path.y = height/6;
      }
      if(path2.y > 400 )
      {
        path2.y = height/6;
      }
      if(path3.y > 400 )
      {
        path3.y = height/6;
      }
  
      createCash();
      createDiamonds();
      createJwellery();
      createSword();
      //spawnCoins();
     
      /*if(coinG.isTouching(boy));
      {
        //coinG.destroyEach();
        //treasureCollection=+80;
      } */
      //treasureCollection=0;
    
      if (cashG.isTouching(boy)) 
      {
        cashG.destroyEach();
        gift.play();

        treasureCollection=treasureCollection+100;
      }
      else if (diamondsG.isTouching(boy)) 
      {
        diamondsG.destroyEach();
        gift.play();

        treasureCollection=treasureCollection+150;

      }
      else
      if(jwelleryG.isTouching(boy))
      {
        jwelleryG.destroyEach();
        gift.play();
        treasureCollection=treasureCollection+200;
      }
      else if(swordGroup.isTouching(boy)) 
      {
        gameState="END";
        backGround.stop();
        treasureCollection=treasureCollection+0;
        //the game is to be restart
      }
    }    
      else if(gameState==="END")
      {
        //path and all the sprites will stop running 
        path.velocityY=0;
        path2.velocityY=0;
        path3.velocityY=0;
        //coinG.seVelocityYEach(0);
        cashG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        jwelleryG.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);
        
        //destroy all the sprites
        cashG.destroyEach();
        diamondsG.destroyEach();
        jwelleryG.destroyEach();
        swordGroup.destroyEach();
        
        //prevent all the sprites from disappearing
        boy.lifetime=-1;
        path.lifetime=-1;
        cashG.setLifetimeEach(-1);
        diamondsG.setLifetimeEach(-1);
        swordGroup.setLifetimeEach(-1);
        //coinG.setLifetimeEach(-1);
        restart1();
      }
    textSize(20);
    stroke(255, 204, 0);
    fill("yellow");
    strokeWeight(2);
    text("Treasure: "+ treasureCollection,windowWidth-windowWidth/2,windowHeight/9);

  restart1();
  textSize(20);
  stroke("navy");
  fill("blue");
  text("PLAY",windowWidth/5,windowHeight/8);
}

function createCash()
{
  if (World.frameCount % windowHeight == 0) 
  {
    // make cash in random position in every 200 frames 
    var cash = createSprite(200,40, 10, 10);
    cash.x=Math.round(random(windowWidth/100,windowWidth));
    cash.addImage(cashImg);
    cash.scale=0.12;
    cash.velocityY = 3+treasureCollection/600;
    cash.lifetime = 200;
    cashG.add(cash);
  }
}

function createDiamonds() 
{
  if (World.frameCount % 120 == 0) 
  {
    /*make diamonds in random positions in every 320     
    frames*/
    var diamonds = createSprite(20,40, 10, 10);
    diamonds.x=Math.round(random(windowWidth/100,windowWidth));
    diamonds.addImage(diamondsImg);
    diamonds.scale=0.03;
    diamonds.velocityY = 3+treasureCollection/600;
    diamonds.lifetime = 200;
    diamondsG.add(diamonds);
  }
}

function createJwellery() 
{
  if (World.frameCount % 70 == 0) 
  {
    /*make jwellery in every 410 frames in random x
    position*/
    var jwellery = createSprite(20,40, 10, 10);
    jwellery.x=Math.round(random(windowWidth/100,windowWidth));
    jwellery.addImage(jwelleryImg);
    jwellery.scale=0.13;
    jwellery.velocityY = 3+treasureCollection/600;
    jwellery.lifetime = 200;
    jwelleryG.add(jwellery);
  }
}

function createSword()
{
  if (World.frameCount % 60 == 0) 
  {
    /*make swords in every 410 frames in random x
    position*/
    var sword = createSprite(20,40, 10, 10);
    sword.x=Math.round(random(windowWidth/100,windowWidth));
    sword.addImage(swordImg);
    sword.scale=0.1;
    sword.velocityY = 3+treasureCollection/600;
    sword.lifetime = 200;
    sword.rotationSpeed=Math.round(random(3,6));
    swordGroup.add(sword);
  }
}

function restart1()
{
  if(mousePressedOver(restart))
  {
    backGround.play();

    path2.velocityY = 4+treasureCollection/50;
    path.velocityY = 4+treasureCollection/50;
    path3.velocityY = 4+treasureCollection/50;
    //coinG.setVelocityYEach(3+treasureCollection/50);
    treasureCollection = 0;
    gameState=PLAY;
  }  
}

/*function spawnCoins()
{
  if(frameCount%30===0)
  {
    coin=createSprite(10,0,10,10);
    coin.addAnimation("Coins",coinImg);
    coin.x=Math.round(random(windowWidth/100,windowWidth));
    coin.velocityY=4+treasureCollection/1350;
    coin.debug=true;
    coin.lifetime=200;
    coin.depth=path.depth+1;
    coin.depth=path2.depth+1;
    coin.depth=path3.depth+1;
    coin.scale=0.4;
    coinG.add(coin);
  }
}  */