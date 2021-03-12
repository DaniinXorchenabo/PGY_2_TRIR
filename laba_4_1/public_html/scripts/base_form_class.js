class BaseQuestion{
    static question_count = 10; // общее количество вопросов
    static navigation_buttons = []; // Массив из всех кнопок навигации (для переключения по вопросам формы)
    static now_form_display = null;  // Объект, форма которого сейчас отображается
    static all_forms = []; // Все объекты форм
    number_question; // Номер вопроса формы
    text_question;  // Текст вопроса формы
    options_answer;  // Варианты ответов на вопросы (всегда список)
    changed_answers; // Выбранные варианты ответов на вопросы (всегда список)
    content_element; // Элемент контента (который меняется, динамически формируется и т.д.)
    form_element_; // элемент самой формы непосредственно
    status_question = null; // Определяет цвет кнопки навигации по форме
    
    
    constructor(n_q, text, options){
        // Базовый конструктор класса
        this.number_question = n_q;
        this.text_question = text;
        this.options_answer = options;
        this.content_element = document.getElementById("content");
        this.form_element_ = document.getElementById("question_form");
        this.changed_answers = [];
        BaseQuestion.navigation_buttons.push(this.get_navigation_button);
        BaseQuestion.all_forms.push(this);
        
    }
    
    
    get get_navigation_button(){
        return `<li><button ${this.status_question?
        'class="' + 'no_answer' + this.status_question: ''} 
        onclick="BaseQuestion.button_click(${this.number_question})">
        ${this.number_question}</button></li>`;
    }
    get get_form_html(){
        // Возвращает html-код формы (с поставленными значени=ями, если таковые имеются)
        return `<h1 class="question_title">Вопрос ${this.number_question} из ${this.question_count}</h1>
		<h2 class="question_text">${this.text_question}</h2>
		<form id="question_form">
                <div class="answers_field">
                    ${this.get_child_html()}
		</div>
		<div class="reset_form">
                    <input type="reset" value="Сбросить ответ">
		</div>
		<div class="timer_box">
                    <p><span class="timer">     </span></p>
		</div>
		<div class="submit_box">
                    <input type="submit" value="Завершить тестирование">
		</div>
                </form>`;
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
        all_forms[form_number].display_form();
    }
    display_form(){
        /* Этот метод должна вызввать кнопка при нажатии*/
        BaseQuestion.now_form_display.save_data();
        this.form_element.innerHTML = this.get_form_html;
        BaseQuestion.now_form_display = this;
        this.status_question = 'active_button';
        BaseQuestion.set_vavigation_buttons();
    }
    
    save_data(){
        // Должно быть переопределено в дочернем классе
        /*Сохранение данных формы перед ее закрытием (сменой на другую форму)*/
        change_color_nav_buttons()
        
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
};

class CheckBoxQuestion extends BaseQuestion {
    
    save_data(){
        super.save_data();
        this.changed_answers = [this.form_element_.elements.change_ans.value];
        
    }
    
    change_color_nav_buttons(){
        super.change_color_nav_buttons();
        this.status_question = this.changed_answers.length > 0? "positive": "negative";
    }
    
    get_child_html(){
        super.get_child_html();
        return this.get_all_radiobuttons_html();
    }
    
    get_radiobutton_html(value, checked){
        return `<div class="radiobutton">
   	<input type="radio" name="change_ans"
                value="${value}" id="ans_${value}" ${checked? "checked": ""}>
        <label for="ans_${value}">${value}</label>
        </div>`;
    }
    get_all_radiobuttons_html(){
        return this.options_answer.reduce(function(a, b){
            return a + "\n" + this.get_radiobutton_html(b,
            !(this.changed_answers.indexOf(b) !== -1));
        }, "");
    }
    
};