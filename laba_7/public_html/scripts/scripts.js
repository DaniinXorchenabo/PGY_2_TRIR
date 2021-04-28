function post_processing_form(data, redirect, server_url){

    if (data["answer"] === "yes"){
        console.log("Все хорошо!");

        // var body = "name=" + user.name + "&age="+user.age;
        // request.open("POST", server_url);
        // request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        // request.onreadystatechange = () => {};
        // request.send(body);

        window.location.replace(redirect);
    } else {
        console.log("Кто-то накосячил");
        [...Object.keys(data["data"])].map( i => {
            return $("#" + i + "_error").html(data["data"][i]['text_error']);
        }).map( i => {
            if (i.html() === ""){
                i.removeClass('error')
            } else {
                i.addClass('error');
            }
        });
    }
    if ( data["location"] && data["location"] !== ""){
        window.location.replace(data["location"]);
    }
}


function base_ajax(data_keys, server_url, redirect){
    let data = {};
    data_keys.map( i => { data[i] = ""; });
    [...Object.keys(data)].map( i => {
        data[i] = { val: $('#' + i).val(), field_name: $('#' + i).attr('placeholder')} ;
    });
    $.ajax({
        url: server_url, // куда отправляем
        type: "post", // метод передачи
        dataType: "json", // тип передачи данных
        data: data,
        // после получения ответа сервера
        success: function(data){
            console.log(data)
            post_processing_form(data, redirect, server_url)
        }
    });
    console.log("yeeee");
}


// $(document).ready(function(){
//     $('#submit').click(function(event){
//         // собираем данные с формы
//         event.preventDefault();
//         let data = {
//             name: "",
//             surname: "",
//             email: "",
//             type_dress: "",
//             color: "",
//             color2: "",
//         };
//         [...Object.keys(data)].map( i => {
//             data[i] = { val: $('#' + i).val(), field_name: $('#' + i).attr('placeholder')} ;
//         });
//         console.log(data);
//         // отправляем данные
//         $.ajax({
//             url: "processing_data.php", // куда отправляем
//             type: "post", // метод передачи
//             dataType: "json", // тип передачи данных
//             data: data,
//             // после получения ответа сервера
//             success: function(data){
//                 console.log(data)
//                 post_processing_form(data)
//                 // $('#messages').html(data.result); // выводим ответ сервера
//             }
//         });
//
//         return false;
//     });
// });

$('#check_login').click(function(event){

    // собираем данные с формы
    event.preventDefault();
    base_ajax(["login", "password"], "../processing/login.php", "../pages/game_screen.php")
    base_ajax(["login", "password"], "../processing/login.php", "../pages/game_screen.php")
})

$('#check_registration').click(function(event){
    // собираем данные с формы
    console.log("регистрация")
    event.preventDefault();
    base_ajax(["login", "password", "return_password"],
        "/processing/registration.php", "../pages/game_screen.php")
    base_ajax(["login", "password", "return_password"],
        "/processing/registration.php", "../pages/game_screen.php")
    console.log('Отправил')
})
console.log("----")