function post_processing_form(data){
    if (data["answer"] === "yes"){
        console.log("Все хорошо!");
        window.location.replace('end_form.html');
    } else {
        console.log("Кто-то накосячил")
    }
}

$(document).ready(function(){
    $('#submit').click(function(event){
        // собираем данные с формы
        event.preventDefault();
        let data = {
            name: "",
            surname: "",
            email: "",
            type_dress: "",
            color: "",
            color2: "",
        };
        [...Object.keys(data)].map( i => {
            data[i] = { val: $('#' + i).val(), field_name: $('#' + i).attr('placeholder')} ;
        });
        console.log(data);
        // отправляем данные
        $.ajax({
            url: "processing_data.php", // куда отправляем
            type: "post", // метод передачи
            dataType: "json", // тип передачи данных
            data: data,
            // после получения ответа сервера
            success: function(data){
                console.log(data)
                post_processing_form(data)
                // $('#messages').html(data.result); // выводим ответ сервера
            }
        });

        return false;
    });
});