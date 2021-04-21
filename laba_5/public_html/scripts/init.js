let count_figures = 0

let delete_event = new Event("destroy_figure", {bubbles: true, cancelable: true})
let resize_event = new Event("resize", {bubbles: true, cancelable: true})

let main_svg_id = "main_svg";
let start_content_id = "Start_content";
// let $output = $("#text_test")
let windows_w = window.innerWidth;
let windows_h = window.innerHeight;
let rect_exit = $("#rect_exit");

let figures = [];

jQuery.easing["parabola"] = p => p ** 0.1