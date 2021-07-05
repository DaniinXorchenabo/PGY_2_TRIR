$(document).ready(function () {
    $("#click").click(function () {
        $.post("server.php", {field: $("#field").val(), text: $("#text").val()}, function (data) {
            let html = "";
            for (let i = 0; i < data.num; i++) {
                html += "<tr>" +
                    "<td>" + data.mass[i].sur + "</td><td>" + data.mass[i].name + "</td><td>" + data.mass[i].sec +
                    "</td><td>" + data.mass[i].sex + "</td><td>" + data.mass[i].age + "</td><td>" + data.mass[i].state +
                    "</td>" +
                    "</tr>"
            }
            $("#tbody").html(html);
            $("table").css("visibility", "visible");
        }, "json");
    });
})