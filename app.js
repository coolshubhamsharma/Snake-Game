


let canvas = document.querySelector('canvas');

let ctx = canvas.getContext('2d');

let cellSize = 50;//height and width ka kaam karega for each cell
let boardHeight = 600;
let boardWidth = 1000;
let snakeCells = [[0,0]];//2d array to store starting points of snake ka rectangle(we will always update the positin of the snake from the last element of the array as it would contain the position of the snake and once the position of the snake is updated we will push the new position of the snake inside the 2d array)

let direction = 'right';//this is the default direction given to the snake(i.e it will always be going rightward when the game begin)

let gameOver = false;//wall se touch hone k baad ho jaaye true

let foodCells = generateFood(); //bcoz we need 2 values i.e. x and y it will retun an array

let score = 0;

//bar bar evnt repeat so we are using setInterval()
//setInterval() generates an id which we are storing in intervalId
let intervalId = setInterval(function(){
    update();//pehle update ko call karenge phir draw() ko
    draw();
  },150)

//kydown event is triggered
document.addEventListener('keydown' , function(event){
    if(event.key ==='ArrowDown'){direction = 'down'}
    else if(event.key === 'ArrowUp'){direction = 'up'}
    else if(event.key === 'ArrowLeft'){direction = 'left'}
    else{direction = 'right'}
})

//function to draw snale
function draw(){
    if(gameOver === true){
        clearInterval(intervalId);//accepts an id
        ctx.fillStyle = 'red';
        ctx.font = '100px monospace'
        ctx.fillText('Game Over!!!' , 200 , 300);
        return;  
    }
    
    //draw Snake
    ctx.clearRect(0,0,boardWidth,boardHeight);
    for(let cell of snakeCells){
        ctx.fillStyle = 'red';
        ctx.fillRect(cell[0] , cell[1] , cellSize , cellSize);
        ctx.strokeStyle = 'orange';
        ctx.strokeRect(cell[0] , cell[1] , cellSize , cellSize);
    };

    //draw food
    ctx.fillStyle = 'green';
    ctx.fillRect(foodCells[0] , foodCells[1] , cellSize , cellSize);

    //Draw Score
    ctx.font = '24px monospace';
    ctx.fillText(`score: ${score}`,20 , 20);

};


//function to update snake
function update(){
    let headX = snakeCells[snakeCells.length-1][0];
    let headY = snakeCells[snakeCells.length-1][1];

    // let newHeadX = headX + cellSize;
    // let newHeadY =headY;
    let newHeadX;
    let newHeadY;

    if(direction === 'right'){
         newHeadX = headX + cellSize;
         newHeadY =headY;
         if(newHeadX === boardWidth || khagyakhudKO(newHeadX , newHeadY)){gameOver = true;}
    }
    else if(direction === 'left'){
         newHeadX = headX - cellSize;
         newHeadY =headY;
         if(newHeadX < 0 || khagyakhudKO(newHeadX , newHeadY)){gameOver = true;}
    }
    else if(direction === 'up'){
         newHeadX = headX ;
         newHeadY =headY - cellSize;
         if(newHeadY < 0 || khagyakhudKO(newHeadX , newHeadY)){gameOver = true;}
    }
    else {
         newHeadX = headX ;
         newHeadY =headY + cellSize;
         if(newHeadY === boardHeight || khagyakhudKO(newHeadX , newHeadY)){gameOver = true;}
    }



    snakeCells.push([newHeadX , newHeadY]);//updating the positionof the snake
    
    //eating Food
    if(newHeadX === foodCells[0] && newHeadY === foodCells[1]){
        foodCells = generateFood();
        score += 50;
    }
    else{
    snakeCells.shift();//remove the previous positions taken by the snake
    }

}

function generateFood(){
    return [ 
        Math.round((Math.random()*(boardWidth-cellSize)) / cellSize) * cellSize,
        Math.round((Math.random()*(boardHeight-cellSize)) / cellSize) * cellSize,
    ];
}

function khagyakhudKO(newHeadX , newHeadY ){
   
    //loop
    for(let item of snakeCells){
        if(item[0] === newHeadX && item[1] === newHeadY){
            return true;
        }
    }
    return false;

}