$(document).ready(function(){
    $('#submit').click(function(event){
        // собираем данные с формы
        event.preventDefault();
        console.log("-----------");
        let data = {
            name: "",
            surname: "",
            email: "",
            type_dress: "",
            color: "",
            color2: "",
        };
        [...Object.keys(data)].map( i => {
            data[i] = $('#' + i).val();
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
                $('#messages').html(data.result); // выводим ответ сервера
            }
        });

        return false;
    });
});