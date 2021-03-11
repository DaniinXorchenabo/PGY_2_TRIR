
var start_timer = false;
var timer = [  // массив идет от меньшего разряда времени к большему
    [10, 60], // 10 секунд (максимальное число в разряде секунд - 60)
    [01, 60], // 1 минута (максимальное число в разряде  минут - 60)
    [10, 24] // 1 час (максимальное число в разряде  часов - 24)
];

function timer_renderer(){
    end_timer = timer.every(function(el) { return el[0] === 0; });
    if (start_timer && !end_timer){
        var [old_el, old_module] = timer[0];
        timer[0][0] = (old_el - 1 + old_module) % old_module;
        for (var index = 1, length = timer.length; index < length; ++index) {
            if (old_el % old_module === 0){
                var [now_el, now_module] = timer[index];
                timer[index][0] = (now_el - 1 + now_module) % now_module;
                [old_el, old_module] = [now_el, now_module];
            } else { break; }
        }
        var timer_str = timer.reduceRight(function(res, el) {
            return (res? res + ":": "") + (
                    el[0] % 10 === el[0]? "0" + String(el[0]): String(el[0]));
        }, false);
        document.querySelectorAll(".timer").forEach(function(el) {
            el.innerHTML = timer_str;
        });
    }
}

setInterval(timer_renderer, 1000);