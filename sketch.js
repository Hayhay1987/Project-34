
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var speed = 3
var gameState = 0;
var stepsToSubtract = 1;
var enemyCount = 0;






function setup() {
  createCanvas(1000,1000);
  esr = 150
  steps = 500
  engine = Engine.create();
  world = engine.world;
  enemies = new Group()
  steps1 = new Group()
  steps2 = new Group()
  edges = createEdgeSprites();

  obstacle = Bodies.circle(500, 0, 100, {resititution: 1, frictionAir: 0.01})
  World.add(world, obstacle)

  ground = Bodies.rectangle(500, 1025, 1000, 50, {isStatic: true})
  World.add(world, ground)

  left = Bodies.rectangle(-25, 500, 50, 1000, {isStatic: true})
  World.add(world, left)

  right = Bodies.rectangle(1025, 500, 50, 1000, {isStatic: true})
  World.add(world, right)

  roof = Bodies.rectangle(500, -25, 1000, 50, {isStatic: true})
  World.add(world, roof)

  player = createSprite(500, 500, 40, 40)

  
}


function draw() 
{

  background(51);
  textSize(40)
  text(`Enemies slain: ${enemyCount}`, 25, 950)
  Engine.update(engine);
  if (steps > 0) {
    if (keyDown(SHIFT)) {
      if (keyDown(UP_ARROW)) {
        player.y -= speed * 2
        steps -= 3
      }
      if (keyDown(DOWN_ARROW)) {
        player.y += speed * 2
        steps -= 3
      }
      if (keyDown(LEFT_ARROW)) {
        player.x -= speed * 2
        steps -= 3
      }
      if (keyDown(RIGHT_ARROW)) {
        player.x += speed * 2
        steps -= 3
      }
    }
    else {
      if (keyDown(UP_ARROW)) {
        player.y -= speed
        steps -= 1
      }
      if (keyDown(DOWN_ARROW)) {
        player.y += speed
        steps -= 1
      }
      if (keyDown(LEFT_ARROW)) {
        player.x -= speed
        steps -= 1
      }
      if (keyDown(RIGHT_ARROW)) {
        player.x += speed
        steps -= 1
      }
    }
  } 
  if (gameState != 1) {
    if (enemies.length == 10) {
      gameState = 1
      World.remove(world, obstacle)
      enemies = null;
      steps2 = null;
      steps1 = null;
    }
  }

  if (abs(player.x - obstacle.position.x) + abs(player.y - obstacle.position.y) < 75)  {
    steps -= stepsToSubtract
    stepsToSubtract *= 1.1
  }
  if (steps < 0)
  steps = 0
  if (gameState == 0) {
    text(`Steps: ${steps.toFixed(0)}`, 25, 50)
    text(`Enemies: ${enemies.length}`, 750, 50)
    push()
    textSize(20)
    text(`Steps taken on touch with obstacle (per frame): ${stepsToSubtract.toFixed(2)}`, 400, 950)
    pop()
    player.collide(edges)

    enemies.isTouching(player, enemyf)
    steps1.isTouching(player, steps1f)
    steps2.isTouching(player, steps2f)
    if (frameCount % esr == 0) {
      enemy = createSprite(random(50, 950), random(50, 950), 20, 20)
      enemies.add(enemy)
      enemy.shapeColor = "red"
      if (esr > 10)
      esr -= 1
    }

    if (frameCount % 300 == 0) {
      step1 = createSprite(random(50, 950), random(50, 950), 30, 30)
      steps1.add(step1)
      step1.shapeColor = "green"
    }

    if (frameCount % 500 == 0) {
      step2 = createSprite(random(50, 950), random(50, 950), 40, 40)
      steps2.add(step2)
      step2.shapeColor = "yellow"
    }

    if (frameCount % 20 == 0) {
      Body.applyForce(obstacle, {x: 0, y:0}, {x: random(-2.5, 2.5), y: random(-2.5, 2.5)})
    }

    if (obstacle.position.x > 1000 || obstacle.position.x < 0 || obstacle.position.y > 1000 || obstacle.position.y < 0) {
      obstacle.position = {x: 500, y: 500}
      Body.setVelocity(obstacle,  {x: 0, y:0})
    }
  }

  ellipseMode(CENTER)
  ellipse(obstacle.position.x, obstacle.position.y, 100, 100)
  rectMode(CENTER)
  rect(ground.position.x, ground.position.y, 1000, 50)
  rect(roof.position.x, roof.position.y, 1000, 50)
  rect(left.position.x, left.position.y, 50, 1000)
  rect(right.position.x, right.position.y, 50, 1000)
  
  drawSprites();

  if (gameState == 1) {
    steps = 0;
    push();
    fill('red')
    textAlign(CENTER)
    text("Game over!", 500, 500)
    pop();
    push();
    fill('red')
    textAlign(LEFT)
    text(`Enemies: 10`, 750, 50)
    pop();
  }
}

function enemyf(enemyToRemove) {
  enemyToRemove.remove()
  enemyCount += 1
}

function steps1f(step1ToRemove) {
  step1ToRemove.remove()
  steps += 250 + enemyCount
}

function steps2f(step2ToRemove) {
  step2ToRemove.remove()
  steps += 500 + enemyCount * 2
}
