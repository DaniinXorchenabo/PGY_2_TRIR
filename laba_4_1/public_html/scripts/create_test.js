function create_question_classes(count_questions, test_time){
    BaseQuestion.question_count = count_questions;
    for (var index = 0; index < count_questions; ++index) {
        console.log(index);
        const qu = new CheckBoxQuestion(index + 1, "Как вы относитесь к вопросу № " + (index + 1) + "?",
        ["Плохо", "Хорошо", "Отлично", "Не отношусь", "Не знаю"]);
    }
//    console.log(BaseQuestion.get_navigation_buttons());
    BaseQuestion.now_form_display = BaseQuestion.all_forms[0];
    document.getElementById("content").innerHTML = BaseQuestion.all_forms[0].get_form_html;
    document.getElementById("test_nav").innerHTML = BaseQuestion.get_navigation_buttons();
    
}


var form = document.getElementById("start_test_tools");
form.addEventListener("submit", function(event) {
    console.log("Saving value", form.elements.count_question.value, form.elements.input_time_test.value);
    event.preventDefault();
    create_question_classes(form.elements.count_question.value, form.elements.input_time_test.value);
});