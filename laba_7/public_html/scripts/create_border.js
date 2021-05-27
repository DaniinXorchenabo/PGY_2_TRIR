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