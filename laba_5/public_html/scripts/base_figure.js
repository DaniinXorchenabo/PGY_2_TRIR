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

    static all_collision_controller() {
        let arr = BaseFigure.all_figures_list.filter(f => !f.destroy_process && !f.destroy);
        for (let i = 0; arr.length > i; i++) {
            let test_figure = arr[i];

            let may_be_collision = []
            for (let j = i + 1; arr.length > j; j++) {
                let f = arr[j];
                if (test_figure.max_down >= f.max_up && test_figure.max_up <= f.max_down &&
                    test_figure.max_right >= f.max_left && test_figure.max_left <= f.max_right) {
                    may_be_collision.push(f);
                }
            }
            if (may_be_collision.length > 0) {
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