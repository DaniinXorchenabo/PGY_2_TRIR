document.documentElement.addEventListener("destroy_figure", function (e) {

    let content = document.getElementById(`count_obj_now`)
    content.innerHTML = content.innerHTML.split('-')[0] + "- " + BaseFigure.all_figures_list.length;
    content = document.getElementById(`count_del_obj`)
    content.innerHTML = content.innerHTML.split('-')[0] + "- " + (count_figures - BaseFigure.all_figures_list.length);

});


document.documentElement.addEventListener("collision_figures", function (e) {
    console.log(e.detail);

    let main = document.getElementById(main_svg_id);
    main.innerHTML += e.detail.data;


    $(`#${this.element_collision_id}`).animate({"opacity": 0}, {
        queue: false,
        duration: 1000,
        // always: (() => {setTimeout(Collision.delete_collision(e.detail.obj_1, e.detail.obj_2)); })
    })

    // this.element_collision_id = `collision_${obj_1.my_id}_${Math.round(collision_point[0])}_${Math.round(collision_point[1])}_${Collision.collision_objects.length}`;
    // let col_point = `<use id="${this.element_collision_id}"
    //                         xlink:href="#marker_${obj_1.my_id}" x="${collision_point[0]}" y="${collision_point[1]}" />`
    //
    // let main = document.getElementById(main_svg_id);
    // main.innerHTML += col_point
    //
    // this.collision_point = collision_point;
    //
    //
    // $(`#${this.element_collision_id}`).animate({"opacity": 0}, {
    //     queue: false,
    //     duration: 1000,
    //     always: (() => {setTimeout(Collision.delete_collision(obj_1, obj_2)); })
    // })
})


window.addEventListener(`resize`, event => {
    console.log('----------------------', event)
    windows_w = window.innerWidth - 40;
    windows_h = window.innerHeight - 40;

    $("#" + main_svg_id).css("width", windows_w).css("height", windows_h);

    let width_exit = parseFloat(rect_exit.css("width"));
    let height_exit = parseFloat(rect_exit.css("height"))

    exit_obj.up_left.set_coordinate(windows_w / 2 - width_exit / 2 - 20, windows_h / 2 - height_exit / 2 - 20);
    exit_obj.up_right.set_coordinate(windows_w / 2 + width_exit / 2 + 20, windows_h / 2 - height_exit / 2 - 20);
    exit_obj.down_left.set_coordinate(windows_w / 2 - width_exit / 2 - 20, windows_h / 2 + height_exit / 2 + 20);
    exit_obj.down_right.set_coordinate(windows_w / 2 + width_exit / 2 + 20, windows_h / 2 + height_exit / 2 + 20);

    $("#rect_exit").css({
        "x": windows_w / 2 - width_exit / 2,
        "y": windows_h / 2 - height_exit / 2
    })


    console.log(windows_w, windows_h);
}, false);


document.documentElement.dispatchEvent(resize_event);