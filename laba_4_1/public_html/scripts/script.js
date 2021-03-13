
var start_timer = false;
var end_timer = false;
var timer = [ 
//    [10 ,100],// массив идет от меньшего разряда времени к большему
    [20, 60], // 10 секунд (максимальное число в разряде секунд - 60)
    [00, 60], // 1 минута (максимальное число в разряде  минут - 60)
    [0, 24], // 1 час (максимальное число в разряде  часов - 24),
    [0, 365]
];


function set_seekbar(){
    // Устанавливает значение для ползунка количества вопросов
    document.getElementById("count_seekbar_qu").value = document.getElementById("count_question").value;
}

function set_count_question(){
    document.getElementById("count_question").value = document.getElementById("count_seekbar_qu").value;
}