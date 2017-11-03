const $ = require("jquery");

export class SongsService {
    
    
    constructor(url){
        this.url = url;
    }

    // Obtener un listado de canciones
    list(successCallback, errorCallback){
        $.ajax({
            url:this.url,
            success: successCallback,
            error: errorCallback
            
        });
    }

    //Crear o actualizar cancion
    save(song, successCallback, errorCallback){
        if(song.id){
            this.update(song, successCallback, errorCallback);
        }else{
            this.create(song, successCallback, errorCallback);
        }
    }

    // Crear una cancion
    create(song, successCallback, errorCallback){
        $.ajax({
            url:this.url,
            method: "post",
            data: song,
            success: successCallback,
            error: errorCallback
        })
    }

    // Obtener el detalle de una cancion
    getDetail(songId, successCallback, errorCallback){
        $.ajax({
            url: `${this.url}${songId}`,
            success: successCallback,
            error: errorCallback
        })
    }

    // Actualizar una cancion
    update(song, successCallback, errorCallback){
        $.ajax({
            url:`${this.url}${song.id}`,
            method: "put",
            data: song,
            success: successCallback,
            error: errorCallback
        })
    }
    
    // Borrar una cancion (songsService.delete(4, response => {}, error => {}))
    delete(songId, successCallback, errorCallback){
       $.ajax({
           url: `${this.url}${songId}`,
           method: 'delete',
           success: successCallback,
           error: errorCallback
       }) 
    }
}