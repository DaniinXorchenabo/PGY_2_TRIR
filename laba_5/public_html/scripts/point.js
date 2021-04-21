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