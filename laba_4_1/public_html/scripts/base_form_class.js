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
        // возвращает код кнопки, при нажатии на которую будет появляться эта форма
        return ""
    }
    
    get get_form_html(){
        // Возвращает html-код формы (с поставленными значени=ями, если таковые имеются)
        return "";
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
        return "";
    }
    
    static button_click(form_number){
        // Непосредственно вызывается при нажатии кнопки,
        // form_number - номер вопроса
        all_forms[form_number].display_form();
    }
}

class CheckBoxQuestion extends BaseQuestion {
    

}