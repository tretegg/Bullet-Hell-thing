<script lang="ts">
    import { onMount } from 'svelte';
    import { Bullet } from "$lib/Components/canvas/Bullet";
    import { Player } from "$lib/Components/canvas/Player";

    let player: Player
    let canvas: HTMLCanvasElement
    const SIZE = 10 as number;

    onMount(() => {
        console.log(canvas)

        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        ctx.scale(SIZE, SIZE);
        let spawnInterval = 10 as number;
        let score = 0 as number;

        // Set the canvas dimensions to match the screen size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        console.log('Canvas dimensions:', canvas.width, 'x', canvas.height);

        player = new Player(canvas);

        let bulletArray = [] as Bullet[];

        function play() : void { 
            setInterval(newBullet, spawnInterval);
            setInterval(draw, 10);
            // setInterval(updateScore, 1000);
        }

        function draw() : void {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            let playerDirection = player.direction;

            player.x += playerDirection[0];
            player.y += playerDirection[1];

            for (let i = 0; i < bulletArray.length; i++) {
                let currentBullet = bulletArray[i];

                ctx.fillStyle = 'blue';
                ctx.fillRect(currentBullet.x, currentBullet.y, SIZE, SIZE);

                currentBullet.updatePos();

                if (currentBullet.checkBounds()) {
                    bulletArray.splice(i, 1);
                    // console.log('Bullet removed');
                }
            }
            ctx.fillStyle = 'red';
            ctx.fillRect(player.x, player.y, SIZE, SIZE);

            if (collision()) {
                console.log('Collision');
                player.x = canvas.width / 2;
                player.y = canvas.height - canvas.height / 4;
                bulletArray = [];
                score = 0;
            }
        }

        function newBullet() : void {
            let bullet = new Bullet(canvas, ctx);
            // console.log(bullet);
            bulletArray.push(bullet);
        }

        function collision() : boolean {
            for (let i = 0; i < bulletArray.length; i++) {
                let currentBullet = bulletArray[i];
                if (
                    player.x < currentBullet.x + SIZE &&
                    player.x + SIZE > currentBullet.x &&
                    player.y < currentBullet.y + SIZE &&
                    player.y + SIZE > currentBullet.y
                ) {
                    return true;
                }
            }
            return false;
        }

        function updateScore() : void {
            score++;
            (document.getElementById('score') as HTMLElement).innerHTML = 'Score: ' + score;
        }

        play()
    })


    let gurboisis: boolean[] = []
    let gurboisis2: boolean[] = []

    $: if (player) {
        player.updatePos(gurboisis, gurboisis2)
    }

    function onKeyDown(e : KeyboardEvent) {
		switch(e.key.toLowerCase()) {
			case "a":
                gurboisis[0] = true
                break
			case "d":
                gurboisis[1] = true
				break;
			case "s":
                gurboisis2[1] = true
				break;
			case "w":
                gurboisis2[0] = true
                break;
        }
    }

    function onKeyUp(e: KeyboardEvent) {
        switch(e.key.toLowerCase()) {
			case "a":
                gurboisis[0] = false
                break
			case "d":
                gurboisis[1] = false
				break;
			case "s":
                gurboisis2[1] = false
				break;
			case "w":
                gurboisis2[0] = false
                break;
        }
    }

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

</script>

<canvas bind:this={canvas} class="border-0" id="screen-canvas"></canvas>

<h1 class="text-3xl font-bold underline header" id="score">Score: 0</h1>
<h1 class="text-3xl font-bold underline header" id="highscore">High score: 0</h1>

<style lang="postcss">
    canvas {
        background-color: burlywood;
        position: relative;
    }
    .header {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        color: white;
        padding: 10px;
    }
    #score {
        text-align: center;
    }
    #highscore {
        text-align: left;
    }
</style>

<svelte:window on:keyup|preventDefault={onKeyUp} on:keydown|preventDefault={onKeyDown} />