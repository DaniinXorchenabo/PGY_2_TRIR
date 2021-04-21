
let count_figures = 0

let delete_event = new Event("destroy_figure", {bubbles: true, cancelable: true})

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


let main_svg_id = "main_svg";
let start_content_id = "Start_content";
// let $output = $("#text_test")
let windows_w = window.innerWidth;
let windows_h = window.innerHeight;
let rect_exit = $("#rect_exit");


let figures = [];

// $("#" + main_svg_id).css("width", windows_w).css("height", windows_h);
// rect_exit.css({
//     "x": windows_w / 2 - parseFloat(rect_exit.css("width")) / 2,
//     "y": windows_h / 2 - parseFloat(rect_exit.css("height")) / 2
// })

console.log();


jQuery.easing["parabola"] = p => p ** 0.1


class Point {
    x = 0
    y = 0

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get str() {
        return `${this.x},${this.y}`;
    }

    get_vector(point) {
        return [point.x - this.x, point.y - this.y];
    }

    set_coordinate(x, y) {
        this.x = x;
        this.y = y;
    }

    intersection_lines(to_point, other_p1, other_p2) {
        if (Math.abs(to_point.y - this.y + to_point.x - this.x) < 1) {
            return false;
        }
        if (Math.abs(other_p1.y - other_p2.y + other_p1.x - other_p2.x) < 1) {
            return false;
        }
        let pr1 = (other_p1.x - this.x) * (to_point.y - this.y) - (other_p1.y - this.y) * (to_point.x - this.x);
        let pr2 = (other_p2.x - this.x) * (to_point.y - this.y) - (other_p2.y - this.y) * (to_point.x - this.x);
        let pr3 = (this.x - other_p1.x) * (other_p2.y - other_p1.y) - (this.y - other_p1.y) * (other_p2.x - other_p1.x);
        let pr4 = (to_point.x - other_p1.x) * (other_p2.y - other_p1.y) - (to_point.y - other_p1.y) * (other_p2.x - other_p1.x);
        return pr1 * pr2 <= 0 && pr3 * pr4 <= 0;
    }

    intersection_point(to_point, other_p1, other_p2) {
        // check to https://habr.com/ru/post/267037/
        let ab_x = to_point.x - this.x;
        let ab_y = to_point.y - this.y;
        let ac_x = other_p1.x - this.x;
        let ac_y = other_p1.y - this.y;
        let ad_x = other_p2.x - this.x;
        let ad_y = other_p2.y - this.y;

        let ab_ac = (ab_x * ac_y) - (ab_y * ac_x);
        let ab_ad = (ab_x * ad_y) - (ab_y * ad_x);
        let k = ab_ac / ab_ad;
        let px = other_p1.x + (other_p2.x - other_p1.x) * Math.abs(ab_ac) / Math.abs(ab_ad - ab_ac);
        let py = other_p1.y + (other_p2.y - other_p1.y) * Math.abs(ab_ac) / Math.abs(ab_ad - ab_ac);
        return [Math.abs(px), Math.abs(py)];
    }
}

let exit_obj = {
    up_left: new Point(0, 0),
    up_right: new Point(0, 1),
    down_left: new Point(1, 0),
    down_right: new Point(1, 1),
    // points: [exit_obj.up_left, exit_obj.up_right, exit_obj.down_right, exit_obj.down_left ]
}


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

let resize_event = new Event("resize", {bubbles: true, cancelable: true})
document.documentElement.dispatchEvent(resize_event);

class MoveAnimate {
    speed = 1000;
    from = -1000;
    to = 1000;
    css_param = {};
    options = {};
    mass = 1

    constructor(start_point, end_point, speed, mass = 1, css_param = {}, options = {}) {
        this.from = start_point;
        this.to = end_point;
        this.speed = speed;
        this.css_param = css_param;
        this.options = options;
        this.mass = mass;
    }

    change_start_and_end() {
        [this.to, this.from] = [this.from, this.to];
    }

    get x_s() {
        return this.start_point.x;
    }

    get y_s() {
        return this.start_point.y;
    }

    get x_e() {
        return this.end_point.x;
    }

    get y_e() {
        return this.end_point.y;
    }

}


class Collision {
    static collision_objects = []
    obj_1;
    obj_2;
    element_collision_id = "";
    mass = 1;


    constructor(obj_1, obj_2, collision_point = [0, 0]) {
        if (!(obj_1.x_animate && obj_1.y_animate && obj_2.x_animate && obj_2.y_animate)){
            return false;
        }
        this.element_collision_id = `collision_${obj_1.my_id}_${Math.round(collision_point[0])}_${Math.round(collision_point[1])}_${Collision.collision_objects.length}`;
        this.obj_1 = obj_1;
        this.obj_2 = obj_2;

        if (Collision.no_collision(obj_1) || Collision.no_collision(obj_2)) {
            this.change_animate(obj_1, obj_2);
            obj_1.$my_obj.stop(true);
            obj_2.$my_obj.stop(true);
            // console.log("остановили анимацию");
        }
        Collision.collision_objects.push([obj_1.my_id, obj_2.my_id, this]);

        setTimeout(() => {
            Collision.delete_collision(obj_1, obj_2);
        }, 500);


        // setTimeout( () => {
        //
        //     this.element_collision_id = `collision_${obj_1.my_id}_${Math.round(collision_point[0])}_${Math.round(collision_point[1])}_${Collision.collision_objects.length}`;
        //
        //
        //     let col_point = `<use id="${this.element_collision_id}"
        //                          xlink:href="#marker_${obj_1.my_id}" x="${collision_point[0]}" y="${collision_point[1]}" />`
        //
        //     let collision_event = new CustomEvent("collision_figures", {
        //         bubbles: true,
        //         cancelable: true,
        //         detail: {"data": col_point, "obj_1": obj_1, "obj_2": obj_2}
        //         // detail: {"obj_1": obj_1, "obj_2": obj_2, "me": this, "collision_point": collision_point}
        //     })
        //     document.documentElement.dispatchEvent(collision_event);
        // });
    }

    static no_collision(obj) {
        // true - если столкновений нет
        let testing_id = obj.my_id;
        return Collision.collision_objects.filter(i => i[0] === testing_id || i[1] === testing_id).length === 0;
    }

    static delete_collision(obj_1, obj_2) {
        Collision.collision_objects.reduce((arr, p, ind) => {
            // console.log("=---Collis", arr, p, ind, obj_1.my_id, obj_2.my_id);
            if ((p[0] === obj_1.my_id || p[0] === obj_2.my_id) &&
                (p[1] === obj_1.my_id || p[1] === obj_2.my_id)) {
                // console.log("-----УУУУДАЛЕНИЕ");
                $(`#${p[2].element_collision_id}`).remove();
                arr.push(ind)
            }
            return arr;
        }, []).reverse().map((ind) => Collision.collision_objects.splice(ind, 1))
        // console.log("удалил еолизию")
    }

    change_animate(obj_1, obj_2) {
        if (!(obj_1.x_animate && obj_1.y_animate && obj_2.x_animate && obj_2.y_animate)){
            return false;
        }
        let m1 = obj_1.x_animate.mass;
        let m2 = obj_2.x_animate.mass;

        let v1_x = obj_1.x_animate.speed;
        let v1_y = obj_1.y_animate.speed;
        let v2_x = obj_2.x_animate.speed;
        let v2_y = obj_2.y_animate.speed;
        v1_x = v1_x < 0 ? 0 : v1_x;
        v1_y = v1_y < 0 ? 0 : v1_y;
        v2_x = v2_x < 0 ? 0 : v2_x;
        v2_y = v2_y < 0 ? 0 : v2_y;

        let flag_x = (obj_1.x_animate.to > obj_1.x_animate.from) === (obj_2.x_animate.to > obj_2.x_animate.from) ? 1 : -1;
        let flag_y = (obj_1.y_animate.to > obj_1.y_animate.from) === (obj_2.y_animate.to > obj_2.y_animate.from) ? 1 : -1;

        if (v1_x !== 0 && v2_x !== 0) {
            if ((obj_1.x_animate.to < obj_1.x_animate.from) && (obj_2.x_animate.to > obj_2.x_animate.from) && (obj_1.center_x < obj_2.center_x)) {

            }
            else if ((obj_2.x_animate.to < obj_2.x_animate.from) && (obj_1.x_animate.to > obj_1.x_animate.from) && (obj_1.center_x > obj_2.center_x)) {

            }
            else {
                obj_1.x_animate.speed = this.change_speed(m1, m2, v1_x, flag_x * v2_x);
                obj_2.x_animate.speed = this.change_speed(m2, m1, v2_x, flag_x * v1_x);
            }
        }

        if (v1_y !== 0 && v2_y !== 0) {
            if ((obj_1.y_animate.to < obj_1.y_animate.from) && (obj_2.y_animate.to > obj_2.y_animate.from) && (obj_1.center_y < obj_2.center_y)) {

            }
            else if ((obj_2.y_animate.to < obj_2.y_animate.from) && (obj_1.y_animate.to > obj_1.y_animate.from) && (obj_1.center_y > obj_2.center_y)) {

            } else {
                obj_1.y_animate.speed = this.change_speed(m1, m2, v1_y, flag_y * v2_y);
                obj_2.y_animate.speed = this.change_speed(m2, m1, v2_y, flag_y * v1_y);

            }
        }

        for (let obj of [obj_1.x_animate, obj_1.y_animate, obj_2.x_animate, obj_2.y_animate]) {
            if (obj.speed < 0) {
                obj.change_start_and_end();
                obj.speed *= -1;
            }
        }

        console.log([obj_1.x_animate, obj_1.y_animate, obj_2.x_animate, obj_2.y_animate].map(i => i.speed));
    }


    change_speed(m1, m2, v1, v2) {
        // console.log("speed", ((m1 - m2) * v1 - 2 * m2 * v2) / (m1 + m2));
        let res = -(((m1 - m2) * v1 - 2 * m2 * v2) / (m1 + m2));
        // console.log(res, "mass:", m1, m2, "speed", v1, v2);
        return res;
    }


}

class BaseFigure {
    #points = [];
    dynamic_points = [];
    my_obj;
    $my_obj;
    now_x = 0;
    now_y = 0;
    start_x;
    start_y;
    #center_x;
    #center_y;
    destroy = false;
    counter = 0;
    #max_left = Infinity;
    #max_right = -Infinity;
    #max_up = Infinity;
    #max_down = -Infinity;
    x_animate = undefined;
    y_animate = undefined;
    destroy_process = false;

    static x_limit_center = 40;
    static y_limit_center = 40;
    static all_figures = {};
    static all_figures_list = [];


    get center_x() {
        return this.now_x + (this.#center_x);
    }

    get center_y() {
        return this.now_y + (this.#center_y);
    }

    get raw_center_x() {
        return this.#center_x;
    }

    get raw_center_y() {
        return this.#center_y;
    }

    get left_border() {
        return this.#max_left;
    }

    get right_border() {
        return this.#max_right;
    }

    get up_border() {
        return this.#max_up;
    }

    get bottom_border() {
        return this.#max_down;
    }


    create_figure(my_id,
                  points = [new Point(0, 0), new Point(10, 10)],
                  color = 'red',
                  stroke = "blue",
                  border_size = 1) {

        let result = `<polygon id="_${my_id}" fill="${color}" stroke="${stroke}" stroke-width="${border_size}"
                        points="${points.reduce(((old, p) => old + " " + p.str), "")}" />
                      <polyline stroke="black" stroke-width="1px" fill="none" id="marker_${my_id}" 
                        points="0,0 6,0, -6,0, 0,0 0,6 0,-6"/>`;
        result = `<defs>${result}</defs>
                    <use id="${my_id}" xlink:href="#_${my_id}" x="${points[0].x}" y="${points[0].y}" />`;
        result += `<use id="center_${my_id}" xlink:href="#marker_${my_id}" x="0" y="0" />
                            <use id="left_up_${my_id}" xlink:href="#marker_${my_id}" x="0" y="0" />
                            <use id="right_down_${my_id}" xlink:href="#marker_${my_id}" x="0" y="0" />`;

        this.now_x = points[0].x;
        this.now_y = points[0].y;
        this.start_x = points[0].x;
        this.start_y = points[0].y;
        [this.#center_x, this.#center_y] = points.reduce(
            (sum, p) => [sum[0] + p.x, sum[1] + p.y], [0, 0])
        this.#center_x /= points.length;
        this.#center_y /= points.length;


        [this.#max_left, this.#max_right, this.#max_down, this.#max_up,] = points.reduce(
            (arg, p) => ([arg[0] > p.x ? p.x : arg[0], arg[1] < p.x ? p.x : arg[1],
                arg[2] < p.y ? p.y : arg[2], arg[3] > p.y ? p.y : arg[3]]),
            [this.#max_left, this.#max_right, this.#max_down, this.#max_up]);

        return result;

    }

    get max_left() {
        return this.center_x - (this.#center_x - this.#max_left);
    }

    get max_right() {
        return this.center_x - (this.#center_x - this.#max_right);
    }

    get max_up() {
        return this.center_y - (this.#center_y - this.#max_up);
    }

    get max_down() {
        return this.center_y - (this.#center_y - this.#max_down);
    }

    get points() {
        let iter = this.dynamic_points.entries();
        for (let p of this.#points) {
            iter.next().value[1].set_coordinate(p.x + this.now_x, p.y + this.now_y);
        }
        return this.dynamic_points;
    }

    constructor(points, my_id,
                color = 'red',
                border_color = "blue",
                border_size = 1) {
        BaseFigure.all_figures[my_id] = this;
        BaseFigure.all_figures_list.push(this);
        // jQuery.easing[my_id + "_x"] = this.speed_change_values_x;
        // jQuery.easing[my_id + "_y"] = this.speed_change_values_y;
        this.#points = points;
        this.dynamic_points = points.map(p => new Point(p.x, p.y));
        this.my_id = my_id;

        let main = document.getElementById(main_svg_id);
        main.innerHTML += this.create_figure(my_id, points, color, border_color, border_size);

        this.my_obj = document.getElementById(my_id);
        this.center_marker = document.getElementById("center_" + my_id); //$("#center_" + my_id);
        this.up_left_marker = document.getElementById("left_up_" + my_id); //$("#left_up_" + my_id);
        this.right_down_marker = document.getElementById("right_down_" + my_id);
        this.$my_obj = $("#" + this.my_id);
        // this.x_animate = new MoveAnimate(0 ,0 ,0);
        // this.y_animate = new MoveAnimate(0, 0, 0);
        console.log(this.max_left, this.max_right, this.max_up, this.max_down, this.$my_obj)
        count_figures += 1;
        let content = document.getElementById(`count_all_obj`);
        content.innerHTML = content.innerHTML.split('-')[0] + "- " + count_figures;
        document.documentElement.dispatchEvent(delete_event);

    }

    static destroyed_animate(me) {
        me.destroy_process = true;
        $("#" + me.my_id).stop(true).animate({
                x: windows_w / 2 - me.#center_x,
                y: windows_h / 2 - me.#center_y,
            },
            {
                queue: false,
                duration: Math.sqrt(((windows_w / 2 - me.#center_x - me.now_x) / me.x_animate.speed) ** 2 + ((windows_h / 2 - me.#center_y - me.now_y) / me.y_animate.speed) ** 2) * 1000,
                step: me.animate_figure,
                easing: "linear",
                always: (() => {

                    console.log('Destroy');
                    me.destroy = true;
                    BaseFigure.all_figures_list = BaseFigure.all_figures_list.filter((i) => !i.destroy);
                    delete BaseFigure.all_figures[me.my_id];
                    me.$my_obj.stop(true, false).hide(1000, "linear", () => $("#" + me.my_id).remove())
                    setTimeout((() => {
                        $("#" + me.my_id).remove();
                        document.documentElement.dispatchEvent(delete_event);
                    }), 2050);
                }),
            });
        console.log("Прервали анимацию!");
    }


    collision_controller() {
        // console.log("--");
        // if (this.change_animate) { return true; }
        if (!Collision.no_collision(this)) {
            return false;
        }

        let may_be_collision = BaseFigure.all_figures_list.filter((f, i, arr, me = this) => (
            !f.destroy &&
            (me.my_id !== f.my_id) &&
            //( a.y < b.y1 || a.y1 > b.y || a.x1 < b.x || a.x > b.x1 );
            me.max_down >= f.max_up && me.max_up <= f.max_down &&
            me.max_right >= f.max_left && me.max_left <= f.max_right
        ));

        if (may_be_collision.length === 0) {
            return false;
        }
        // console.log(this.my_id, "||", may_be_collision.map(p => p.my_id));
        return may_be_collision.some((f, ind, arr, me = this) => {

            let first_point_f;
            let me_points = this.points;
            // console.log(this.#points.map(p => p.str));
            let f_points;
            let me_first_point = me_points[me_points.length - 1];

            for (let me_second_point of me_points) {
                f_points = f.points;
                first_point_f = f_points[f_points.length - 1];
                for (let second_point_f of f_points) {
                    if (me_first_point.intersection_lines(me_second_point, first_point_f, second_point_f)) {
                        // console.log("обнаружена колизия", me_first_point, me_second_point, first_point_f, second_point_f);
                        let [x_collision, y_collision] = me_first_point.intersection_point(me_second_point, first_point_f, second_point_f);
                        console.log("обнаружена колизия", x_collision, y_collision);

                        let d = new Collision(me, f, [x_collision, y_collision]);
                        // me.flag_collision = true;
                        return true;
                    }

                    first_point_f = second_point_f;
                }
                // console.log("------", me_first_point, me_second_point);
                // console.log(me_first_point, me_second_point);
                me_first_point = me_second_point;

            }
            return false;
        });
    }

    static all_collision_controller(){
        let arr = BaseFigure.all_figures_list.filter(f => !f.destroy_process && !f.destroy);
        for (let i = 0; arr.length > i; i++) {
            let test_figure = arr[i];

            let may_be_collision = []
            for (let j = i + 1; arr.length > j; j++) {
                let f = arr[j];
                if (test_figure.max_down >= f.max_up && test_figure.max_up <= f.max_down &&
                    test_figure.max_right >= f.max_left && test_figure.max_left <= f.max_right){
                    may_be_collision.push(f);
                }
            }
            if (may_be_collision.length > 0){
                for (let f of may_be_collision) {
                    let first_point_f;
                    let me_points = test_figure.points;
                    let f_points;
                    let me_first_point = me_points[me_points.length - 1];

                    for (let me_second_point of me_points) {
                        f_points = f.points;
                        first_point_f = f_points[f_points.length - 1];
                        for (let second_point_f of f_points) {
                            if (me_first_point.intersection_lines(me_second_point, first_point_f, second_point_f)) {
                                let [x_collision, y_collision] = me_first_point.intersection_point(me_second_point, first_point_f, second_point_f);
                                // console.log("обнаружена колизия", x_collision, y_collision);
                                let d = new Collision(test_figure, f, [x_collision, y_collision]);
                            }

                            first_point_f = second_point_f;
                        }
                        me_first_point = me_second_point;

                    }
                }
            }
        }
    }


    animate_figure = (now, obj, _, me = this) => {
        if (me.destroy) {
            return false;
        }
        if (obj.prop === "x") {
            me.d_x = now - me.now_x;
            me.now_x = now;
            // console.log(me.max_right);
            if ((me.max_left <= 0 && me.d_x < 0) || (me.max_right >= windows_w && me.d_x > 0)) { //
                if (!me.$my_obj) {
                    me.$my_obj = $("#" + this.my_id);
                }
                this.x_animate.change_start_and_end();
                me.$my_obj.stop(true);
            }

        }

        if (obj.prop === "y") {
            me.d_y = now - me.now_y;
            me.now_y = now;
            if ((me.max_up <= 0 && me.d_y < 0) || (me.max_down >= windows_h && me.d_y > 0)) {
                if (!me.$my_obj) {
                    me.$my_obj = $("#" + this.my_id);
                }
                this.y_animate.change_start_and_end();
                me.$my_obj.stop(true);
            }
        }
        // me.center_marker = document.getElementById("center_" + me.my_id); //$("#center_" + my_id);
        // me.up_left_marker = document.getElementById("left_up_" + me.my_id); //$("#left_up_" + my_id);
        // me.right_down_marker = document.getElementById("right_down_" + me.my_id);
        // me.center_marker.style.x = me.center_x;
        // me.center_marker.style.y = me.center_y;
        // me.up_left_marker.style.x = me.max_left;
        // me.up_left_marker.style.y = me.max_up;
        // me.right_down_marker.style.x = me.max_right;
        // me.right_down_marker.style.y = me.max_down;

        if (!me.destroy_process) {
            if (me.max_down >= exit_obj.up_left.y && me.max_up <= exit_obj.down_left.y &&
                me.max_right >= exit_obj.up_left.x && me.max_left <= exit_obj.up_right.x) {

                let first_point_f;
                let me_points = me.points;
                let f_points;
                let me_first_point = me_points[me_points.length - 1];

                for (let me_second_point of me_points) {
                    f_points = [exit_obj.up_left, exit_obj.up_right, exit_obj.down_right, exit_obj.down_left];
                    first_point_f = f_points[f_points.length - 1];
                    for (let second_point_f of f_points) {
                        if (me_first_point.intersection_lines(me_second_point, first_point_f, second_point_f)) {
                            BaseFigure.destroyed_animate(me);
                            return
                        }
                        first_point_f = second_point_f;
                    }
                    me_first_point = me_second_point;

                }

            }
        }

        if (!me.destroy_process) {
            me.collision_controller();
        }
    }

    get_coordinates = (now, obj, _, me = this) => {
        if (obj.prop === "x") {
            me.d_x = now - me.now_x;
            me.now_x = now;
        }
        if (obj.prop === "y") {
            me.d_y = now - me.now_y;
            me.now_y = now;
        }
    }

    fixed_fps_renderer = (me = this) => {
        if (me.destroy) {
            return false;
        }

        if (!me.destroy_process) {
            if (me.max_down >= exit_obj.up_left.y && me.max_up <= exit_obj.down_left.y &&
                me.max_right >= exit_obj.up_left.x && me.max_left <= exit_obj.up_right.x) {

                let first_point_f;
                let me_points = me.points;
                let f_points;
                let me_first_point = me_points[me_points.length - 1];

                for (let me_second_point of me_points) {
                    f_points = [exit_obj.up_left, exit_obj.up_right, exit_obj.down_right, exit_obj.down_left];
                    first_point_f = f_points[f_points.length - 1];
                    for (let second_point_f of f_points) {
                        if (me_first_point.intersection_lines(me_second_point, first_point_f, second_point_f)) {
                            BaseFigure.destroyed_animate(me);
                            return
                        }
                        first_point_f = second_point_f;
                    }
                    me_first_point = me_second_point;

                }

            }
        }

        if ((me.max_left <= 0 && me.d_x < 0) || (me.max_right >= windows_w && me.d_x > 0)) { //
            if (!me.$my_obj) {
                me.$my_obj = $("#" + this.my_id);
            }
            this.x_animate.change_start_and_end();
            me.$my_obj.stop(true);
            return
        }

        if ((me.max_up <= 0 && me.d_y < 0) || (me.max_down >= windows_h && me.d_y > 0)) {
            if (!me.$my_obj) {
                me.$my_obj = $("#" + this.my_id);
            }
            this.y_animate.change_start_and_end();
            me.$my_obj.stop(true);
            return
        }
    }

    animate(from_x = -1000, to_x = 2000,
            from_y = -1000, to_y = 1000,
            speed_x = 200, speed_y = 200, mass = 1,
            css_param = {}, options = {},
            setup_func = this.animate_figure,
            obj = $('#' + this.my_id)) {

        if (!this.x_animate) {
            this.x_animate = new MoveAnimate(from_x, to_x, speed_x, mass, css_param, options);
        } else {
            // this.x_animate.change_start_and_end();
        }

        if (!this.y_animate) {
            this.y_animate = new MoveAnimate(from_y, to_y, speed_y, mass, css_param, options);
        } else {
            // this.y_animate.change_start_and_end();
        }

        this.$my_obj = obj;
        this.counter++;

        if (this.destroy || this.destroy_process) {
            return false;
        }
        console.log(from_x, to_x, from_y, to_y, speed_x, speed_y);

        speed_x = (speed_x === 0 ? 0.00001 : speed_x);
        speed_y = (speed_y === 0 ? 0.00001 : speed_y);

        if (to_x - from_x !== 0 && speed_x > 0) {
            // console.log("---------------");
            obj.animate(
                {x: this.x_animate.to},
                {
                    queue: false,
                    duration: Math.abs(this.x_animate.to - this.now_x) / speed_x * 1000,
                    always: (() => (this.animate(
                        this.x_animate.from, this.x_animate.to,
                        0, 0,
                        this.x_animate.speed, 0,
                        this.x_animate.mass,
                        this.x_animate.css_param, this.x_animate.options
                    ))),
                    step: setup_func,
                    easing: "linear"
                    // easing: this.my_id + "_x",
                }
            );
        }
        if (to_y - from_y !== 0 && speed_y > 0) {
            obj.animate(
                {y: this.y_animate.to},
                {
                    queue: false,
                    duration: Math.abs(this.y_animate.to - this.now_y) / speed_y * 1000,
                    always: (() => (this.animate(
                        0, 0,
                        this.y_animate.from, this.y_animate.to,
                        0, this.y_animate.speed,
                        this.y_animate.mass,
                        this.y_animate.css_param, this.y_animate.options
                    ))),
                    step: setup_func,
                    easing: "linear"
                    // easing: this.my_id + "_y",
                }
            );
        }
    }

}


// $(`#${start_content_id}`).css("display", "none");
// $(`#${main_svg_id}`).css("display", "inline");
// let a1 = new BaseFigure([new Point(70, 90), new Point(110, 80), new Point(210, 10)], "id1")
// // let b = new BaseFigure([new Point(30, 10), new Point(50, 10), new Point(90, 70)], "id2")
// let a3 = new BaseFigure([new Point(230, 100), new Point(240, 130), new Point(250, 90)], "id3")
// a1.animate(-1000, 2000, -1000, 1000, 1, 100);
// a3.animate(2000, -2000, -1000, 1000, 150, 1);
//
// let p1 = new Point(10, 0);
// let p2 = new Point(10, 10);
// let p3 = new Point(0, 5);
// let p4 = new Point(20, 5);
// console.log(p1.intersection_lines(p2, p3, p4));

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

function base_jq_animate(max_start_speed=150, max_mass=10){

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

function fixed_fps_animate(max_start_speed=150, max_mass=6, update_interval = 20){
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

function start(count_figures, max_size=300, max_points_count = 10, max_start_speed, max_mass=6) {
    console.log(count_figures);
    figures = Array(parseInt(count_figures)).fill(0).map((e, i) => i + 1);
    console.log(figures);
    figures.map(
        (i, ind) => {

            let points = Array(getRandomInt(3, max_points_count)).fill(0).map((e, i) => i + 1);
            let min_a = getRandomSign() * 0.05;
            return new BaseFigure(generate_nice_figure(points.map(i => new Point(getRandomInt(0, max_size), getRandomInt(0, max_size)))),
                `figure_${ind}`,
                getRandomRGBColorString(min_a + 0.05),
                getRandomRGBColorString(Math.abs(min_a - 0.05)),
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





// console.log(generate_nice_figure(
//     [
//         new Point(0, 0),
//         new Point(0, 10),
//         new Point(10, 10),
//         new Point(20, 20),
//         new Point(0, 0)
//     ]
// ).map( p => p.str));

// 7,133 98,116 101,141 128,16 123,9 110,33 90,34 61,11 41,97