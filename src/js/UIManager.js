const $ = require("jquery");

export default class UIManager{
    
    constructor(selector){
        this.uiStateClasses = " empty loading error partial ideal"; // clases CSS que definen estados de componente
        this.element = $(selector); // seleccionamos el elemento de jQuery en el constructor
    
    }

    setEmpty(){
        $(this.element).removeClass(this.uiStateClasses).addClass("empty");
    }
    setLoading(){
        $(this.element).removeClass(this.uiStateClasses).addClass("loading");
    }
    setError(){
        $(this.element).removeClass(this.uiStateClasses).addClass("Error");
    }
    setPartial(){
        $(this.element).removeClass(this.uiStateClasses).addClass("partial");
    }
    setIdeal(){
        $(this.element).removeClass(this.uiStateClasses).addClass("ideal");
    }
}