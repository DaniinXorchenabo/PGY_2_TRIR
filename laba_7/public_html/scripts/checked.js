$(`[type=submit]`).bind("click.send_data", (event) => {
    let circles = {};
    [...Object.values(Circle.objects)].filter((el) => {
        const $me = $(`#` + el.my_id);
        return el.x_as_cell($me) <= base_cell.width * base_cell.count_x &&
            el.y_as_cell($me) <= base_cell.height * base_cell.count_y;
    }).map( (el) => {
        const $me = $(`#` + el.my_id);
        circles[el.my_id] = {"x": el.x_as_cell($me), "y": el.y_as_cell($me)};
    });
    const data = {
        "width": base_cell.width,
        "height": base_cell.height,
        "count_x": base_cell.count_x,
        "count_y": base_cell.count_y,
        "r": base_circle.r,
        "data": circles
    };
    console.log(data);
    $.ajax({
        url: "/processing/checked.php", // куда отправляем
        type: "post", // метод передачи
        dataType: "json", // тип передачи данных
        data:JSON.stringify(data),
        // после получения ответа сервера
        success: function(data){
            console.log(data)
            // post_processing_form(data)
            // $('#messages').html(data.result); // выводим ответ сервера
        }
    });
});