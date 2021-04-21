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