function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

function initInput(){
    canvas.addEventListener('mousemove', function(evt) {
        window.mousePosition = getMousePos(canvas, evt);
    }, false);

    canvas.addEventListener('click', function(evt) {
        window.mousePosition = getMousePos(canvas, evt);
        if(window.mouseClicked)
            window.mouseClicked();
    }, false);
}