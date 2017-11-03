window.$ = window.jQuery = require("jquery"); // Hace que jQuery sea accesible publicamente

import {SongsService} from "./SongsService";

const songService = new SongsService();

//Cargar la lista de canciones con AJAX

songService.list(songs => {

    // Comprobamos si hay canciones

    if (songs.length == 0){
        
                    //Mostramos el estado vacio
                    $(".songs-list").removeClass("loading").addClass("empty");
                }else{
        
                    // Componemos el html con todas las canciones
                    let html = "";
                    for (let song of songs){
                    html += `<article class="song">
                        <img src="${song.cover_url}" alt="${song.artist} - ${song.title}" class="cover">
                        <div class="artist">${song.artist}</div>
                        <div class="title">${song.title}</div>
                    </article>`;
                    }
        
                    // Metemos el html en el div que contiene las canciones
                    $(".songs-list .ui-status.ideal").html(html);
        
                    //Quitamos el mensaje de cargando y mostrando el listado de canciones
        
                    $(".songs-list").removeClass("loading").addClass("ideal");
                }   
}, 
    
    error =>{

         //Mostrar el estado de error
         $(".songs-list").removeClass("loading").addClass("error");
         
         // Hacemos log del error en la consola
         console.error("Error al cargar las canciones", error);
    })

