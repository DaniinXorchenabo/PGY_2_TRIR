function test() {
    $('#c1').animate({'cx': 80})
    console.log('0----------------w---')
}

let main_svg_id = "main_svg";
let $output = $("#text_test")
let windows_w = window.innerWidth;
let windows_h = window.innerHeight;
let rect_exit = $("#rect_exit");
$("#" + main_svg_id).css("width", windows_w).css("height", windows_h);
rect_exit.css({
    "x": windows_w / 2 - parseFloat(rect_exit.css("width")) / 2,
    "y": windows_h / 2 - parseFloat(rect_exit.css("height")) / 2
})
console.log();
window.addEventListener(`resize`, event => {
    console.log('----------------------', event)
    windows_w = window.innerWidth;
    windows_h = window.innerHeight;
    $("#" + main_svg_id).css("width", windows_w).css("height", windows_h);
    rect_exit.css({
        "x": windows_w / 2 - parseFloat(rect_exit.css("width")) / 2,
        "y": windows_h / 2 - parseFloat(rect_exit.css("height")) / 2
    })
}, false);

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
    get_vector(point){
        return [point.x - this.x, point.y - this.y];
    }
    set_coordinate(x, y){
        this.x = x;
        this.y = y;
    }
    intersection_lines(to_point, other_p1, other_p2){
        // x_1 = this; x_2 = to_point; x1 = other_p1; x2 = other_p2
        // x_1 = this.x
        // y_1 = this.y
        // x_2 = to_point.x
        // y_2 = to_point.y
        // x1 = other_p1.x
        // y1 = other_p1.y
        // x2 = other_p2.x
        // y2 = other_p2.y
        if (Math.abs(to_point.y - this.y + to_point.x - this.x) < 1){ return false; }
        if (Math.abs(other_p1.y - other_p2.y + other_p1.x - other_p2.x) < 1){ return false; }
        let pr1 = (other_p1.x - this.x) * (to_point.y - this.y) - (other_p1.y - this.y) * (to_point.x - this.x);
        let pr2 = (other_p2.x - this.x) * (to_point.y - this.y) - (other_p2.y - this.y) * (to_point.x - this.x);
        let pr3 = (this.x - other_p1.x) * (other_p2.y - other_p1.y) - (this.y - other_p1.y) * (other_p2.x - other_p1.x);
        let pr4 = (to_point.x - other_p1.x) * (other_p2.y - other_p1.y) - (to_point.y - other_p1.y) * (other_p2.x - other_p1.x);
        return pr1 * pr2 <= 0 && pr3 * pr4 <= 0;
    }
}

class MoveAnimate {
    speed = 1000;
    from = -1000;
    to = 1000;
    css_param = {};
    options = {};

    constructor(start_point, end_point, speed, css_param={}, options={}) {
        this.from = start_point;
        this.to = end_point;
        this.speed = speed;
        this.css_param = css_param;
        this.options = options;
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
    counter= 0;
    #max_left = Infinity;
    #max_right = -Infinity;
    #max_up = -Infinity;
    #max_down = Infinity;
    x_animate = undefined;
    y_animate = undefined;
    change_move_animate = false;

    static x_limit_center = 40;
    static y_limit_center = 40;
    static all_figures = {};
    static all_figures_list = [];
    center_marker;
    up_left_marker;

    #collision = 0;

    get center_x() { return this.now_x + (this.#center_x ); } /// - this.start_x
    get center_y() { return this.now_y + (this.#center_y ); } // - this.start_y

    create_figure(my_id,
                  points = [new Point(0, 0), new Point(10, 10)],
                  color = 'red',
                  stroke = "blue") {

        let result = `<polygon id="_${my_id}" fill="${color}" stroke="${stroke}" stroke-width="1"
                        points="${points.reduce(((old, p) => old + " " + p.str), "")}" />
                      <polyline stroke="black" stroke-width="1px" fill="none" id="marker_${my_id}" 
                        points="0,0 6,0, -6,0, 0,0 0,6 0,-6"/>`;
        result = `<defs>${result}</defs>
                    <use id="${my_id}" xlink:href="#_${my_id}" x="${points[0].x}" y="${points[0].y}" />
                    <use id="center_${my_id}" xlink:href="#marker_${my_id}" x="0" y="0" />
                    <use id="left_up_${my_id}" xlink:href="#marker_${my_id}" x="0" y="0" />`;

        this.now_x = points[0].x;
        this.now_y = points[0].y;
        this.start_x = points[0].x;
        this.start_y = points[0].y;
        [this.#center_x, this.#center_y] = points.reduce(
            (sum, p) => [sum[0] + p.x, sum[1] + p.y], [0, 0])
        this.#center_x /= points.length;
        this.#center_y /= points.length;


        [this.#max_left, this.#max_right, this.#max_up, this.#max_down] = points.reduce(
            (arg, p) => ([arg[0] > p.x? p.x:arg[0], arg[1] < p.x? p.x: arg[1],
                arg[2] < p.y? p.y: arg[2], arg[3] > p.y? p.y: arg[3]]),
            [this.#max_left, this.#max_right, this.#max_up, this.#max_down]);

        return result;

    }
    get max_left(){ return this.center_x + (this.#center_x - this.#max_left);}
    get max_right(){ return this.center_x +  (this.#center_x - this.#max_right);}
    get max_up(){ return this.center_y + (this.#center_y - this.#max_up);}
    get max_down(){ return this.center_y + (this.#center_y - this.#max_down);}

    get points(){
        let iter = this.dynamic_points.entries();
        for (let p of this.#points){
            iter.next().value[1].set_coordinate(p.x + this.now_x, p.y + this.now_y);
        }
        return this.dynamic_points;
    }

    get change_animate(){
        if (this.#collision === 1 || this.#collision === 2){
            this.#collision += 2;
            return true;
        } else if (this.#collision !== 0) {
            this.#collision++;
            if (this.#collision > 5) {
                this.#collision = 0;
            }
        }
        return false;
    }

    set flag_collision(flag){
        if (flag){
            this.#collision += 1;
        } else {
            if (this.#collision !== 0) {
                this.#collision += 1;
            } else {
                this.#collision = 3;
            }
        }
    }

    constructor(points, my_id) {
        BaseFigure.all_figures[my_id] = this;
        BaseFigure.all_figures_list.push(this);
        jQuery.easing[my_id + "_x"] = this.speed_change_values_x;
        jQuery.easing[my_id + "_y"] = this.speed_change_values_y;
        this.#points = points;
        this.dynamic_points = points.map(p => new Point(p.x, p.y));
        this.my_id = my_id;

        let main = document.getElementById(main_svg_id);
        main.innerHTML += this.create_figure(my_id, points);

        this.my_obj = document.getElementById(my_id);
        this.center_marker = document.getElementById("center_" + my_id); //$("#center_" + my_id);
        this.up_left_marker = document.getElementById("left_up_" + my_id); //$("#left_up_" + my_id);
        this.$my_obj = $("#" + this.my_id);
        console.log(this.max_left, this.max_right, this.max_up, this.max_down, this.$my_obj)
    }

    is_point_into_figure(point) {
        return false;
    }

    static destroyed_animate(me) {
        $("#" + me.my_id).stop(true).animate({
                y: windows_h / 2 - me.#center_y,
                x: windows_w / 2 - me.#center_x,
                easing: "parabola"
            },
            {
                queue: false, duration: 1000, step: me.animate_figure,
                always: () => {
                    let [center_x, center_y] = me.#points.reduce((sum, p) => [sum[0] + p.x, sum[1] + p.y], [0, 0])
                    center_x /= me.#points.length;
                    center_y /= me.#points.length;
                    console.log(me.center_x, me.center_y, "---", windows_w / 2, windows_h / 2, "#", center_x, center_y)}
            });
        console.log("Прервали анимацию!");
    }

    speed_change_values_x = (p, an, an1, an2, an3, me = this) => {
        // Контролируем скорость анимации
        if (Math.abs(windows_h / 2 - me.center_y) <= BaseFigure.y_limit_center) {
            if (Math.abs(windows_w / 2 - me.center_x) <= BaseFigure.x_limit_center) {
                BaseFigure.destroyed_animate(me);
            }
        }
        return p;
    }

    speed_change_values_y = (p, an, an1, an2, an3, me = this) => {
        // Контролируем скорость анимации
        // console.log("y", this.now_y);

        // =======! Ниже рабочий, но не нужный код !=======
        // me.p_y = me.p_y? me.p_y: 0;
        // if ( Math.abs(windows_h / 2 - this.now_y) <= BaseFigure.y_limit_center) {
        //     if (Math.abs(windows_w / 2 - this.now_x) <= BaseFigure.x_limit_center) {
        //         if (!me.freeze_p_y) {
        //             me.freeze_p_y = me.p_y;
        //         }
        //         let arg = Math.abs(windows_w / 2 - this.now_x) / BaseFigure.x_limit_center // 1 ... 0
        //         arg = (1 - arg) * (1 - me.freeze_p_y) // 0 ... (1 - me.freeze_p_y)
        //         let res = Math.abs((Math.cos((Math.abs(windows_w / 2 - this.now_x) / BaseFigure.x_limit_center) * 1.57))) * 0.4;
        //         me.p_y = me.freeze_p_y + arg;
        //         return me.freeze_p_y + arg;
        //     } else {
        //         me.freeze_p_y = undefined;
        //     }
        // }
        // return me.p_y;
        if (Math.abs(windows_h / 2 - me.center_y) <= BaseFigure.y_limit_center) {
            if (Math.abs(windows_w / 2 - me.center_x) <= BaseFigure.x_limit_center) {
                BaseFigure.destroyed_animate(me);
            }
        }
        return p;
    }


    collision_controller(){
        if (this.change_animate) { return true; }
        let may_be_collision = BaseFigure.all_figures_list.filter((f, i, arr, me=this) => (
            (me.my_id !== f.my_id) &&
                //( a.y < b.y1 || a.y1 > b.y || a.x1 < b.x || a.x > b.x1 );
            (me.max_down <= f.max_up && me.max_up >= f.max_down &&
            me.max_right <= f.max_left && me.max_left >= f.max_right)
        ));

        if (may_be_collision.length === 0) { return false; }
        console.log(this.my_id, "||", may_be_collision.map(p => p.my_id));
        return may_be_collision.some((f, ind, arr, me=this) => {

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
                        f.flag_collision = true;
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
        /* Проверяем столкновения */
        // let collision_figures = BaseFigure.all_figures.filter(function(other_f){
        //     if (other_f.my_id === this.my_id){
        //         return false;
        //     }
        //     return false;
        //     // if (this.points.some(i => other_f.is_point_into_figure(i)) ){
        //     //     // Обработка колизии
        //     // }
        //     // if (obj.elem.)
        // });


        if (obj.prop === "x") {
            let d_x = now - me.now_x;
            me.now_x = now;
            if (me.max_left <= 0  && d_x < 0) {
                me.$my_obj.stop(true);
            } else if (me.max_right >= windows_w && d_x > 0){
                me.$my_obj.stop(true);
            }

        }
        if (obj.prop === "y") {
            let d_y = now - me.now_y;
            me.now_y = now;
            if (me.max_up <= 0  && d_y < 0) {
                me.$my_obj.stop(true);
            } else if (me.max_down >= windows_h && d_y > 0){
                me.$my_obj.stop(true);
            }
        }

        me.center_marker.style.x = me.center_x;
        me.center_marker.style.y = me.center_y;
        me.up_left_marker.style.x = me.max_right;
        me.up_left_marker.style.y = me.max_down;


        if (Math.abs(windows_h / 2 - me.center_y) <= 1) {
            if (Math.abs(windows_w / 2 - me.center_x) <= 1) {
                console.log('Destroy');
                me.$my_obj.stop().hide();
                me.destroy = true;
                // delete me;
            }
        }


        if (me.collision_controller()){
            me.flag_collision = false;
            // console.log("Столкновение", me.my_id, me.#collision);
            me.$my_obj.stop();
        }
        $output.html(obj.prop + ': ' + now + obj.unit);

    }

    animate(from_x=-1000, to_x = 2000,
            from_y = -1000, to_y = 1000,
            speed_x = 200, speed_y=200,
            css_param = {}, options = {}, obj=$('#' + this.my_id)) {

        if (!this.x_animate){
            this.x_animate = new MoveAnimate(from_x, to_x, speed_x, css_param, options);
        } else {
            this.x_animate.change_start_and_end();
        }

        if (!this.y_animate){
            this.y_animate = new MoveAnimate(from_y, to_y, speed_y, css_param, options);
        } else {
            this.y_animate.change_start_and_end();
        }

        this.$my_obj = obj;
        this.counter++;

        if (this.destroy){ return false; }

        if (to_x - from_x !== 0 && speed_x > 0) {
            obj.animate(
                {x: this.x_animate.to},
                {
                    queue: false,
                    duration: Math.abs(this.x_animate.to - this.now_x) / speed_x * 1000,
                    always: (() => (this.animate(
                        this.x_animate.from, this.x_animate.to,
                        0,0,
                        this.x_animate.speed, 0,
                        this.x_animate.css_param, this.x_animate.options
                    ))),
                    step: this.animate_figure,
                    easing: this.my_id + "_x",
                }
            );
        }
        if (to_y - from_y !== 0 && speed_y > 0) {
            obj.animate(
                {y: this.y_animate.to},
                {
                    queue: false,
                    duration: Math.abs(this.y_animate.to  - this.now_y) / speed_y * 1000,
                    always: (() => (this.animate(
                        0 ,0,
                        this.y_animate.from, this.y_animate.to,
                        0, this.y_animate.speed,
                        this.y_animate.css_param, this.y_animate.options
                    ))),
                    step: this.animate_figure,
                    easing: this.my_id + "_y",
                }
            );
        }
    }
}

let a1 = new BaseFigure([new Point(30, 30), new Point(40, 60), new Point(50, 10)], "id1")
// let b = new BaseFigure([new Point(30, 10), new Point(50, 10), new Point(90, 70)], "id2")
let a3 = new BaseFigure([new Point(230, 30), new Point(240, 60), new Point(250, 10)], "id3")
a1.animate(-100, 2000, -100,1000, 120, 0);
a3.animate(-100, 2000, -100,1000, 120, 0);
//
// let p1 = new Point(10, 0);
// let p2 = new Point(10, 10);
// let p3 = new Point(0, 5);
// let p4 = new Point(20, 5);
// console.log(p1.intersection_lines(p2, p3, p4));
