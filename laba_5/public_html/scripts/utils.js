function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomSign() {
    return Math.round(Math.random()) * 2 - 1;
}

function getRandomRGBColorString(min_alpha = 0) {
    return `rgba(${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${(1 - min_alpha) * Math.random() + min_alpha})`;
}

function generate_nice_figure(points) {
    points.sort((a, b) => a.x - b.x);
    let test_p1 = points[points.length - 1];
    let set_points = [];

    for (let i = 0; points.length > i; i++) {
        let test_point = points[i];
        let result = true;
        for (let j = i + 1; points.length > j; j++) {
            if (test_point.x === points[j].x && test_point.y === points[j].y) {
                result = false;
                break;
            }
        }
        if (result) {
            set_points.push(test_point);
        }
    }
    let up_part = [points[0]];
    let bottom_part = [];
    let vector_x = points[points.length - 1].x - points[0].x;
    let vector_y = points[points.length - 1].y - points[0].y;
    for (let i = 1; points.length - 1 > i; i++) {
        if ((vector_x * (points[i].y - points[0].y)) - (vector_y * (points[i].x - points[0].x)) >= 0) {
            up_part.push(points[i]);
        } else {
            bottom_part.unshift(points[i]);
        }
    }
    bottom_part.unshift(points[points.length - 1]);
    up_part = up_part.concat(bottom_part);
    // up_part.push(points[points.length-1]);


    //     if (me_first_point.intersection_lines(me_second_point, first_point_f, second_point_f)) {
    //         // console.log("обнаружена колизия", me_first_point, me_second_point, first_point_f, second_point_f);
    //         let [x_collision, y_collision] = me_first_point.intersection_point(me_second_point, first_point_f, second_point_f);
    //         console.log("обнаружена колизия", x_collision, y_collision);
    //
    //         let d = new Collision(me, f, [x_collision, y_collision]);
    //         // me.flag_collision = true;
    //         return true;
    //     }
    //
    //     first_point_f = second_point_f;
    // }

    // test_p1 = test_p2;

    // }
    console.log(up_part.map(p => p.str));

    return up_part;
}
