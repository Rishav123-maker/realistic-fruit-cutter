//Game States
var PLAY=1;
var END=0;
var gameState=1;

var knife;
var knifeImage,fruit1,fruit2,fruit3,fruit4,alien1,alien2,
    gameOver_Img,gameOverSound,knifeSound;


function preload(){
  
  knifeImage = loadImage("knife.png");
  gameOver_Img = loadImage("gameover.png");
  
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  alien1 = loadImage("alien1.png");
  alien2 = loadImage("alien2.png");
  
  gameOverSound = loadSound("gameover.mp3");
  knifeSound = loadSound("knifeSwoosh.mp3");
}



function setup() {
  createCanvas(600, 600);
  
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  
   gameOver = createSprite(300,300,20,20);
   gameOver.addImage(gameOver_Img);
   gameOver.visible = false;
  
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

  score=0;
  //create fruit and monster Group variable here
  FruitG = createGroup();
  MonsterG = createGroup();
}

function draw() {
  background("lightblue");
  
  drawSprites();
  
  //Display score
  textSize(25);
  text("Score : "+ score,250,50);
  
  
  if(gameState===PLAY){
    
    //calling fruit and monster function
    Fruit();
    Monster();
    
    // Move knife with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    // Increase score if knife touching fruit
   if(knife.isTouching(FruitG)){
     score = score + 2;
     
     FruitG.destroyEach();
     knifeSound.play();
     
   }
    // Go to end state if knife touching enemy
      if(knife.isTouching(MonsterG)){
       gameState = END;
        
       gameOverSound.play();       
       MonsterG.destroyEach();
       FruitG.destroyEach();
      }
    if(gameState == END){
      gameOver.visible = true;
      knife.visible = false;
      
      MonsterG.setVelocityEach(0);
      FruitG.setVelocityEach(0);
      
    }
    
    
  }
  
  
}



function Fruit(){
  if(World.frameCount % 80 === 0){
  var fruit = createSprite(400,200,20,20);
    fruit.scale = 0.2;
    
    r = Math.round(random(1,4));
    if( r == 1){
      fruit.addImage(fruit1);
    }else if( r == 2){
      fruit.addImage(fruit4); 
    }else if(r == 3){
      fruit.addImage(fruit3);
    }else if(r == 4){
      fruit.addImage(fruit2);
    }
    
    
    fruit.y = Math.round(random(50,340));
  
  fruit.velocityX = -(7 + (score/4));
  fruit.setLifetime = 100;
  
  FruitG.add(fruit);
    
  position = Math.round(random(1,2));
    
    if(position == 1){
      fruit.x = 600;
    }
  }
}



function Monster(){
  if(World.frameCount % 80 === 0){
    var monster = createSprite(400,200,20,20);
    monster.scale = 0.7;
    
    r1 = Math.round(random(1,2))
    
    if( r1 == 1){
      monster.addImage(alien1);
    }else{
      monster.addImage(alien2);
    }
    
    monster.y = Math.round(random(50,340));
  
  monster.velocityX = -(8 + (score/10));
  monster.setLifetime = 100;
  
  MonsterG.add(monster);
    
  position = Math.round(random(1,2));
    
    if(position == 1){
      monster.x = 600;
    }
  }
}