function create_question_classes(count_questions, test_time){
    
    type_to_class = {
        'radio': RadiobuttonQuestion,
        'checkbox': CheckBoxQuestion,
        "text": TextFieldQuestion
    };
    
    BaseQuestion.question_count = count_questions;
    
    var keys = [];
    var got_form_types = ["radio", "checkbox", "text"];
    for(var k in data_test){
        if (got_form_types.indexOf(data_test[k]['type']) !== -1 ){
            keys.push(k);
        }
    }

    keys.sort(() => Math.random() - 0.5);
    console.log(keys);
    for (var index = 0; index < count_questions; ++index) {
        var qu_data = data_test[keys[index]];
        var my_class = type_to_class[qu_data['type']];
        var answers = [];
        var correct_ans = [];
        for(var k in qu_data['answers']){
            answers.push(k);
            if (qu_data['answers'][k] > 0) correct_ans.push(k);
        }
        answers.sort(() => Math.random() - 0.5);
        console.log(answers);
        const qu = new my_class(index + 1, qu_data["question"], answers, correct_ans);
    }

    timer_value_parser(test_time);
    BaseQuestion.all_forms[0].status_question = "active_button";
    BaseQuestion.now_form_display = BaseQuestion.all_forms[0];
    document.getElementById("content").innerHTML = BaseQuestion.all_forms[0].get_form_html;
    BaseQuestion.create_nav_buttons();
    document.getElementById("test_nav").innerHTML = BaseQuestion.get_navigation_buttons();
    start_timer = true;
    end_timer = false;
    
}


var form = document.getElementById("start_test_tools");
form.addEventListener("submit", function(event) {
    console.log("Saving value", form.elements.count_question.value, form.elements.input_time_test.value);
    event.preventDefault();
    create_question_classes(form.elements.count_question.value, form.elements.input_time_test.value);
});