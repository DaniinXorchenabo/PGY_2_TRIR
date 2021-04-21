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