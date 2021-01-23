var gameState;
var PLAY;
var END;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var survivalTime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup()
{
    
   createCanvas(displayWidth - 20, displayHeight - 30);
  
    monkey = createSprite(80, 315, 20, 20);  
    monkey.addAnimation("moving", monkey_running);
    monkey.scale = 0.1;
  
    ground = createSprite(400, 350, 900, 10);
    ground.velocityX = -4;
    ground.x = ground.width/2;
    console.log(ground.x);
    
    FoodGroup = new Group();
    obstacleGroup =  new Group();
}


function draw()
{
    background("yellow");
    
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    
  
    if(keyDown("space")&& monkey.y >=100)
    {
    monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(ground);
    spawnBananas();
    spawnObstacles();
    drawSprites();
    stroke("black");
    textSize(18);
    fill("black");
    text("Score: " +score, 105, 75);
  
      if(obstacleGroup.isTouching(monkey))
    {
     ground.velocityX = 0;
    monkey.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0); 
      //reset();
    } 
    camera.position.x = displayWidth/2;
      
    
    stroke("black");
    textSize(20);
    fill("black");
      survivalTime = Math.ceil(frameCount/frameRate());
    text("Survival Time: " +survivalTime, 100, 50);
    
    }    

function spawnBananas ()
{
    if(frameCount % 80 === 0)
    {
        banana = createSprite(200, 120, 20, 20);
        banana.y = Math.round(random(120, 200));
        banana.addImage(bananaImage);
        banana.scale = 0.1;
        banana.velocityX = -4;
        banana.setLifetime = 100;
        monkey.depth = banana.depth+1;
        FoodGroup.add(banana);
    }
}

function spawnObstacles ()
{
    if(frameCount % 300 === 0)
    {
        obstacle = createSprite(600, 315, 40, 10);
        obstacle.addImage(obstacleImage);
        obstacle.scale = 0.2;
        obstacle.velocityX = -3;
        obstacle.setLifetime = 300;
        obstacleGroup.add(obstacle);
    }
}