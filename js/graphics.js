// Graphics handling and sprite generation

class Graphics {
    constructor() {
        // Create main sprite canvas
        this.spriteCanvas = document.createElement('canvas');
        this.spriteCtx = this.spriteCanvas.getContext('2d');
        
        // Set sprite canvas dimensions
        this.spriteCanvas.width = 512;
        this.spriteCanvas.height = 512;
        
        // Initialize sprite sheet
        this.sprites = {};
        this.generateSprites();
    }

    // Generate all game sprites
    generateSprites() {
        // Generate car sprites
        this.generateCarSprites();
        // Generate environment sprites
        this.generateEnvironmentSprites();
        // Generate UI elements
        this.generateUISprites();
    }

    // Car sprite generation
    generateCarSprites() {
        const carColors = {
            player: '#ff0000',    // Red for player
            opponent1: '#00ff00', // Green
            opponent2: '#0000ff', // Blue
            opponent3: '#ffff00'  // Yellow
        };

        // Generate car sprites for each color
        Object.entries(carColors).forEach(([type, color]) => {
            // Straight car
            this.sprites[`${type}_straight`] = this.drawCar(color, 0);
            // Left turn car
            this.sprites[`${type}_left`] = this.drawCar(color, -15);
            // Right turn car (mirror of left)
            this.sprites[`${type}_right`] = this.drawCar(color, 15);
        });
    }

    // Draw car with specified color and rotation
    drawCar(color, rotation) {
        const width = 40;
        const height = 20;
        
        // Create temporary canvas for car
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;

        // Save context state
        ctx.save();
        
        // Move to center for rotation
        ctx.translate(width/2, height/2);
        ctx.rotate(utils.toRad(rotation));
        
        // Draw car body
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(-width/2, -height/2);
        ctx.lineTo(width/2, -height/2);
        ctx.lineTo(width/2, height/2);
        ctx.lineTo(-width/2, height/2);
        ctx.closePath();
        ctx.fill();

        // Draw windows
        ctx.fillStyle = '#000000';
        ctx.fillRect(-width/4, -height/2, width/2, height/4);

        // Draw wheels
        ctx.fillStyle = '#000000';
        ctx.fillRect(-width/3, -height/2, width/6, height/6);
        ctx.fillRect(width/6, -height/2, width/6, height/6);
        ctx.fillRect(-width/3, height/3, width/6, height/6);
        ctx.fillRect(width/6, height/3, width/6, height/6);

        // Restore context
        ctx.restore();

        return canvas;
    }

    // Environment sprite generation
    generateEnvironmentSprites() {
        // Generate tree sprite
        this.sprites.tree = this.drawTree();
        // Generate building sprites
        this.sprites.building = this.drawBuilding();
        // Generate mountain sprites
        this.sprites.mountain = this.drawMountain();
    }

    // Draw tree sprite
    drawTree() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 40;
        canvas.height = 80;

        // Draw trunk
        ctx.fillStyle = '#654321';
        ctx.fillRect(15, 40, 10, 40);

        // Draw leaves
        ctx.fillStyle = '#228B22';
        ctx.beginPath();
        ctx.moveTo(20, 0);
        ctx.lineTo(40, 50);
        ctx.lineTo(0, 50);
        ctx.closePath();
        ctx.fill();

        return canvas;
    }

    // Draw building sprite
    drawBuilding() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 60;
        canvas.height = 120;

        // Building body
        ctx.fillStyle = '#808080';
        ctx.fillRect(0, 0, 60, 120);

        // Windows
        ctx.fillStyle = '#FFFF00';
        for (let y = 10; y < 110; y += 20) {
            for (let x = 10; x < 50; x += 20) {
                ctx.fillRect(x, y, 10, 10);
            }
        }

        return canvas;
    }

    // Draw mountain sprite
    drawMountain() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 100;
        canvas.height = 80;

        // Mountain shape
        ctx.fillStyle = '#4A4A4A';
        ctx.beginPath();
        ctx.moveTo(0, 80);
        ctx.lineTo(50, 0);
        ctx.lineTo(100, 80);
        ctx.closePath();
        ctx.fill();

        // Snow cap
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.moveTo(40, 15);
        ctx.lineTo(50, 0);
        ctx.lineTo(60, 15);
        ctx.closePath();
        ctx.fill();

        return canvas;
    }

    // UI sprite generation
    generateUISprites() {
        // Generate speedometer
        this.sprites.speedometer = this.drawSpeedometer();
        // Generate position indicator
        this.sprites.position = this.drawPositionIndicator();
    }

    // Draw speedometer
    drawSpeedometer() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 100;
        canvas.height = 100;

        // Draw outer circle
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(50, 50, 45, 0, Math.PI * 2);
        ctx.stroke();

        // Draw markings
        for (let i = 0; i < 8; i++) {
            const angle = (Math.PI * 1.5) + (i * Math.PI / 4);
            ctx.beginPath();
            ctx.moveTo(
                50 + Math.cos(angle) * 35,
                50 + Math.sin(angle) * 35
            );
            ctx.lineTo(
                50 + Math.cos(angle) * 45,
                50 + Math.sin(angle) * 45
            );
            ctx.stroke();
        }

        return canvas;
    }

    // Draw position indicator
    drawPositionIndicator() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 50;
        canvas.height = 30;

        ctx.fillStyle = '#FFFFFF';
        ctx.font = '20px Racing Sans One';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('1st', 25, 15);

        return canvas;
    }

    // Draw sprite at specified position
    drawSprite(ctx, spriteName, x, y, scale = 1) {
        const sprite = this.sprites[spriteName];
        if (sprite) {
            ctx.drawImage(
                sprite,
                x - (sprite.width * scale) / 2,
                y - (sprite.height * scale) / 2,
                sprite.width * scale,
                sprite.height * scale
            );
        }
    }
}

// Create and export graphics instance
window.graphics = new Graphics();
