function dragHandler(element, callbacks) {

    var startX = 0;
    var startY = 0;

    function onMouseMove(event) {

        var currentX = event.clientX;
        var currentY = event.clientY;

        var dx = currentX - startX;
        var dy = currentY - startY;

        callbacks.move({
            dx: dx, dy: dy
        });

        startX = currentX;
        startY = currentY;

    }


    function onMouseUp() {
        var endX = 0;
        var endY = 0;


    }


    element.addEventListener("mousedown", function (event) {

        startX = event.clientX;
        startY = event.clientY;

        callbacks.start({
            x: startX, y: startY
        });

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);


    });
    document.addEventListener("mouseup", function (event) {


        callbacks.end({
            x: event.clientX,
            y: event.clientY
        });
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
    });
}

