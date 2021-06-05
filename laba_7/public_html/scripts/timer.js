let start_timer = true;
let end_timer = false;
const timer = [
//    [10 ,100],// массив идет от меньшего разряда времени к большему
    [20, 60, "Секунда"], // 10 секунд (максимальное число в разряде секунд - 60)
    [1, 60, "Минута"], // 1 минута (максимальное число в разряде  минут - 60)
    [0, 24, "Час"], // 1 час (максимальное число в разряде  часов - 24),
    [0, 365, "День"]
];
let level = 0;

$.ajax({
    url: "/processing/get_level.php", // куда отправляем
    type: "get", // метод передачи
    dataType: "json", // тип передачи данных
    success: data => {
        console.log(data)
        if (data && data['type'] === "level_settings"){
            timer.map((el, ind) => {timer[ind][0] = data['timer_data'][ind] !== undefined? data['timer_data'][ind]: 0});
            level = data['level'];
        } else {
            location.replace("/pages/registration.php")
        }
    }
});

function get_timer_str() {
    return timer.reduceRight(function (res, el) {
        return (res ? res + ":" : "") + (
            el[0] % 10 === el[0] ? "0" + String(el[0]) : String(el[0]));
    }, false);
}

function timer_renderer() {
    let old_end_timer = end_timer;
    end_timer = timer.every((el) => Number.parseInt(el[0]) === 0) || end_timer;
    // console.log(end_timer, JSON.parse(JSON.stringify(timer))) ;
    if (start_timer && !end_timer) {
        let [old_el, old_module] = timer[0];
        timer[0][0] = (old_el - 1 + old_module) % old_module;
        for (let index = 1, length = timer.length; index < length; ++index) {
            if (old_el % old_module === 0) {
                let [now_el, now_module] = timer[index];
                timer[index][0] = (now_el - 1 + now_module) % now_module;
                [old_el, old_module] = [now_el, now_module];
            } else break;
        }
        const timer_str = get_timer_str();
        document.querySelectorAll(".timer").forEach(function (el) {
            el.innerHTML = timer_str;
        });
    }

    if (!old_end_timer && end_timer) {
        setTimeout( () => {$(`#submit`).trigger('click');})
        // alert('Время вышло!');
        // BaseQuestion.finish_test();
    }
}


setInterval(timer_renderer, 1000);
