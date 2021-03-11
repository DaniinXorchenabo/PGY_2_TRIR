
var start_timer = true;
var timer = [  // массив идет от меньшего разряда времени к большему
    [10, 60], // 10 секунд (максимальное число в разряде секунд - 60)
    [01, 60], // 1 минута (максимальное число в разряде  минут - 60)
    [1, 24] // 1 час (максимальное число в разряде  часов - 24)
];

function timer_renderer(){
    end_timer = timer.every(function(el) { return el[0] === 0; });
    if (true || (start_timer && !end_timer)){
        var my_timers = document.querySelectorAll(".timer");
        var index, length;
        var [first_el, first_module] = timer[0];
        
        timer[0][0] = (first_el - 1 + first_module) % first_module;
        for (index = 1, length = timer.length; index < length; ++index) {
            if (first_el % first_module === 0){
                var [now_el, now_module] = timer[index];
                timer[index][0] = (now_el - 1 + now_module) % now_module;
                first_el = now_el;
                first_module = now_module;
            } else {
                break;
            }
        }
        var timer_str = timer.reduceRight(function(res, el) {
            return (res? res + ":": "") + (el[0] % 10 === el[0]? "0" + String(el[0]): String(el[0]));
        }, false);
        my_timers.forEach(function(el) {
            el.innerHTML = timer_str;
        });
    }
}

setInterval(timer_renderer, 1000);