import { Container, Sprite, Ticker } from 'pixi.js';
import { GlitchFilter, AdvancedBloomFilter } from 'pixi-filters';

export class Scene extends Container {
    private readonly screenWidth: number;
    private readonly screenHeight: number;
    
    private elapsedTime: number;

    private star: Sprite;
    private glitchFilter: GlitchFilter;
    private advancedBloomFilter: AdvancedBloomFilter;
    
    constructor(screenWidth: number, screenHeight: number) {
        super();

        this.elapsedTime = 0.0;

        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;

        this.glitchFilter = new GlitchFilter({
        	seed: 0.3,
        	slices: 10,
        	offset: 10,
        	red: [2, 2],
        	blue: [10, -4],
            green: [-10, 4]
        });

        this.advancedBloomFilter = new AdvancedBloomFilter({
            threshold: 0.5,
            bloomScale: 0.5
        })
        
        this.star = Sprite.from('star.png');
        
        this.star.anchor.set(0.5);
        this.star.x = this.screenWidth / 2;
        this.star.y = this.screenHeight / 2;
        // this.star.filters = [this.glitchFilter];
        this.star.filters = [this.advancedBloomFilter];
        this.star.scale.x = 2;
        this.star.scale.y = 2;
        this.addChild(this.star);

        Ticker.shared.add(this.update, this);
    }

    private update(deltaTime: number): void {
        this.elapsedTime += deltaTime;

        this.glitchFilter.seed = Math.cos(this.elapsedTime);
        // this.glitchFilter.seed = Math.random() * 50;
        this.glitchFilter.slices = (Math.random() * 50);
        this.glitchFilter.offset = (Math.random() * 50);
        // console.log(`Value: ${Math.cos(deltaTime)}`);
        console.log(`deltaTime: ${deltaTime}`);
        console.log(`elapsedTime: ${this.elapsedTime}`);
        console.log(`value: ${Math.cos(Math.PI * this.elapsedTime)}`);

        this.star.x = (this.screenWidth / 2) + (Math.cos(this.elapsedTime) * 10);
        this.star.y = (this.screenHeight / 2) + (Math.sin(this.elapsedTime) * 10);
    }
}