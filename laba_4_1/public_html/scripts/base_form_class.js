class BaseQuestion{
    static question_count = 10; // общее количество вопросов
    static navigation_buttons = []; // Массив из всех кнопок навигации (для переключения по вопросам формы)
    static now_form_display = null;  // Объект, форма которого сейчас отображается
    static all_forms = []; // Все объекты форм
    number_question; // Номер вопроса формы
    text_question;  // Текст вопроса формы
    options_answer;  // Варианты ответов на вопросы (всегда список)
    changed_answers = []; // Выбранные варианты ответов на вопросы (всегда список)
    correct_answer; // Правильные ответы (всегда массив)
//    content_element; // Элемент контента (который меняется, динамически формируется и т.д.)
//    form_element_; // элемент самой формы непосредственно
    status_question = null; // Определяет цвет кнопки навигации по форме
    
    
    constructor(n_q, text, options, correct_ans){
        // Базовый конструктор класса
        this.number_question = n_q;
        this.text_question = text;
        this.options_answer = options;
        this.correct_answer = correct_ans;
//        this.content_element = document.getElementById("content");
//        this.form_element_ = document.getElementById("question_form");
        this.changed_answers = [];
        BaseQuestion.navigation_buttons.push(this.get_navigation_button);
        BaseQuestion.all_forms.push(this);
        console.log(this.changed_answers);
    }
    
    
    get get_navigation_button(){
        return `<li><button ${this.status_question?
        ('class="' + this.status_question + '"'): 'no_answer'} 
        onclick="BaseQuestion.button_click(${this.number_question})">
        ${this.number_question}</button></li>`;
    }
    get get_form_html(){
        // Возвращает html-код формы (с поставленными значени=ями, если таковые имеются)
        return `<h1 class="question_title">Вопрос ${this.number_question} из ${BaseQuestion.question_count}</h1>
		<h2 class="question_text">${this.text_question}</h2>
		<form id="question_form">
                <div class="answers_field">
                    ${this.get_child_html()}
		</div>
		<div class="reset_form">
                    <input type="reset" value="Сбросить ответ" onclick="BaseQuestion.reset_button_call(${this.number_question})">
		</div>
		<div class="timer_box">
                    <p><span class="timer">${get_timer_str()}</span></p>
		</div>
		<div class="submit_box">
                    <input type="submit" value="Завершить тестирование" onclick="BaseQuestion.finish_test();">
		</div>
                </form>`;
    }
    set_form_html(){
        document.getElementById("content").innerHTML = this.get_form_html;
    }
    
    static create_nav_buttons(){
        // Заполняет список кнопок меню навигации
        BaseQuestion.navigation_buttons = BaseQuestion.all_forms.map(
                function(a){ return a.get_navigation_button; });
        return BaseQuestion.get_navigation_buttons();
    }
    static get_navigation_buttons(){
        // Возвращает код кнопок навигации
        return '<ul>' + BaseQuestion.navigation_buttons.reduce(function(a, b){return a + '\n' +  b;}) + '</ul>';
    }
    static set_vavigation_buttons(){
        // Устанавливает кнопки навигации в html-страницу
        document.getElementById("test_nav").innerHTML = BaseQuestion.create_nav_buttons();
    }
    
    static button_click(form_number){
        // Непосредственно вызывается при нажатии кнопки,
        // form_number - номер вопроса
        console.log("Переход на вопрос", form_number);
        BaseQuestion.all_forms[form_number - 1].display_form();
    }
    display_form(){
        /* Этот метод должна вызввать кнопка при нажатии*/
        BaseQuestion.now_form_display.save_data();
        this.set_form_html();
        BaseQuestion.now_form_display = this;
        this.status_question = 'active_button';
        BaseQuestion.set_vavigation_buttons();
    }
    
    save_data(){
        // Должно быть переопределено в дочернем классе
        /*Сохранение данных формы перед ее закрытием (сменой на другую форму)*/
        
    }
    change_color_nav_buttons(){
        // Должно быть реализовано у потомков
        // Изменение цвета кнопки навигации
    }
    get_child_html(){
        // Должен быть переопределён в дочернем классе
        // Возвращает поле ввода ответа
        return "";
    }
    
    static reset_button_call(form_number){
        BaseQuestion.all_forms[form_number - 1].reset_button_control();
    }
    reset_button_control(){
        this.changed_answers = [];
        this.set_form_html()
    }
    
    static finish_test(){
        // Вызывается при завершении теста
        end_timer = true;
        BaseQuestion.now_form_display.save_data();
        var page = BaseQuestion.generate_finish_content();
        document.getElementById("content").innerHTML = page;
    }
    static generate_finish_content(){
        // Генерирует страницу окончания теста
        return `<h1>Результаты теста:</h1> ${BaseQuestion.generate_result_table()}`;
    }
    static generate_result_table(){
        // Генерирует таблицу результатов
        var tabel = `<table><thead><tr>
                    <th>Номер вопроса</th>
                    <th>Ваш ответ:</th>
                    <th>Правильный ответ:</th>
                    <th>Количество баллов:</th>
                    </tr></thead><tbody>`;
        tabel = tabel + BaseQuestion.all_forms.reduce(function(a, b){
            return a + `\n` + b.get_result_table_string();
        }, "");
        tabel = tabel + `</tbody></table>`;
        return tabel;
     
    }
    get_result_table_string(){
        // Генерирует строку таблицы результатов
        return `<tr class="${this.get_sum_marks() > 0? "positive": "nerative"}">
                    <td>${this.number_question}</td>
                    <td>${this.get_user_answer_html()}</td>
                    <td>${this.get_correct_answer_html()}</td>
                    <td>${this.get_sum_marks()}</td></tr>`;
    }
    get_user_answer_html(){
        // Должна быть переопределена в дочернем классе
        // Возвращает ответ пользователя для таблицы результатов
        return "";
    }
    get_correct_answer_html(){
        // Должна быть переопределена в дочернем классе
        // Возвращает правильный ответ для таблицы результатов
        return "";
    }
    get_sum_marks(){
        // Должна быть переопределена в дочернем классе
        // Возвращает сумму, которую получил пользователь баллов за ответ
        return "0";
    }

};

class RadiobuttonQuestion extends BaseQuestion {
    
    save_data(){
        /*Сохранение данных формы перед ее закрытием (сменой на другую форму)*/
        super.save_data();
        var data = document.getElementById("question_form").elements.change_ans.value;
        this.changed_answers = data? [data] : [];
        this.change_color_nav_buttons();
    }
    
    change_color_nav_buttons(){
        // Изменение цвета кнопки при переключении на следующий вопрос
        super.change_color_nav_buttons();
        this.status_question = this.changed_answers.length > 0? "positive": "negative";
    }
    
    get_child_html(){
        // Возвращает поле ввода ответа
        super.get_child_html();
        return this.get_all_radiobuttons_html();
    }
    
    static get_radiobutton_html(value, checked){
        // Возвращает одну кнопку radiobutton
        return `<div class="radiobutton_box">
   	<input type="radio" name="change_ans" class="radiobutton" 
                value="${value}" id="ans_${value}" ${checked? "checked": ""}>
        <label for="ans_${value}">${value}</label>
        </div>`;
    }
    get_all_radiobuttons_html(){
        // Возвращает код все radiobutton-ов
//        console.log(super.changed_answers);
//        this.changed_answers = super.changed_answers;
        console.log(this.changed_answers);
        var arr = this.changed_answers;
        return this.options_answer.reduce(function(a, b){
            return a + "\n" + RadiobuttonQuestion.get_radiobutton_html(b,
            (arr.indexOf(b) !== -1));
        }, "");
    }
    
    get_user_answer_html(){
        // Должна быть переопределена в дочернем классе
        // Возвращает ответ пользователя для таблицы результатов
        return (this.changed_answers.length > 0? this.changed_answers[0]: "Нет ответа");
    }
    get_correct_answer_html(){
        // Должна быть переопределена в дочернем классе
        // Возвращает правильный ответ для таблицы результатов
        if (this.correct_answer.length > 1){
            return this.correct_answer.reduce(function(a, b){ return a + "\n" + `<div class="table_radiobutton_box">
   	<input type="radio" class="radiobutton" checked disabled>
        <label>${b}</label></div>`;}, "Любой из следующих:");
        } else if (this.correct_answer.length > 0){
            return this.correct_answer[0];
        }
        return "Нет ответа";
    }
    get_sum_marks(){
        // Должна быть переопределена в дочернем классе
        // Возвращает сумму, которую получил пользователь баллов за ответ
        return (this.changed_answers.length > 0 && this.correct_answer.length > 0 && this.correct_answer.indexOf(this.changed_answers[0]) !== -1? "1":"0");
    }
};

class CheckBoxQuestion extends BaseQuestion {
    
    save_data(){
        /*Сохранение данных формы перед ее закрытием (сменой на другую форму)*/
        super.save_data();
        var data = Array.from(document.querySelectorAll('input.checkbox:checked')).map(cb => cb.value);
        console.log(data);
        this.changed_answers = data;
        this.change_color_nav_buttons();
    }
    
    change_color_nav_buttons(){
        // Изменение цвета кнопки при переключении на следующий вопрос
        super.change_color_nav_buttons();
        this.status_question = this.changed_answers.length > 0? "positive": "negative";
    }
    
    get_child_html(){
        // Возвращает поле ввода ответа
        super.get_child_html();
        return this.get_all_checkboxes_html();
    }
    
    static get_checkbox_html(value, checked){
        // Возвращает одну кнопку radiobutton
        return `<div class="checkbox_box">
   	<input type="checkbox" name="change_ans" class="checkbox"
                value="${value}" id="ans_${value}" ${checked? "checked": ""}>
        <label for="ans_${value}">${value}</label>
        </div>`;
    }
    get_all_checkboxes_html(){
        // Возвращает код все radiobutton-ов
//        console.log(super.changed_answers);
//        this.changed_answers = super.changed_answers;
        console.log(this.changed_answers);
        var arr = this.changed_answers;
        return this.options_answer.reduce(function(a, b){
            return a + "\n" + CheckBoxQuestion.get_checkbox_html(b,
            (arr.indexOf(b) !== -1));
        }, "");
    }
    
    get_user_answer_html(){
        // Должна быть переопределена в дочернем классе
        // Возвращает ответ пользователя для таблицы результатов
        return (this.changed_answers.length > 0? this.changed_answers.reduce(
                function(a, b){
                    return a + "\n" + `<div class="table_checkbox_box">
   	<input type="checkbox" class="checkbox" checked disabled>
        <label>${b}</label></div>`;}, ""): "Нет ответа");
    }
    get_correct_answer_html(){
        // Должна быть переопределена в дочернем классе
        // Возвращает правильный ответ для таблицы результатов
        if (this.correct_answer.length > 1){
            return this.correct_answer.reduce(function(a, b){ return a + "\n" + `<div class="table_checkbox_box">
   	<input type="checkbox" class="checkbox" checked disabled>
        <label>${b}</label></div>`;}, "Верные ответы:");
        } else if (this.correct_answer.length > 0){
            return this.correct_answer[0];
        }
        return "Нет ответа";
    }
    get_sum_marks(){
        // Должна быть переопределена в дочернем классе
        // Возвращает сумму, которую получил пользователь баллов за ответ
        let a = new Set(this.changed_answers);
        let b = new Set(this.correct_answer);
        
        let difference1 = [...a].filter(x => !b.has(x));
        let difference2 = [...b].filter(x => !a.has(x));
        console.log(difference1, difference2);
        return (difference1.length === 0 && difference2.length === 0 ?"1":"0");
    }
};