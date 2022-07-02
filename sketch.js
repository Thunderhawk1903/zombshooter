var PLAY = 1;
var END = 0;
var gameState = PLAY;


var bg,bgImg;
var player, shooterImg, shooter_shooting;
var bulletImg
var zombieImg, zombiesGroup
var createBullet;
var score;

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
bulletImg = loadImage("assets/bullet.png")
zombieImg = loadImage("assets/zombie.png")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.5
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)
   player.debug=false
//bullet 


 
zombiesGroup = new Group();
bulletGroup= new Group()

score = 0;
}

function draw() {
  background(0); 
fill("red");
textSize(50) 
  text("Score: "+ score, windowWidth-500,windowHeight-800);

  
  if(gameState === PLAY){

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  
    
  player.addImage(shooter_shooting)
  createBullet();
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}




spawnZombies();
if(bulletGroup.isTouching(zombiesGroup)){
  zombiesGroup.destroyEach()
  bulletGroup.destroyEach()
  score=score+1
  }
  }else if (gameState === END) {
   
 
  if(player.collide(zombiesGroup)){
    player.destroy()
    bulletGroup.destroyEach()
    zombiesGroup.destroyEach()
    text("Game Over You Died",windowWidth-1000,windowHeight-800)
    }

  }
drawSprites();
  
}

function spawnZombies(){
 //write code here to spawn the clouds
 if (frameCount % 120 === 0) {
  var zombie = createSprite(1200,400,40,10);
  zombie.y = Math.round(random(200,600));
  zombie.addImage(zombieImg);
  zombie.scale = 0.2;
  zombie.velocityX = -3;
  
   //assign lifetime to the variable
  zombie.lifetime = 600;
    
  //add each cloud to the group
  zombiesGroup.add(zombie);
}

}


function createBullet() {
  bullet = createSprite(300,300,10,10);
bullet.addImage(bulletImg);
bullet.scale=0.12;
//bullet.visible=false;

  bullet.y=player.y;
  bullet.velocityX = 10;
  bullet.lifetime = 150;
  bullet.scale = 0.09;
  bulletGroup.add(bullet)
  return bullet;
   
}

