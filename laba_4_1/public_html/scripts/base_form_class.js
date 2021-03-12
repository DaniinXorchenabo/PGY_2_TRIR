class BaseQuestion{
    static question_count = 10;
    static navigation_buttons = [];
    static now_form_display = null;
    static all_forms = [];
    number_question;
    text_question;
    options_answer;
    changed_answers;
    form_element;
    status_question = null;
    
    
    constructor(n_q, text, options){
        // Базовый конструктор класса
        this.number_question = n_q;
        this.text_question = text;
        this.options_answer = options;
        this.form_element = document.getElementById("content");
        BaseQuestion.navigation_buttons.push(this.get_navigation_button);
        BaseQuestion.all_forms.push(this);
        
    }
    
    
    get get_navigation_button(){
        return `<li><button ${this.status_question?
        'class="' + 'no_answer' + this.status_question: ''} 
        onclick="BaseQuestion.button_click(${this.number_question})">
        ${this.number_question}</button></li>`;
    }
    get get_child_html(){
        // Должен быть переопределён в дочернем классе
        // Возвращает поле ввода ответа
        return "";
    }
    
    get get_form_html(){
        // Возвращает html-код формы (с поставленными значени=ями, если таковые имеются)
        return `<h1 class="question_title">Вопрос ${this.number_question} из ${this.question_count}</h1>
		<h2 class="question_text">${this.text_question}</h2>
		<form id="question_form">
                <div class="answers_field">
                    ${this.get_child_html}
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
    
    save_data(){
        /*Сохранение данных формы перед ее закрытием (сменой на другую форму)*/
    }
    
    display_form(){
        /* Этот метод должна вызввать кнопка при нажатии*/
        BaseQuestion.now_form_display.save_data();
        this.form_element.innerHTML = this.get_form_html;
        BaseQuestion.now_form_display = this;
    }
    
    static get_navigation_buttons(){
        // Возвращает код кнопок навигации
        return BaseQuestion.navigation_buttons.reduce(function(a, b){return a + '\n' +  b;});
    }
    
    static button_click(form_number){
        // Непосредственно вызывается при нажатии кнопки,
        // form_number - номер вопроса
        all_forms[form_number].display_form();
    }
}

class CheckBoxQuestion extends BaseQuestion {
    

}