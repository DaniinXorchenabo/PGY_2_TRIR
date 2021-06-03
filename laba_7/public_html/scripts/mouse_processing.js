
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
            new Circle($create_circle_button.attr("x"), $create_circle_button.attr("y"));
            create_events_processing();
            [...Object.keys(Circle.objects)].map( i => Circle.objects[i].update_events());
        }
    });
}
create_events_processing();