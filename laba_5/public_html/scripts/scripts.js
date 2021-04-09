
function test(){
    $('#c1').animate({'cx': 80})
    console.log('0----------------w---')
}

let main_svg_id = "main_svg";
let $output = $("#text_test")
class Point{
    x = 0
    y = 0
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    get str(){
        return `${this.x},${this.y}`;
    }
}

class BaseFigure{
    points = [];
    static all_figures = {};

    create_figure(my_id, points=[new Point(0, 0), new Point(10, 10)], color='red',stroke="blue"){
        let result = `<polygon id="_${my_id}" fill="${color}" stroke="${stroke}" stroke-width="1" points="${points.reduce(((old, p) => old + " " + p.str), "")}" />`;
        // let result = `<circle id="_${my_id}"  cx="${points[0].x}" cy="${points[0].y}" r="40" stroke="green" stroke-width="4" fill="yellow" />`;
        result = `<defs>${result}</defs><use id="${my_id}" xlink:href="#_${my_id}" x="${points[0].x}" y="${points[0].y}" />`;
        return result
        // return `<polygon id="${my_id}" fill="${color}" stroke="${stroke}" stroke-width="1" points="${points.reduce(((old, p) => old + " " + p.str), "")}" />`;

    }

    constructor(points, my_id) {
        BaseFigure.all_figures[my_id] = this;
        this.points = points;
        this.my_id = my_id;
        let main = document.getElementById(main_svg_id);
        main.innerHTML += this.create_figure(my_id, points);
        // $("#" + main_svg_id).append(this.create_figure(my_id, points));
        console.log(main.innerHTML);

    }

    is_point_into_figure(point){
        return false;
    }

    animate_figure(now, obj){
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
        $output.html(obj.prop +': '+now+obj.unit);
        console.log(obj.elem);

    }
}
let a1 = new BaseFigure([new Point(20, 10), new Point(40, 60), new Point(50, 10)], "id1")
let b = new BaseFigure([new Point(30, 10), new Point(50, 10), new Point(90, 70)], "id2")
// $('#' + a1.my_id).animate({transform : "translate(295px,115px)"}, {step: a1.animate_figure});
// $('#' + a1.my_id).animate({transform : translate(295,115)}, {step: a1.animate_figure});
$('#' + a1.my_id).animate({x: "300px", y: "300px"}, {step: a1.animate_figure});
// $('#' + a1.my_id).animate({}, {step: a1.animate_figure});
