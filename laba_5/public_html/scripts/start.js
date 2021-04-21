function base_jq_animate(max_start_speed = 150, max_mass = 10) {

    BaseFigure.all_figures_list.map(i => setTimeout(() => {
        $("#" + i.my_id).animate({
                x: getRandomInt(0 - i.left_border + 10, windows_w - i.right_border - 10),
                y: getRandomInt(0 - i.up_border + 10, windows_h - i.bottom_border - 10),
            },
            {
                queue: false,
                duration: 1000,
                always: (() => {
                    let sign_x = getRandomSign();
                    let sign_y = getRandomSign();
                    i.destroy = false;
                    // console.log(i);
                    setTimeout(() => {
                        // console.log(i);
                        i.animate(-sign_x * 5000, sign_x * 5000, -sign_y * 5000, sign_y * 5000,
                            getRandomInt(1, max_start_speed), getRandomInt(1, max_start_speed), getRandomInt(1, max_mass));
                        // console.log(i);
                    })
                })
            })
    }));

}

function fixed_fps_animate(max_start_speed = 150, max_mass = 6, update_interval = 20) {
    BaseFigure.all_figures_list.map(i => setTimeout(() => {
        $("#" + i.my_id).animate({
                x: getRandomInt(0 - i.left_border + 10, windows_w - i.right_border - 10),
                y: getRandomInt(0 - i.up_border + 10, windows_h - i.bottom_border - 10),
            },
            {
                queue: false,
                duration: 1000,
                always: (() => {
                    let sign_x = getRandomSign();
                    let sign_y = getRandomSign();
                    i.destroy = false;
                    // console.log(i);
                    setTimeout(() => {
                        // console.log(i);
                        i.animate(-sign_x * 5000, sign_x * 5000, -sign_y * 5000, sign_y * 5000,
                            getRandomInt(1, max_start_speed), getRandomInt(1, max_start_speed), getRandomInt(1, max_mass), i.get_coordinates);
                    })
                })
            })
    }));

    BaseFigure.all_figures_list.map(i => setInterval(() => {
        i.fixed_fps_renderer();
    }, update_interval))
    setInterval(BaseFigure.all_collision_controller, update_interval);

}

function start(count_figures,
               max_size = 100,
               max_points_count = 10,
               max_start_speed,
               max_mass = 6) {
    console.log(count_figures);
    figures = Array(parseInt(count_figures)).fill(0).map((e, i) => i + 1);
    console.log(figures);
    figures.map(
        (i, ind) => {

            let points = Array(getRandomInt(3, max_points_count)).fill(0).map((e, i) => i + 1);
            let min_a = getRandomSign() * 0.2;
            return new BaseFigure(generate_nice_figure(points.map(i => new Point(getRandomInt(0, max_size), getRandomInt(0, max_size)))),
                `figure_${ind}`,
                getRandomRGBColorString(min_a + 0.2),
                getRandomRGBColorString(Math.abs(min_a - 0.2)),
                getRandomInt(1, 6));
        }
    );
    console.log(BaseFigure.all_figures_list)
    BaseFigure.all_figures_list.map(i => $("#" + i.my_id).css(
        "x", windows_w / 2 - i.raw_center_x).css(
        "y", windows_h / 2 - i.raw_center_y
    ));
    $(`#${start_content_id}`).css("display", "none");
    $(`#${main_svg_id}`).css("display", "inline");

    // base_jq_animate(max_start_speed, max_mass);
    fixed_fps_animate(max_start_speed, max_mass);

}