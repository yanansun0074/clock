const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Startpoint
const startpoint = (3 * Math.PI) / 2;



const canvasBg = '#c4d8e2';

// Define colors for hour, minute and second hand
const hourActiveColor = '#e1dd72',
	minuteActiveColor = '#a8c66c',
	secondActiveColor = '#1b6535';

// Define inactive colors for hour, minute and second hand
const hourInactiveColor = '#c4d8e2',
	minuteInactiveColor = '#c4d8e2',
	secondInactiveColor = '#c4d8e2';

const timerBg = '#edca82';

//set last_minute_tracker
let start_min = 0;

function setup()
{
	canvas.width = document.documentElement.clientWidth - 35;
	canvas.height = document.documentElement.clientHeight - 45;

	window.requestAnimationFrame(draw);	
}

function draw()
{
	const centerX = canvas.width / 2,
		centerY = canvas.height / 2;

	let hr = hour();
	let min = minute();
	let sec = second();
	  
	let date = new Date()
	let ms = date.getMilliseconds();

	//am or pm
	if(hr > 12)
	{
		amOrPm = '🌃';
		hr -= 12;
	}
    else{amOrPm = '🌞'}

	//each movement
	let radH = 0.000008333 * ( ( hr * 60 * 60 * 1000 ) + ( min * 60 * 1000 ) + ( sec * 1000 ) + ms );
	let radM = 0.0001 * ( ( min * 60 * 1000 ) + ( sec * 1000 ) + ms );
	let radS = 0.006 * ( ( sec * 1000 ) + ms );


	// Draw Canvas
	drawRect(0, 0, canvas.width, canvas.height, canvasBg);

	// Hour Hand
	drawCircle(centerX, centerY, 110, 0, 360 , false, hourInactiveColor, 'stroke', 90);
	drawCircle(centerX, centerY, 110, startpoint, rad(radH) + startpoint, false, hourActiveColor, 'stroke', 90);

	// Minute Hand
	drawCircle(centerX, centerY, 180, 0, 360, false, minuteInactiveColor, 'stroke', 50);
	drawCircle(centerX, centerY, 180, startpoint, rad(radM) + startpoint, false, minuteActiveColor, 'stroke', 50);

	// Second Hand
	drawCircle(centerX, centerY, 220, 0, 360, false, secondInactiveColor, 'stroke', 30);
	drawCircle(centerX, centerY, 220, startpoint, rad(radS) + startpoint, false, secondActiveColor, 'stroke', 30);

	// Digital Timer
	drawCircle(centerX, centerY, 90, 0, 360, false, timerBg, 'fill', '50');
	drawText(`${amOrPm}`, canvas.width / 2-15, canvas.height/2+15,'30px');

	window.requestAnimationFrame(draw);
    //print every other minutes
	if (min!=start_min){
		print(min);
		start_min = min;
	}
}

setup();

// Convert degree to radians
function rad(deg){
	return  (Math.PI / 180) * deg;
}

function drawText(text, x, y, size) {
	ctx.font = `${size} Roboto`;
	ctx.fillText(text, x, y);
}

function drawRect(x, y, width, height, color) {
	ctx.fillStyle = color;
	ctx.fillRect(x, y, width, height);
}

function drawArc(x, y, radius, start, end, clockwise)
{
	ctx.beginPath();
	ctx.arc(x, y, radius, start, end, clockwise);
}

function drawCircle(x, y, radius, start, end, clockwise, color, type, thickness) {
	switch (type) {
		case 'fill':
			ctx.fillStyle = color;
			drawArc(x, y, radius, start, end, clockwise)
			ctx.fill();
			break;
		case 'stroke':
			ctx.strokeStyle = color;
			ctx.lineWidth = thickness;
			drawArc(x, y, radius, start, end, clockwise)
			ctx.stroke();
			break
	}
}
