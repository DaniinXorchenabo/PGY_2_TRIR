let counter = 0;
const base_cell = {"width": 100, "height": 100, "count_x": 5, "count_y": 5};
const base_circle = {"r": 100};

function get_html_cell(pos_x, pos_y, size) {
    // return `<g id="cell_${pos_x}_${pos_y}" class="cell" cx="${pos_x + size / 2}" cy="${pos_y + size / 2}"
    //             x="${pos_x}" y="${pos_y}" width="${size}" height="${size}">
    //         <rect  x="${pos_x}" y="${pos_y}" width="${size}" height="${size}"
    //          stroke="#000" fill="#fff"/>
    //          <image xlink:href="/images/game_board/background1/background1_${parseInt(pos_x/size)}_${parseInt(pos_y/size)}.png"
    //           width="${size}" height="${size}" x="${pos_x}" y="${pos_y}"/>
    //          </g>`
    return `<use id="cell_${pos_x}_${pos_y}" xlink:href="#base_rect" x="${pos_x}"
                 y="${pos_y}" width="${size}" height="${size}" cx="${pos_x + size / 2}" cy="${pos_y + size / 2}"
                 class="cell"></use>`;
}

function create_border(width, height, size) {
    return [...Array(height)].map(
        (i, ind_y) => [...Array(width)].map(
            (i, ind_x) => get_html_cell(ind_x * size, ind_y * size, size)).reduce(
            (last, now) => last + "\n" + now)).reduce(
        (last, now) => last + "\n" + now);
}

function create_base_circle(x, y, radius) {
    return `<use id="creating_circle_button" xlink:href="#base_circle_button" 
                 x="${x}" y="${y}""></use>`
}

function create_all_svg_border(width = 4, height = 4, size = 70) {
    const svg_size = {"width": (width) * size, "height": (height) * size}
    $("#base_rect").css({"width": size, "height": size});
    const radius = (size - 20) / 2;
    $("#base_circle").css({"r": radius});
    base_cell.width = size;
    base_cell.height = size;
    base_cell.count_x = width;
    base_cell.count_y = height;
    base_circle.r = radius;

    const $svg_element = $("#game_screen");
    // $svg_element.append(create_border(width, height, size));
    let main = document.getElementById("game_screen");
    main.innerHTML += create_border(width, height, size) + create_base_circle(20 + (width + 1) * size, (height - 1) * size + (size - 2 * radius) / 2 + radius, radius);  // (size - 2 * radius)/2
    svg_size.width += 20 + width + 100;
    svg_size.height += 100;
    $svg_element.css(svg_size);
}


class Circle {
    static objects = {};
    press_mouse = false;
    my_id = undefined;
    last_mouse_coord = {"x": 0, "y": 0}
    current_coord = {"x": 0, "y": 0}

    // $me = undefined;

    constructor(x, y, on_mouse=false) {
        let main = document.getElementById("game_screen");
        main.innerHTML += this.create_circle(x, y);
        console.log('Создан объект', this.my_id);
        Circle.objects[this.my_id] = this;
        this.update_events(on_mouse);
    }

    update_events(is_first = false) {
        const data = $(`#${this.my_id}`).on(`mousemove.c_${this.my_id}`, Circle.move_mouse).on(
            `mousedown.c_${this.my_id}`, Circle.mouse_down).on(
            `mouseup.c_${this.my_id}`, Circle.mouse_up).on(
            `mouseover.c_${this.my_id}`, Circle.mouse_down).on(
            `mouseout.c_${this.my_id}`, Circle.move_mouse);
        if (is_first) {
            data.trigger(`mousedown.c_${this.my_id}`, ["secret_trololo"]);
        }
    }

    create_circle(x, y) {
        counter++;
        this.my_id = `circle_${counter}`;
        return `<use id="circle_${counter}" xlink:href="#${Circle.get_random_soldater()}" 
                 x="${x}" y="${y}" class="play_circle"></use>`;
        // return `<use id="circle_${counter}" xlink:href="#base_circle"
        //          x="${x}" y="${y}" class="play_circle"></use>`
    }

    static mouse_down(event, is_first_event) {
        console.log('++++++++', event.which, is_first_event);
        if (event.which === 1 || is_first_event === "secret_trololo") {
            const target = Circle.objects[event.target.id];
            console.log("Мышь внутри фигуры", event.target.id)

            target.press_mouse = true;
            target.last_mouse_coord.x = event.pageX;
            target.last_mouse_coord.y = event.pageY;
        } else {
            if (event && event.target) {
                Circle.mouse_up(event);
            }
        }
    }

    static move_mouse(event) {
        const target = Circle.objects[event.target.id];
        // console.log(Object.assign(event));
        if (target && target.press_mouse && event.which !== 0) {
            if (!target.last_mouse_coord.x || !target.last_mouse_coord.y) {
                target.last_mouse_coord.x = event.pageX;
                target.last_mouse_coord.y = event.pageY;
            }
            // console.log("Мышь двигается фигуры", event.target.id, target.press_mouse);
            const $target = $(`#${target.my_id}`);
            // console.log(event.pageX - target.last_mouse_coord.x, $target.attr("x") + event.pageX - target.last_mouse_coord.x, parseFloat($target.attr("x")));
            $target.attr("x", parseFloat($target.attr("x")) + event.pageX - target.last_mouse_coord.x)
            $target.attr("y", parseFloat($target.attr("y")) + event.pageY - target.last_mouse_coord.y)
            // $target.animate(
            //     {"x": "+=" + (event.pageX - target.last_mouse_coord.x) + "px",
            //     "y": "+=" + (event.pageY - target.last_mouse_coord.y) + "px"
            //     }, {"duration": 0});
            // console.log(parseFloat($target.attr("x")));
            target.last_mouse_coord.x = event.pageX;
            target.last_mouse_coord.y = event.pageY;
        }
    }

    static mouse_up(event) {
        console.log("")
        // if (event.which === 1 || event.which === undefined) {
            const target = Circle.objects[event.target.id];
            console.log("Мышь вышла из фигуры", event.target.id)
            target.press_mouse = false;
            target.last_mouse_coord.x = undefined;
            target.last_mouse_coord.y = undefined;
            target.position_correction();
        // }
    }

    get coords_as_cell(){
        const $me = $(`#` + this.my_id)
        return [this.x_as_cell($me), this.y_as_cell($me)];
    }

    x_as_cell($me){
        const x = $me.attr('x');
        const b_x = x - (base_cell.width / 2 - base_circle.r) / 2 - base_circle.r;
        return Math.round(b_x / base_cell.width) * base_cell.width;
    }

    y_as_cell($me){
        const y = $me.attr('y');
        const b_y = y - (base_cell.height / 2 - base_circle.r) / 2 - base_circle.r;
        return Math.round(b_y / base_cell.height) * base_cell.height;
    }

    position_correction() {
        const $me = $(`#` + this.my_id)
        // const x = $me.attr('x');
        // const y = $me.attr('y');
        // // const b_x = x - (base_cell.width / 2 - base_circle.r) / 2;
        // // const b_y = y - (base_cell.height / 2 - base_circle.r) / 2;
        // const b_x = x - (base_cell.width / 2 - base_circle.r) / 2 - base_circle.r;
        // const b_y = y - (base_cell.height / 2 - base_circle.r) / 2 - base_circle.r;
        // const cell_x = Math.round(b_x / base_cell.width) * base_cell.width;
        // const cell_y = Math.round(b_y / base_cell.height) * base_cell.height;
        const cell_x = this.x_as_cell($me);
        const cell_y = this.y_as_cell($me);

        if (cell_x <= base_cell.width * base_cell.count_x && cell_y <= base_cell.height * base_cell.count_y){
            const a_x = cell_x + (base_cell.width / 2 - base_circle.r) + base_circle.r;
            const a_y = cell_y + (base_cell.height / 2 - base_circle.r) + base_circle.r;
            // $me.animate({"x": a_x, "y": a_y}, {
            //     "duration": 50, "always": () => {
            //         this.update_events();
            //         $me.attr("x", a_x);
            //         $me.attr("y", a_y);
            //         $me.attr("style", "");
            //
            //     }
            // }
            $me.attr("x", a_x);
            $me.attr("y", a_y);
        }

    }

    static get_random_soldater(){
        return `soldier_${Math.round(Math.random() * 25 + 1)}`
    }
    set_position(x, y){
        const $me = $(`#` + this.my_id);
        $me.attr('x', x);
        $me.attr("y", y);
        this.update_events(true);
    }
    get_pos_x(){
        return $(`#` + this.my_id).attr('x');
    }
    get_pos_y(){
        return $(`#` + this.my_id).attr('y');
    }

}

create_all_svg_border(4, 4, 70);