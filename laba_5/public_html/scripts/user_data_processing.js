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
    else if (document.getElementById(input_id).title.indexOf("Вы ввели некоректное значение") === -1){
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



