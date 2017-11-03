const $ = require("jquery");

export class SongsService {
    
    
    
    constructor(){

    }

    // Obtener un listado de canciones
    list(successCallback, errorCallback){
        $.ajax({
            url:"/songs/",
            success: successCallback,
            error: errorCallback
            
        });
    }

    //Crear o actualizar cancion
    save(song){}

    // Crear una cancion
    create(song){}

    // Obtener el detalle de una cancion
    getDetail(songId){}

    // Actualizar una cancion
    update(){}
    
    // Borrar una cancion
    delete(songId){}
}