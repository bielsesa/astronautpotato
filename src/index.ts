import { Application, Container, Sprite } from 'pixi.js'
import { GlitchFilter } from 'pixi-filters'

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 640,
	height: 480
});

const conty: Container = new Container();

conty.x = app.screen.width / 2;
conty.y = app.screen.height / 2;
app.stage.addChild(conty);

const clampy: Sprite = Sprite.from("clampy.png");

clampy.anchor.set(0.5);

clampy.x = 0;
clampy.y = 0;

conty.rotation = Math.PI * 0.5;

const glitchFilter: GlitchFilter = new GlitchFilter({
	seed: 0.3,
	slices: 10,
	offset: 10,
	red: [2, 2],
	blue: [10, -4],
	green: [-10, 4]
});


clampy.filters = [glitchFilter];

conty.addChild(clampy);