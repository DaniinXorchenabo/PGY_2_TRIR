var bad_val = "Недопустивое значение";
var unreal_calc = "Невозможно вычислить";
var result = [];

function corrected_number(input_id){
	"use strict"; // для браузеров с поддержкой строгого режима
	
	var val = document.getElementById(input_id).value.toString();
	var testing_num = new RegExp("^([-]?[0-9]{1,}([.][0-9]{1,})?|" + bad_val + "|" + unreal_calc + ")$");
	var edit_num = new RegExp("^([-]?[0-9]{1,}([.][0-9]{1,})" + bad_val + "|" + unreal_calc + ")?");
	if (!testing_num.test(val)){
		if (edit_num.test(val)){
			document.getElementById(input_id).value = edit_num.exec(val)[0];
		} else {
			document.getElementById(input_id).value = "";
		}
	}
	if (input_id === "sin_x" || input_id === "cos_x"){
		val = parseFloat(document.getElementById(input_id).value);
		if (val && (val < -1 || val > 1)) {
			document.getElementById(input_id).value = bad_val;
		}
	}
	
}

function correcting_number(input_id){
	"use strict"; // для браузеров с поддержкой строгого режима
	
	var val = document.getElementById(input_id).value.toString();
	var testing_num = new RegExp("^([-]?[0-9]{1,}([.][0-9]*)?|[-]?[0-9]{1,}[.]?|[-]?)$");
	var edit_num = new RegExp("^([-]?[0-9]{1,}([.][0-9]*)?|[-]?[0-9]{1,}[.]?|[-]?)");
	if (!testing_num.test(val)){
		if (edit_num.test(val)){
			document.getElementById(input_id).value = edit_num.exec(val)[0];
		} else {
			document.getElementById(input_id).value = "";
		}
	}
}

function get_all_param_from_val(x){
	"use strict"; // для браузеров с поддержкой строгого режима
	
	var sin = Math.sin(x);
	var cos = Math.cos(x);
	var tan = (parseFloat(cos) !== 0.0) ? Math.tan(x): "";
	var cotan = (parseFloat(sin) !== 0.0) ? cos/sin: "";
	
	return [x, sin, cos, tan, cotan];
	
}

function set_values(x, sin, cos, tan, cotan){
	"use strict"; // для браузеров с поддержкой строгого режима
	
	
	x = (x  !== x) ? "": x;
	sin = (sin  !== sin) ? "": sin;
	cos = (cos  !== cos) ? "": cos;
	tan = (tan  !== tan) ? "": tan;
	cotan = (cotan  !== cotan) ? "": cotan;
	
	console.log(x, sin, cos, tan, cotan)
	
	document.getElementById("simple_x").value = x;
	document.getElementById("sin_x").value = sin;
	document.getElementById("cos_x").value = cos;
	document.getElementById("tg_x").value = tan;
	document.getElementById("ctg_x").value = cotan;
	change_table([x, sin, cos, tan, cotan])
}

function change_x(){
	"use strict"; // для браузеров с поддержкой строгого режима
	
	var x = parseFloat(document.getElementById("simple_x").value);
	let [new_x, sin, cos, tan, cotan] = get_all_param_from_val(x);
	set_values(x, sin, cos, tan, cotan);
}

function change_sin(){
	"use strict"; // для браузеров с поддержкой строгого режима
	
	var sin = parseFloat(document.getElementById("sin_x").value);
	let [x, new_sin, cos, tan, cotan] = get_all_param_from_val(Math.asin(sin))
	set_values(x, sin, cos, tan, cotan);
	
}

function change_cos(){
	"use strict"; // для браузеров с поддержкой строгого режима
	
	var cos = parseFloat(document.getElementById("cos_x").value);
	let [x, sin, new_cos, tan, cotan] = get_all_param_from_val(Math.acos(cos))
	set_values(x, sin, cos, tan, cotan);
	
}

function change_tg(){
	"use strict"; // для браузеров с поддержкой строгого режима
	
	var tg = parseFloat(document.getElementById("tg_x").value);
	let [x, sin, cos, new_tan, cotan] = get_all_param_from_val(Math.atan(tg))
	set_values(x, sin, cos, tg, cotan);
	
}

function change_ctg(){
	"use strict"; // для браузеров с поддержкой строгого режима
	
	var ctg = parseFloat(document.getElementById("ctg_x").value);
	let [x, sin, cos, tan, new_cotan] = get_all_param_from_val(Math.atan(1/ctg))
	set_values(x, sin, cos, tan, ctg);
	
}


function change_table(val_data){
	"use strict"; // для браузеров с поддержкой строгого режима
	if (!result.includes(val_data[0])){
		result.push(val_data[0]);
		var old_table = document.getElementById("result_table").innerHTML;
		var data = "<tr>";
	//	var test_data = ["1", "2", "3", "4", "5"];
		data += val_data.reduce(
			function(sum, current) {
				return sum + "<td>" + current + "</td>";
			}, "");
		data += "</tr>\n";
		document.getElementById("result_table").innerHTML = data + old_table;
	} else {
		alert("Такие данные уже есть в таблице");
	}
	console.log(val_data[0], result, val_data[0] in result)
}
