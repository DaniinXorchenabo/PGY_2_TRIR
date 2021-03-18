
var start_timer = false;
var end_timer = false;
var timer = [ 
//    [10 ,100],// массив идет от меньшего разряда времени к большему
    [20, 60, "Секунда"], // 10 секунд (максимальное число в разряде секунд - 60)
    [0, 60, "Минута"], // 1 минута (максимальное число в разряде  минут - 60)
    [0, 24, "Час"], // 1 час (максимальное число в разряде  часов - 24),
    [0, 365, "День"]
];
var save_start_timer = JSON.parse(JSON.stringify(timer));
var keys = [];
var got_form_types = ["radio", "checkbox", "text", "select"];
for(var k in data_test){
    if (got_form_types.indexOf(data_test[k]['type']) !== -1 ){
        keys.push(k);
    }
}
var max_question = keys.length;
document.getElementById("count_question").max = max_question;
document.getElementById("count_seekbar_qu").max = max_question;
document.getElementById("count_question").value = document.getElementById("count_seekbar_qu").value;
document.getElementById("tickmarks").innerHTML = Array.from(Array(max_question).keys()).reduce(function(a, b){
    return a + "\n" + `<option value="${(b + 1)}" ${Math.floor((max_question - 1) / 2) === b || b === 0 || max_question - 1 === b?
    'label="' + (b + 1) + '"': ""}>`; }, "");

function set_seekbar(){
    // Устанавливает значение для ползунка количества вопросов
    document.getElementById("count_seekbar_qu").value = document.getElementById("count_question").value;
}

function set_count_question(){
    document.getElementById("count_question").value = document.getElementById("count_seekbar_qu").value;
}

function get_timer_str(){
    return timer.reduceRight(function(res, el) {
            return (res? res + ":": "") + (
                    el[0] % 10 === el[0]? "0" + String(el[0]): String(el[0]));
        }, false);
}

function timer_value_parser(timer_data){
    var [h, m, s] = (timer_data || document.getElementById("input_time_test").value).split(":");
    timer[0][0] = Number.parseInt(s) || 0;
    timer[1][0] = Number.parseInt(m);
    timer[2][0] = Number.parseInt(h);
}

window.onbeforeunload = function() {
    console.log("Попытка перезагрузки");
    return false;
//  return "Есть несохранённые изменения. Всё равно уходим?";
};
