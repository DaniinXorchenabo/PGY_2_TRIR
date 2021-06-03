let counter = 0;

class Circle{
    static objects = {};
    press_mouse = false;
    my_id = undefined;
    last_mouse_coord = {"x": 0, "y": 0}
    current_coord = {"x": 0, "y": 0}
    // $me = undefined;

    constructor(x, y){
        let main = document.getElementById("game_screen");
        main.innerHTML += this.create_circle(x, y);
        console.log('4086340959');
        // this.press_mouse = true;
        Circle.objects[this.my_id] = this;
        // Circle.mouse_down()
        this.update_events(true);
    }

    update_events(is_first=false){
        const data = $(`#${this.my_id}`).on(`mousemove.c_${this.my_id}`, Circle.move_mouse).on(
            `mousedown.c_${this.my_id}`, Circle.mouse_down).on(
            `mouseup.c_${this.my_id}`, Circle.mouse_up);
        if (is_first){
            data.trigger(`mousedown.c_${this.my_id}`, ["secret_trololo"]);
        }
    }

    create_circle(x, y){
        counter++;
        this.my_id = `circle_${counter}`;
        return `<use id="circle_${counter}" xlink:href="#base_circle" 
                 x="${x}" y="${y}" class="play_circle"></use>`
    }

    static mouse_down(event, is_first_event){
        console.log('++++++++', event.which, is_first_event);
        if (event.which === 1 || is_first_event === "secret_trololo") {
            const target = Circle.objects[event.target.id];
            console.log("Мышь внутри фигуры", event.target.id)

            target.press_mouse = true;
            target.last_mouse_coord.x = event.pageX;
            target.last_mouse_coord.y = event.pageY;
        }
    }
    static move_mouse(event){
        const target = Circle.objects[event.target.id];

        if (target.press_mouse){
            if (!target.last_mouse_coord.x || !target.last_mouse_coord.y){
                target.last_mouse_coord.x = event.pageX;
                target.last_mouse_coord.y = event.pageY;
            }
            // console.log("Мышь двигается фигуры", event.target.id, target.press_mouse);
            const $target = $(`#${target.my_id}`);
            // console.log(event.pageX - target.last_mouse_coord.x, $target.attr("x") + event.pageX - target.last_mouse_coord.x, parseFloat($target.attr("x")));
            $target.attr("x", parseFloat($target.attr("x")) + event.pageX - target.last_mouse_coord.x)
            $target.attr("y", parseFloat($target.attr("y")) + event.pageY - target.last_mouse_coord.y)
            // console.log(parseFloat($target.attr("x")));
            target.last_mouse_coord.x = event.pageX;
            target.last_mouse_coord.y = event.pageY;
        }
    }
    static mouse_up(event){
        console.log("")
        if (event.which === 1 || event.which === undefined) {
            const target = Circle.objects[event.target.id];
            console.log("Мышь вышла из фигуры", event.target.id)
            target.press_mouse = false;
            target.last_mouse_coord.x = undefined;
            target.last_mouse_coord.y = undefined;
        }
    }
}



function get_html_cell(pos_x, pos_y, size){
    return `<use id="cell_${pos_x}_${pos_y}" xlink:href="#base_rect" x="${pos_x}"
                 y="${pos_y}" width="${size}" height="${size}" cx="${pos_x + size/2}" cy="${pos_y + size/2}"></use>`;
}

function create_border(width, height, size){
    return [...Array(height)].map(
        (i, ind_y) => [...Array(width)].map(
            (i, ind_x) => get_html_cell(ind_x * size, ind_y * size, size) ).reduce(
                (last, now) => last + "\n" + now)).reduce(
        (last, now) => last + "\n" + now);
}

function create_base_circle(x, y, radius){
    return `<use id="creating_circle_button" xlink:href="#base_circle" 
                 x="${x}" y="${y}""></use>`
}

function create_all_svg_border(width=4, height=4, size = 70){
    const svg_size = {"width": (width) * size, "height": (height) * size}
    $("#base_rect").css({"width": size, "height": size});
    const radius = (size - 20) / 2;
    $("#base_circle").css({"r": radius});

    const $svg_element = $("#game_screen");
    // $svg_element.append(create_border(width, height, size));
    let main = document.getElementById("game_screen");
    main.innerHTML += create_border(width, height, size) + create_base_circle(20 + (width + 1) * size, (height - 1) * size + (size - 2 * radius)/2 + radius, radius);  // (size - 2 * radius)/2
    svg_size.width += 20 + (width + 1) * size;
    svg_size.height += height * size;
    $svg_element.css(svg_size);
}

create_all_svg_border(4, 4, 70);