console.log("Hey Canvas");

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d", {alpha: true});

// Resizing Canvas
function resize(){
	const dpr = window.devicePixelRatio || 1;
	const h = window.innerHeight; const w = window.innerWidth;
	canvas.width = w*dpr;
	canvas.height = h*dpr;
	canvas.style.width = w + "px";
	canvas.style.height = h + "px";
	ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
window.addEventListener(("resize"), resize);
resize();

// Random Integer
function randomInteger(min, max){ 
	return Math.floor( Math.random() * ((max + 1) - min) + min )
}

// Colors & Types
const colors = [
	"green",
	"magenta",
	"red",
	"yellow"
]
const types = ["triangle", "circle", "x"];
let shapes = [];

// Shape Class
class Shape {
	constructor(){
		this.type = types[randomInteger(0, 2)];
		this.size = randomInteger(7, 11);
		this.color = colors[randomInteger(0, colors.length-1)];
		this.glow = 3;

		this.x = randomInteger(this.size, canvas.width - this.size);
		this.y = randomInteger(this.size, canvas.height - this.size);

		const angle = randomInteger(0, Math.PI*2);
		const speed = randomInteger(5, 8);
		this.vx = Math.cos(angle) * speed;
		this.vy = Math.sin(angle) * speed;
	}

	update() {
		this.x += this.vx * 0.05;
		this.y += this.vy * 0.05;

		let bounced = false;
		
		if (this.x < this.size){ this.x=this.size; this.vx*=-1; bounced=true; }
		if (this.x > canvas.width - this.size){ this.x=canvas.width-this.size; this.vx*=-1; bounced=true; }
		
		if (this.y < this.size){ this.y=this.size; this.vy*=-1; bounced=true; }
		if (this.y > canvas.height - this.size){ this.y=canvas.height-this.size; this.vy*=-1; bounced=true; }
	}

	draw() {
		ctx.save();
		ctx.translate(this.x, this.y);

		ctx.shadowBlur = this.glow + 5;
		ctx.shadowColor = this.color;
		ctx.strokeStyle = this.color;
		ctx.lineWidth = 1.5;
		ctx.fillStyle = "rgba(0, 0, 0, 0)"; // unfilled

		ctx.beginPath(); //pickUp the pen
		if (this.type === "circle"){
			ctx.arc(0, 0, this.size, 0, Math.PI * 2);
		}
		else if (this.type === "triangle"){
			const h = (this.size+2) * Math.sqrt(3)/2;
			ctx.moveTo(0, -(2/3)*h);
			ctx.lineTo(-this.size, (1/2)*h);
			ctx.lineTo(this.size, (1/2)*h);
			ctx.closePath(); // connect last point to first
		}
		else {
			const s = this.size * 0.6; // Scale Down
			ctx.moveTo(-s, -s); ctx.lineTo(s, s);
			ctx.moveTo(s, -s); ctx.lineTo(-s, s);
		}
		ctx.stroke(); // Draw OutLine
		ctx.restore();
	}
}

// Create Shapes
for (let i = 0; i <= 70; i++){ shapes.push(new Shape()); }

// Animation Loop
function loop(){
	ctx.fillStyle = "rbga(0, 0, 0, 0)"
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	for (const s of shapes){
		s.update();
		s.draw();
	}

	requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
