
Habitat.install(this)

const stage = Stage.start({scale: 0.8, aspectRatio: [2, 1]})
stage.tick = (context) => {

    // Clear the screen every frame!
    context.clearRect(0, 0, context.canvas.width, context.canvas.height)
    
    // Draw whatever you want!
    context.fillStyle = Colour.Blue
    context.fillRect(0, 0, 10, 10)
    
}