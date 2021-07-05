// const figures = {
//     "circle1": "Красный круг",
//     "rect1": "Синий прямоугольник",
//     "triangle": "Фиалетовый триугольник",
//     "star": "бирюзовая звезда",
//     "ellipse": "жёлтый элипс"
// };
const figures = {
    "circle_0": "Красный круг",
    "circle_1": "Синий прямоугольник",
    "circle_2": "Фиалетовый триугольник",
    "circle_3": "бирюзовая звезда",
    "circle_4": "жёлтый элипс"
};

function random_int(min, max){
    return Math.round(Math.random() * (max - min) + min);

}

let data_figures = [];

function create_start_figures(){
    const width = $('#main_svg').width();
    const h = $('#main_svg').height();
    document.getElementById("main_svg").innerHTML += figures.map((i, ind) => `<use id="circle_${ind}" xlink:href="#${i}"
 x="${random_int(0, width - 100)}" y="${random_int(0, h - 100)}"></use>`);
}

function add_events(){
    [...Object.keys(figures)].map((i, ind) => {
        $('#circle_' + ind).bind("click.send_data", (event) => {
            if (data_figures.some((el, ind) => {
                    if (el === $(event.target)[0].id) {
                        data_figures[ind] = "";
                        return true;
                    }
                    return false;
                }
                    )){} else {
                data_figures[data_figures.length] = $(event.target)[0].id;
            }
            data_figures = data_figures.filter((el) => el !== "");
            $("#figures_list_into_the_group").text(data_figures.reduce((last, i) => last + "\n " + figures[i], ""));
            $("#group_data").text(data_figures.reduce((last, i) => last + " " + i, ""));
            // data_figures[data_figures.length] = $(event.target).id;
        })
    })

}
add_events();


$('#save_group').bind("click.send_form_data", (event) => {

    // собираем данные с формы
    event.preventDefault();
    console.log("----------");
    // base_ajax(["login", "password"], "../processing/login.php", "../pages/game_screen.php")
    base_ajax(["group_data", "group_name"], "../processing/save_group.php", "../pages/game_screen.php")
})
$('#get_group').bind("click.get_group_data", (event) => {

    // собираем данные с формы
    event.preventDefault();
    console.log("!----------");
    // base_ajax(["login", "password"], "../processing/login.php", "../pages/game_screen.php")
    base_ajax(["get_group_name"], "../processing/get_group.php", undefined, (data) => {
        data['data']['group'].split(" ").filter((el) => el !== "").map( (el) => {
            $("#" + el).css("display", "none")
        })
    })
})
// create_start_figures();