function timer_renderer(){
    var old_end_timer = end_timer;
    end_timer = timer.every((el) => Number.parseInt(el[0]) === 0) || end_timer;
//    console.log(end_timer, JSON.parse(JSON.stringify(timer))) ;
    if (start_timer && !end_timer){
        var [old_el, old_module] = timer[0];
        timer[0][0] = (old_el - 1 + old_module) % old_module;
        for (var index = 1, length = timer.length; index < length; ++index) {
            if (old_el % old_module === 0){
                var [now_el, now_module] = timer[index];
                timer[index][0] = (now_el - 1 + now_module) % now_module;
                [old_el, old_module] = [now_el, now_module];
            } else break;
        }
        var timer_str = get_timer_str();
        document.querySelectorAll(".timer").forEach(function(el) {
            el.innerHTML = timer_str;
        });
    }
    
    if (!old_end_timer && end_timer){
        alert('Время вышло!');
        BaseQuestion.finish_test();
    }
}


setInterval(timer_renderer, 1000);