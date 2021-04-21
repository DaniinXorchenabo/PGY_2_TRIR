function corrected_number(input_id){
    console.log(input_id);
    let val = document.getElementById(input_id).value.toString();
    let testing_num = new RegExp("^([1-9][0-9]*)$");
    let edit_num = new RegExp("^([1-9][0-9]*)$");
    if (!testing_num.test(val)){
        if (edit_num.test(val)){
            document.getElementById(input_id).value = edit_num.exec(val)[0];
        } else {
            document.getElementById(input_id).value = "";
        }
    }
    if (document.getElementById(input_id).value === ""){
        document.getElementById(input_id).title = "Вы ввели некоректное значение!"
        $(`#${input_id}`).addClass("bad_input");
    } else if (parseInt(document.getElementById(input_id).value) > parseInt(document.getElementById(input_id).max)){
        document.getElementById(input_id).title = "Вы ввели некоректное значение! Максимальное значение данного поля - " + document.getElementById(input_id).max;
        $(`#${input_id}`).addClass("bad_input");
    } else if (parseInt(document.getElementById(input_id).value) < parseInt(document.getElementById(input_id).min)){
        document.getElementById(input_id).title = "Вы ввели некоректное значение! Минимальное значение данного поля - " + document.getElementById(input_id).min;
        $(`#${input_id}`).addClass("bad_input");
    }
    else if (document.getElementById(input_id).title.indexOf("Вы ввели некоректное значение") !== -1){
        $(`#${input_id}`).removeClass("bad_input");
        document.getElementById(input_id).title  = document.getElementById(input_id).placeholder
    }
}

function correcting_number(input_id){

    let val = document.getElementById(input_id).value.toString();
    let testing_num = new RegExp("^([1-9][0-9]*)$");
    let edit_num = new RegExp("^([1-9][0-9]*)$");
    if (!testing_num.test(val)){
        if (edit_num.test(val)){
            document.getElementById(input_id).value = edit_num.exec(val)[0];
        } else {
            document.getElementById(input_id).value = "";
        }
    }
}

let form = document.getElementById("start_tools_form");
form.addEventListener("submit", function(event) {

    let $data = {};
    let correct_data = true;
// переберём все элементы input, textarea и select формы с id="myForm "
    $('#start_tools_form').find ('input').each(function() {
        // добавим новое свойство к объекту $data
        // имя свойства – значение атрибута name элемента
        // значение свойства – значение свойство value элемента
        console.log('!===___!1', this.title, $(this).val(), this.name);
        if (this.title.indexOf("Вы ввели некоректное значение") !== -1){
            correct_data = false;
        }
        $data[this.name] = $(this).val();
    });

    if (correct_data){
        event.preventDefault();
        console.log($data["count"])
        setTimeout(() => {
            start($data["count"], $data["max_size"],
                $data["max_points"], $data["max_start_speed"],
                $data["max_mass"]); // $data["count"]
        });

    }
    event.preventDefault();
    return false;
});






