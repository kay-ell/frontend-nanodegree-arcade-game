class Enemy {
    constructor(x, y, speed) {
        //properties
        this.x = x; // x position
        this.y = y + 60; // y position
        this.speed = speed + Math.floor(Math.random() * 200); // speed in which the bug moves (randomized)

        // The image/sprite for our enemires, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        this.move = 101;
        this.endPoint = this.move * 5;
        this.startPos = -this.move;
    }

    //methods
    // Update the enemy's position, required method for the game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for 
        // all computers.

        // If enemy is not passed boundary
        if (this.x < this.endPoint) {
            // Move forward
            // Increment x by speed * dt
            this.x += this.speed * dt; 
        } else { //else
            // reset pos to start
            this.x = this.startPos;
        }
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Player class
class Player {
    // constructor
    constructor() {
        // properties
        this.upDown = 83; // height of a single tile
        this.leftRight = 101; // width of a single tile
        this.startX = this.leftRight * 2; // set start position of x
        this.startY = (this.upDown * 4) + 60;  // set start position of y
        this.x = this.startX; // x position
        this.y = this.startY; // y position
        this.sprite = 'images/char-cat-girl.png'; // sprite image
        this.victory = false; // set victory to false by default
    }    
    // Methods
    // Update position
    update() {
    // check collision here
        // Did player x and y collide with enemy?
        for(let enemy of allEnemies) {
            if (this.y === enemy.y && (enemy.x + enemy.move / 2 > this.x && enemy.x < this.x + this.leftRight / 2)) {
                this.reset();
            }
        }
        // Check if the player win here
        if (this.y === -23) {
        // Did player x and y reach final tile?
            this.victory = true;   
            showModal(); 
        }
                    

    }
        
    // Render
    render() {
        // Draw player sprite on current x and y coord position
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
                
    // Handle keyboard input
    handleInput(input) {
        // Update player's x and y property according to input   
        if (input === 'left') {
            if(this.x > 0) {
                this.x -= this.leftRight;
            }
        } else if (input === 'up') {
            if (this.y > 0) {
                this.y -= this.upDown;
            }
        } else if (input === 'right') {
            if (this.x < this.leftRight * 4) {
                this.x += this.leftRight;
            }
        } else if (input === 'down') {
            if (this.y < this.upDown * 4) {
                this.y += this.upDown;
            }
        }
    }

    // Reset Player
    reset() {
    // Set x and y to starting x and y
        this.x = this.startX;
        this.y = this.startY;    
    }
                
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// New Player object
const player = new Player();
// Init allEnemies array
const enemyBug1 = new Enemy(-101, 0, 200); // 200
const enemyBug2 = new Enemy(-101, 83, 150); // 150
const enemyBug3 = new Enemy(-101, 83*2, 300); // 300
const enemyBug4 = new Enemy(-101*5, 83, 150); // 150
const enemyBug5 = new Enemy(-101*8, 0, 200); // 200
// For each enemy create and push new Enemy object into above array
const allEnemies = [];
allEnemies.push(enemyBug1, enemyBug2, enemyBug3, enemyBug4, enemyBug5);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

const modal = document.querySelector('#modal');
const showModal = () => {
    modal.style.display = 'block';
}

// close modal when 'X' is clicked
document.querySelector('.close').addEventListener('click', () => modal.style.display = 'none');

// close modal when 'Exit' is clicked
document.querySelector('.exit').addEventListener('click', () => modal.style.display = 'none');

// close modal when user clicks anywhere outside the modal
window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

