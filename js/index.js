let lastrendertime = 0;
let Snake_speed = 12;
let input_dir = {
	x: 0, y: 0
}
const scoresound = new Audio('../mixkit-unlock-game-notification-253.wav')

let food = { x: 11, y: 15 }

let snakeArr = [
	{ x:12, y: 23 }
]
let GRID_SIZE = 25

const gamebord = document.querySelector('.game-bord')
const scorebord = document.querySelector('.score-bord')

let movetop = false
let movedown = false
let moveright = false
let moveleft = false;
let gameover = false

function gamerander(currenttime) {
	window.requestAnimationFrame(gamerander)
	let seconds = (currenttime - lastrendertime) / 1000
	if (seconds < 1 / Snake_speed) return
	lastrendertime = currenttime

	update()
	Drow()
    // console.log(gameover)
	colision()
}
if (gameover) {
	scorebord.innerHTML = '<h1 style=\'font-size:1.4rem; color:#fff;test-align:center;\'>game over</h1>'
	gamebord.innerHTML = ''
}
function update() {

	let newfood = {x: '', y: ''}
	snakeArr.forEach((e) => {

	})
	if (food.x === snakeArr[0].x && food.y === snakeArr[0].y) {
        scoresound.play()
		snakeArr.unshift({
			x: snakeArr[0].x + input_dir.x,
			y: snakeArr[0].y + input_dir.y,
		})

		let foodx = 1;
		let foody = 25
		food = {
			x: Math.round(foodx + (foody - foodx) * Math.random()),
			y: Math.round(foodx + (foody - foodx) * Math.random())
		}
	}
	for (let i = snakeArr.length - 2; i >= 0; i--) {
		snakeArr[i + 1] = {...snakeArr[i]}
	}

	snakeArr[0].x += input_dir.x;
	snakeArr[0].y += input_dir.y;

	gridOverFolow()

}
function gridOverFolow() {

	if (snakeArr[0].x < 0) {
		snakeArr[0].x = 25
	}
	if (snakeArr[0].y < 0) {
		snakeArr[0].y = 25
	}

	if (snakeArr[0].x > 25) {
		snakeArr[0].x = 0
	}
	if (snakeArr[0].y > 25) {
		snakeArr[0].y = 0
	}

}
function colision() {
	// if(snakeArr[0].x && snakeArr[0].y ===)
	for (let i = 1; i < snakeArr.length; i++){
		if (snakeArr[i].x  == snakeArr[0].x && snakeArr[i].y == snakeArr[0].y) {
			console.log(snakeArr[i], 'colision true')
			document.innerHTML = ''
			location.reload();
			alert('gameover')
			return gameover;
		}
	}
}

function Drow() {
	gamebord.innerHTML = ''
	gameEngine()
}
function gameEngine() {
    let GRID_SIZE = 21
	// let i;
	snakeArr.forEach((e, index) => {

		let y = e.y;
		let x = e.x;
		// i = index
		const snake = document.createElement('div')
		if (index === 0) {
			snake.classList.add('snake-head')
		}
		else {
			snake.classList.add('snake-body')
		}
		snake.style.gridRowStart = y;
		snake.style.gridColumnStart = x;
		snake.setAttribute('x', x)
		snake.setAttribute('y', y)
		gamebord.appendChild(snake)
		scorebord.innerHTML = index;
		//
	})
	const snakefood = document.createElement('div')
    snakefood.classList.add('snake-food')
    snakefood.style.gridRowStart = food.y;
	snakefood.style.gridColumnStart = food.x;
	snakefood.setAttribute('x', food.x)
	snakefood.setAttribute('y', food.y)
	gamebord.appendChild(snakefood)

}
window.addEventListener('keydown', (e) => {
	userinput(e)
})
function userinput(e) {

	switch (e.key) {
		case 'ArrowUp':
			input_dir.x = 0
			input_dir.y = -1
			movetop = true
			break;
		case 'ArrowDown':
			input_dir.x = 0
			input_dir.y = 1
			movedown = true
			break;
		case 'ArrowRight':
			input_dir.x = 1
			input_dir.y = 0
			moveright = true
			break;
		case 'ArrowLeft':
			input_dir.x = -1
			input_dir.y = 0
			moveleft = true
			break;
		default:
			break;
	}
}
// gameEngine()

if (!gameover) {

	gamerander()
}