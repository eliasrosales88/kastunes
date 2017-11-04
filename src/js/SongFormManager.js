const $ = require("jquery");

import UIManager from './UIManager';
import PubSub from 'pubsub-js';

export default class SongFormManager extends UIManager{

        constructor(elementSelector, songsService){
           super(elementSelector); // llamada al constructor de la clase UIManager
            this.songsService = songsService;
        }

        init(){
            this.setupSubmitEventHandler();
        }

        setupSubmitEventHandler(){
            this.element.on("submit", () => {
                this.validateAndSendData();
                // En jQuery podemos hacer un preventDefault haciendo un return false en los manejadores de eventos
                return false;  // == event.preventDefault();
            });
        }

        validateAndSendData(){
            if(this.isValid()){
                this.send();
            }
            
        }

        isValid(){
            const inputs = this.element.find("input");
            for (let input of inputs){
                if(input.checkValidity() == false){
                    const errorMessage = input.validationMessage;
                    input.focus();
                    this.setErrorHtml(errorMessage);
                    this.setError();
                    return false;
                }
            }
            //Llegamos aqui, si no hay ningun error
            this.setIdeal();
            return true;
        }

        send(){
            this.setLoading();
            const song = {
                artist: this.element.find("#artist").val(),
                title: this.element.find("#title").val(),
                cover_url: this.element.find("#cover_url").val()
            }
            this.songsService.save(song, success => {
                // Recargar el listado de canciones
                PubSub.publish("new-song", song); // Publicamos el evento que informa de la creacion de una cancion
                this.resetForm();
                this.setIdeal();
            }, error =>{
                this.setErrorHtml("Se ha producido un error al guardar la cancion en el servidor.");
                this.setError();
            });
        }

        resetForm(){
            this.element[0].reset(); // Resetea el formulario
        }

        disableFormControls(){
            this.element.find("input, button").attr("disabled", true);
        }
        
        enableFormControls(){
            this.element.find("input, button").attr("disabled", false);
        }

        setLoading(){
            super.setLoading();
            this.disableFormControls();
        }

        setError(){
            super.setError();
            this.enableFormControls();
        }

        setIdeal(){
            super.setIdeal();
            this.enableFormControls();
        }
}