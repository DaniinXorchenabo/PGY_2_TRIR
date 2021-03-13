class BaseQuestion{
    static question_count = 10; // общее количество вопросов
    static navigation_buttons = []; // Массив из всех кнопок навигации (для переключения по вопросам формы)
    static now_form_display = null;  // Объект, форма которого сейчас отображается
    static all_forms = []; // Все объекты форм
    number_question; // Номер вопроса формы
    text_question;  // Текст вопроса формы
    options_answer;  // Варианты ответов на вопросы (всегда список)
    changed_answers = []; // Выбранные варианты ответов на вопросы (всегда список)
//    content_element; // Элемент контента (который меняется, динамически формируется и т.д.)
//    form_element_; // элемент самой формы непосредственно
    status_question = null; // Определяет цвет кнопки навигации по форме
    
    
    constructor(n_q, text, options){
        // Базовый конструктор класса
        this.number_question = n_q;
        this.text_question = text;
        this.options_answer = options;
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
                    <p><span class="timer">     </span></p>
		</div>
		<div class="submit_box">
                    <input type="submit" value="Завершить тестирование">
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
    
};

class CheckBoxQuestion extends BaseQuestion {
    
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
        return `<div class="radiobutton">
   	<input type="radio" name="change_ans"
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
            return a + "\n" + CheckBoxQuestion.get_radiobutton_html(b,
            (arr.indexOf(b) !== -1));
        }, "");
    }
};