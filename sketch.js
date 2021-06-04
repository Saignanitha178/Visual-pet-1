//Create variables here
var dog, happyDog;
var database;
var foodS, foodStock;
var dogImg;


function preload() {
  //load images here
  dogImg = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
}

function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(1200, 800);
  dog = createSprite(900,450);
  dog.addImage(dogImg);
  foodStock = database.ref('Food');
  foodStock.on("value", readStock, showError)

}


function draw() {
  background(46, 139, 87);

  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  drawSprites();

  textSize(20);
  fill("white");;
  text("Food Remaining :" + foodS,250,400);
  console.log(text);


  textSize(20);
  fill("white");
  text("Press up arrow key to feed draco milk",250,100);

}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  if (x <= 0) {
    x = 0;
  }
  else {
    x = x - 1;
  }

  database.ref('/').update({
    Food : x 
  })
}

function showError(){
  console.log("Error in writing to the database");
}