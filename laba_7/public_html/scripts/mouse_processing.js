// function move_circle(event){
//     mousedown_circle()
// }
//
// function mousedown_circle(event){
//
// }
let $create_circle_button = $("#creating_circle_button");

function create_events_processing() {
    $create_circle_button = $("#creating_circle_button");
    $create_circle_button.bind("mousedown.create_circle", event => {
        if (event.which === 1) {
            console.log("--", event);
            const obj = Circle.objects[`circle_${counter}`]
            if (obj.get_pos_x() === -100 && obj.get_pos_y() === -100){
                obj.set_position($create_circle_button.attr("x"), $create_circle_button.attr("y"))

            } else {
                new Circle($create_circle_button.attr("x"), $create_circle_button.attr("y"), true);
                // create_events_processing();

            }
            setTimeout(() => {
                new Circle(-100, -100);
                create_events_processing();
                [...Object.keys(Circle.objects)].map(i => Circle.objects[i].update_events());
            }, 1200);
        }
    });
    // $("body").on(`mousemove.c_${this.my_id}`, Circle.move_mouse)
}
create_events_processing();
new Circle(-100, -100);
create_events_processing();
