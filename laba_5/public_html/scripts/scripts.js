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
}

class MoveAnimate {
    speed_x = 1000;
    speed_y = 1000;
    start_point = new Point(0, 0);
    end_point = new Point(100, 100);

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
    points = [];
    my_obj;
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

    static x_limit_center = 40;
    static y_limit_center = 40;
    static all_figures = {};
    center_marker;
    up_left_marker;

    get center_x() { return this.now_x + (this.#center_x ); } /// - this.start_x
    get center_y() { return this.now_y + (this.#center_y ); } // - this.start_y

    create_figure(my_id, points = [new Point(0, 0), new Point(10, 10)], color = 'red', stroke = "blue") {
        let result = `<polygon id="_${my_id}" fill="${color}" stroke="${stroke}" stroke-width="1"
                        points="${points.reduce(((old, p) => old + " " + p.str), "")}" />
                      <polyline stroke="black" stroke-width="1px" fill="none" id="marker_${my_id}" 
                      points="0,0 6,0, -6,0, 0,0 0,6 0,-6"/>`;
        // let result = `<circle id="_${my_id}"  cx="${points[0].x}" cy="${points[0].y}" r="40" stroke="green" stroke-width="4" fill="yellow" />`;
        result = `<defs>${result}</defs>
                    <use id="${my_id}" xlink:href="#_${my_id}" x="${points[0].x}" y="${points[0].y}" />
                    <use id="center_${my_id}" xlink:href="#marker_${my_id}" x="0" y="0" />
                    <use id="left_up_${my_id}" xlink:href="#marker_${my_id}" x="0" y="0" />`;
        this.now_x = points[0].x;
        this.now_y = points[0].y;
        this.start_x = points[0].x;
        this.start_y = points[0].y;
        [this.#center_x, this.#center_y] = points.reduce((sum, p) => [sum[0] + p.x, sum[1] + p.y], [0, 0])
        this.#center_x /= points.length;
        this.#center_y /= points.length;
        [this.#max_right, this.#max_left, this.#max_up, this.#max_down] = points.reduce(
            (arg, p) => ([arg[0] > p.x? p.x:arg[0], arg[1] < p.x? p.x: arg[1],
                arg[2] < p.y? p.y: arg[2], arg[3] > p.y? p.y: arg[3]]),
            [this.#max_left, this.#max_right, this.#max_up, this.#max_down]);
        // this.#max_left = this.#max_left - this.#center_x;
        // this.#max_right = this.#max_right - this.#center_x;
        // this.#max_up = this.#max_up - this.#center_y;
        // this.#max_down = this.#max_down - this.#center_y;

        return result;

    }
    get max_left(){ return this.center_x + (this.#center_x - this.#max_left);}
    get max_right(){ return this.center_x +  (this.#center_x - this.#max_right);}
    get max_up(){ return this.center_y + (this.#center_y - this.#max_up);}
    get max_down(){ return this.center_y + (this.#center_y - this.#max_down);}



    constructor(points, my_id) {
        BaseFigure.all_figures[my_id] = this;
        jQuery.easing[my_id + "_x"] = this.speed_change_values_x;
        jQuery.easing[my_id + "_y"] = this.speed_change_values_y;
        this.points = points;
        this.my_id = my_id;

        let main = document.getElementById(main_svg_id);
        main.innerHTML += this.create_figure(my_id, points);
        this.my_obj = document.getElementById(my_id);
        this.center_marker = document.getElementById("center_" + my_id); //$("#center_" + my_id);
        this.up_left_marker = document.getElementById("left_up_" + my_id); //$("#left_up_" + my_id);
        console.log(this.max_left, this.max_right, this.max_up, this.max_down)
        // $("#" + main_svg_id).append(this.create_figure(my_id, points));
        // console.log(main.innerHTML);

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
                    let [center_x, center_y] = me.points.reduce((sum, p) => [sum[0] + p.x, sum[1] + p.y], [0, 0])
                    center_x /= me.points.length;
                    center_y /= me.points.length;
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
                $("#" + me.my_id).stop(true);
            } else if (me.max_right >= windows_w && d_x > 0){
                $("#" + me.my_id).stop(true);
            }

        }
        if (obj.prop === "y") {
            let d_y = now - me.now_y;
            me.now_y = now;
            if (me.max_up <= 0  && d_y < 0) {
                $("#" + me.my_id).stop(true);
            } else if (me.max_down >= windows_h && d_y > 0){
                $("#" + me.my_id).stop(true);
            }
        }
        document.getElementById("center_" + me.my_id).style.x = me.center_x;
        document.getElementById("center_" + me.my_id).style.y = me.center_y;
        document.getElementById("left_up_" + me.my_id).style.x = me.max_right;
        document.getElementById("left_up_" + me.my_id).style.y = me.max_down;

        // me.center_marker.css("x", me.center_x);
        // me.center_marker.css("y", me.center_y);
        // me.up_left_marker.css("x", me.now_x);
        // me.up_left_marker.css("y", me.now_y);


        if (Math.abs(windows_h / 2 - me.center_y) <= 1) {
            if (Math.abs(windows_w / 2 - me.center_x) <= 1) {
                console.log('Destroy');
                $("#" + me.my_id).stop().hide();
                this.destroy = true;
                // delete me;
            }
        }
        // console.log(me)
        $output.html(obj.prop + ': ' + now + obj.unit);
        // console.log(obj.elem);

    }

    animate(new_x, new_y, speed_x, speed_y, css_param = {}, options = {}, obj=$('#' + this.my_id)) {
        this.counter++;
        console.log("runn", this.counter, new_x, this.now_x , speed_x);
        if (this.destroy){ return false; }
        if (Math.abs(new_x - this.now_x) > 5 && speed_x > 0) {
            let next_x = this.now_x < new_x? -1000: this.now_x;
            obj.animate(
                {x: new_x},
                {
                    queue: false,
                    duration: Math.abs(new_x - this.now_x) / speed_x * 1000,
                    always: (() => (this.animate(next_x, this.now_y, speed_x, 0, css_param, options), console.log("x--00"))),
                    step: this.animate_figure,
                    easing: this.my_id + "_x",
                }
            );
        }
        if (Math.abs(new_y - this.now_y) > 5 && speed_y > 0) {
            let next_y = this.now_y < new_y? -1000: this.now_y;
            obj.animate(
                {y: new_y},
                {
                    queue: false,
                    duration: Math.abs(new_y - this.now_y) / speed_y * 1000,
                    always: (() => (this.animate(this.now_x, next_y, 0, speed_y, css_param, options), console.log("y--00"))),
                    step: this.animate_figure,
                    easing: this.my_id + "_y",
                }
            );
        }
    }
}

let a1 = new BaseFigure([new Point(30, 30), new Point(40, 60), new Point(50, 10)], "id1")
let b = new BaseFigure([new Point(30, 10), new Point(50, 10), new Point(90, 70)], "id2")
a1.animate(2000, 2000, 120, 200);
// $('#' + a1.my_id).animate({transform : "translate(295px,115px)"}, {step: a1.animate_figure});
// $('#' + a1.my_id).animate({transform : translate(295,115)}, {step: a1.animate_figure});
// $('#' + a1.my_id).animate({y: "10px"}, {
//     step: a1.animate_figure,
//     queue: false,
//     easing: a1.my_id + "_y",
//     duration: 5000,
// });
// // $('#' + a1.my_id).animate({}, {step: a1.animate_figure});
//
//
// $('#' + a1.my_id).animate({x: "1000px"}, {
//     step: a1.animate_figure,
//     queue: false,
//     easing: a1.my_id + "_x",
//     duration: 5000,
//     always: () => console.log(a1.center_x, a1.center_y, "---", windows_w / 2, windows_h / 2)
// })
