function test() {
    $('#c1').animate({'cx': 80})
    console.log('0----------------w---')
}


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

window.addEventListener(`resize`, event => {
    console.log('----------------------', event)
    windows_w = window.innerWidth - 40;
    windows_h = window.innerHeight - 40;

    $("#" + main_svg_id).css("width", windows_w).css("height", windows_h);
    $("#rect_exit").css({
        "x": windows_w / 2 - parseFloat(rect_exit.css("width")) / 2,
        "y": windows_h / 2 - parseFloat(rect_exit.css("height")) / 2
    })

    console.log(windows_w, windows_h);
}, false);

let resize_event = new Event("resize", {bubbles : true, cancelable : true})
document.documentElement.dispatchEvent(resize_event);

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


    constructor(obj_1, obj_2, collision_point = [0, 0]) {

            this.element_collision_id = `collision_${obj_1.my_id}_${Math.round(collision_point[0])}_${Math.round(collision_point[1])}_${Collision.collision_objects.length}`;
            this.obj_1 = obj_1;
            this.obj_2 = obj_2;

            if (Collision.no_collision(obj_1) || Collision.no_collision(obj_2)) {
                this.change_animate(obj_1, obj_2);
                obj_1.$my_obj.stop();
                obj_2.$my_obj.stop();
                console.log("остановили анимацию");
            }
        Collision.collision_objects.push([obj_1.my_id, obj_2.my_id, this]);

        setTimeout( () => {
                Collision.delete_collision(obj_1, obj_2);
            }, 1000);


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
            console.log("=---Collis", arr, p, ind, obj_1.my_id, obj_2.my_id);
            if ((p[0] === obj_1.my_id || p[0] === obj_2.my_id) &&
                (p[1] === obj_1.my_id || p[1] === obj_2.my_id)) {
                console.log("-----УУУУДАЛЕНИЕ");
                $(`#${p[2].element_collision_id}`).remove();
                arr.push(ind)
            }
            return arr;
        }, []).reverse().map((ind) => Collision.collision_objects.splice(ind, 1))
        // console.log("удалил еолизию")
    }

    change_animate(obj_1, obj_2) {
        let m1 = obj_1.x_animate.mass;
        let m2 = obj_2.x_animate.mass;

        let v1_x = obj_1.x_animate.speed;
        let v1_y = obj_1.y_animate.speed;
        let v2_x = obj_2.x_animate.speed;
        let v2_y = obj_2.y_animate.speed;

        let flag_x =  (obj_1.x_animate.to > obj_1.x_animate.from) === (obj_2.x_animate.to > obj_2.x_animate.from)? 1: -1;
        let flag_y =  (obj_1.y_animate.to > obj_1.y_animate.from) === (obj_2.y_animate.to > obj_2.y_animate.from)? 1: -1;

        obj_1.x_animate.speed = this.change_speed(m1, m2, v1_x, flag_x * v2_x);
        obj_1.y_animate.speed = this.change_speed(m1, m2, v1_y, flag_y * v2_y);
        obj_2.x_animate.speed = this.change_speed(m2, m1, v2_x, flag_x * v1_x);
        obj_2.y_animate.speed = this.change_speed(m2, m1, v2_y, flag_y * v1_y);



        for (let obj of [obj_1.x_animate, obj_1.y_animate, obj_2.x_animate, obj_2.y_animate]) {
            if (obj.speed < 0) {
                obj.change_start_and_end();
                obj.speed *= -1;
            }
        }
    }


    change_speed(m1, m2, v1, v2) {
        // console.log("speed", ((m1 - m2) * v1 - 2 * m2 * v2) / (m1 + m2));
        return (((m1 - m2) * v1 - 2 * m2 * v2) / (m1 + m2));
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

    static x_limit_center = 140;
    static y_limit_center = 140;
    static all_figures = {};
    static all_figures_list = [];


    get center_x() {
        return this.now_x + (this.#center_x);
    }
    get center_y() {
        return this.now_y + (this.#center_y);
    }

    create_figure(my_id,
                  points = [new Point(0, 0), new Point(10, 10)],
                  color = 'red',
                  stroke = "blue") {

        let result = `<polygon id="_${my_id}" fill="${color}" stroke="${stroke}" stroke-width="1"
                        points="${points.reduce(((old, p) => old + " " + p.str), "")}" />
                      <polyline stroke="black" stroke-width="1px" fill="none" id="marker_${my_id}" 
                        points="0,0 6,0, -6,0, 0,0 0,6 0,-6"/>`;
        result = `<defs>${result}</defs>
                    <use id="${my_id}" xlink:href="#_${my_id}" x="${points[0].x}" y="${points[0].y}" />`;
        // result +=  `<use id="center_${my_id}" xlink:href="#marker_${my_id}" x="0" y="0" />
        //                     <use id="left_up_${my_id}" xlink:href="#marker_${my_id}" x="0" y="0" />`;

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

    constructor(points, my_id) {
        BaseFigure.all_figures[my_id] = this;
        BaseFigure.all_figures_list.push(this);
        // jQuery.easing[my_id + "_x"] = this.speed_change_values_x;
        // jQuery.easing[my_id + "_y"] = this.speed_change_values_y;
        this.#points = points;
        this.dynamic_points = points.map(p => new Point(p.x, p.y));
        this.my_id = my_id;

        let main = document.getElementById(main_svg_id);
        main.innerHTML += this.create_figure(my_id, points);

        this.my_obj = document.getElementById(my_id);
        // this.center_marker = document.getElementById("center_" + my_id); //$("#center_" + my_id);
        // this.up_left_marker = document.getElementById("left_up_" + my_id); //$("#left_up_" + my_id);
        this.$my_obj = $("#" + this.my_id);
        console.log(this.max_left, this.max_right, this.max_up, this.max_down, this.$my_obj)
    }

    static destroyed_animate(me) {
        me.destroy_process = true;
        $("#" + me.my_id).stop(true).animate({
                x: windows_w / 2 - me.#center_x,
                y: windows_h / 2 - me.#center_y,
            },
            {
                queue: false,
                duration: 1000,
                step: me.animate_figure,
                easing: "parabola",
                always: (() => {
                    console.log('Destroy');
                    me.destroy = true;
                    me.$my_obj.stop().hide();

                }),
            });
        console.log("Прервали анимацию!");
    }


    collision_controller() {
        // console.log("--");
        // if (this.change_animate) { return true; }
        if (!Collision.no_collision(this)) { return false; }
        let may_be_collision = BaseFigure.all_figures_list.filter((f, i, arr, me = this) => (
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


    animate_figure = (now, obj, _, me = this) => {
        setTimeout( () => {
            if (obj.prop === "x") {
                let d_x = now - me.now_x;
                me.now_x = now;
                // console.log(me.max_right);
                if (me.max_left <= 0) { // && d_x < 0
                    console.log(me.max_left, me.max_right);
                    me.$my_obj.stop(true);
                } else if (me.max_right >= windows_w && d_x > 0) {
                    me.$my_obj.stop(true);
                }

            }
        });
        setTimeout( () => {
            if (obj.prop === "y") {
                let d_y = now - me.now_y;
                me.now_y = now;
                // if (me.max_up <= 0 && d_y < 0) {
                //     me.$my_obj.stop(true);
                // } else if (me.max_down >= windows_h && d_y > 0) {
                //     me.$my_obj.stop(true);
                // }
            }
        });
        me.center_marker = document.getElementById("center_" + me.my_id); //$("#center_" + my_id);
        me.up_left_marker = document.getElementById("left_up_" +me.my_id); //$("#left_up_" + my_id);
        // me.center_marker.style.x = me.center_x;
        // me.center_marker.style.y = me.center_y;
        // me.up_left_marker.style.x = me.max_left;
        // me.up_left_marker.style.y = me.max_down;

        setTimeout( () => {
            if (Math.abs(windows_h / 2 - me.center_y) <= BaseFigure.y_limit_center) {
                if (Math.abs(windows_w / 2 - me.center_x) <= BaseFigure.x_limit_center) {
                    if (!me.destroy_process) {
                        BaseFigure.destroyed_animate(me);
                    }
                    if (Math.abs(windows_h / 2 - me.center_y) <= 1) {
                        if (Math.abs(windows_w / 2 - me.center_x) <= 1) {
                            console.log('Destroy');
                            me.$my_obj.stop().hide();
                            me.destroy = true;
                        }
                    }
                }
            }
        });


        setTimeout( () => {
            me.collision_controller()
        });
    }

    animate(from_x = -1000, to_x = 2000,
            from_y = -1000, to_y = 1000,
            speed_x = 200, speed_y = 200, mass = 1,
            css_param = {}, options = {}, obj = $('#' + this.my_id)) {

        if (!this.x_animate) {
            this.x_animate = new MoveAnimate(from_x, to_x, speed_x, mass, css_param, options);
        } else {
            this.x_animate.change_start_and_end();
        }

        if (!this.y_animate) {
            this.y_animate = new MoveAnimate(from_y, to_y, speed_y, mass, css_param, options);
        } else {
            this.y_animate.change_start_and_end();
        }

        this.$my_obj = obj;
        this.counter++;

        if (this.destroy) {
            return false;
        }

        speed_x = (speed_x === 0? 0.00001: speed_x);
        speed_y = (speed_y === 0? 0.00001: speed_y);

        if (to_x - from_x !== 0 && speed_x > 0) {
            obj.animate(
                {x: this.x_animate.to},
                {
                    queue: false,
                    duration: Math.abs(this.x_animate.to - this.now_x) / speed_x * 1000,
                    always: (() => (this.animate(
                        this.x_animate.from, this.x_animate.to,
                        0, 0,
                        this.x_animate.speed, -1,
                        this.x_animate.mass,
                        this.x_animate.css_param, this.x_animate.options
                    ))),
                    step: this.animate_figure,
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
                        -1, this.y_animate.speed,
                        this.y_animate.mass,
                        this.y_animate.css_param, this.y_animate.options
                    ))),
                    step: this.animate_figure,
                    easing: "linear"
                    // easing: this.my_id + "_y",
                }
            );
        }
    }
}

let a1 = new BaseFigure([new Point(30, 70), new Point(60, 60), new Point(150, 10)], "id1")
// let b = new BaseFigure([new Point(30, 10), new Point(50, 10), new Point(90, 70)], "id2")
let a3 = new BaseFigure([new Point(230, 30), new Point(240, 60), new Point(250, 10)], "id3")
a1.animate(-1000, 2000, -1000, 1000, 120, -1);
a3.animate(-1000, 2000, -1000, 1000, 0, -1);
//
// let p1 = new Point(10, 0);
// let p2 = new Point(10, 10);
// let p3 = new Point(0, 5);
// let p4 = new Point(20, 5);
// console.log(p1.intersection_lines(p2, p3, p4));

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function start(count_figures){
    figures = (new Array(count_figures)).map((i, ind) => (new BaseFigure(new Array(getRandomInt(3, 10))).map(i), `figure_${ind}`) )
}