
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;




function setup() {
  createCanvas(1000,1000);
  esr = 150
  enemies = []
  steps1 = []
  steps2 = []
  steps = 300
  engine = Engine.create();
  world = engine.world;

  player = createSprite(500, 500, 40, 40)

  
}


function draw() 
{
  background(51);
  Engine.update(engine);
  textSize(40)
  text(`Steps: ${steps}`, 25, 50)
  if (steps > 0) {
    if (keyDown(UP_ARROW)) {
      player.y -= 2
      steps -= 1
    }
    if (keyDown(DOWN_ARROW)) {
      player.y += 2
      steps -= 1
    }
    if (keyDown(LEFT_ARROW)) {
      player.x -= 2
      steps -= 1
    }
    if (keyDown(RIGHT_ARROW)) {
      player.x += 2
      steps -= 1
    }
  } 

  if (steps < 0)
  steps = 0
  if (frameCount % esr == 0) {
    enemy = createSprite(random(50, 950), random(50, 950), 20, 20)
    enemies.push(enemy)
    enemy.shapeColor = "red"
  }

  if (frameCount % 200 == 0) {
    step1 = createSprite(random(50, 950), random(50, 950), 30, 30)
    steps1.push(step1)
    step1.shapeColor = "green"
  }

  if (frameCount % 500 == 0) {
    step2 = createSprite(random(50, 950), random(50, 950), 40, 40)
    steps2.push(step2)
    step2.shapeColor = "yellow"
  }

  for (var i = 0; i != enemies.length; i++) {
    if (player.isTouching(enemies[i])) {
      enemies[i].remove()
      enemies.splice(i, 1)
    }
  }

  for (var i = 0; i != steps1.length; i++) {
    if (player.isTouching(steps1[i])) {
      steps1[i].remove()
      steps1.splice(i, 1)
      steps += 150
    }
  }

  for (var i = 0; i != steps2.length; i++) {
    if (player.isTouching(steps2[i])) {
      steps2[i].remove()
      steps2.splice(i, 1)
      steps += 300
    }
  }
  
  drawSprites();
}

