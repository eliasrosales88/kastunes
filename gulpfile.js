var gulp = require("gulp"); // importamos la libreria gulp
var sass = require("gulp-sass");
var notify = require("gulp-notify");
var browserSync = require("browser-sync").create();
var gulpImport = require('gulp-html-import');
var tap = require("gulp-tap");
var browserify = require("browserify");
var buffer = require("gulp-buffer");

// definimos la tarea por defecto
gulp.task("default", ["html", "sass", "js"], function(){

    // iniciamos el servidor de desarrollo
    browserSync.init({ server: "dist/" });

    // observa cambios en los archivos SASS, y entonces ejectua la tarea 'sass'
    gulp.watch(["src/scss/*.scss","src/scss/**/*.scss"],["sass"]);

    // obsevar cambio en los archivos html y entonces ejectua la tarea 'html'
    gulp.watch(["src/*.html", "src/**/*.html"], ["html"]); 

    // observa cambios en los archivos JS y entonces ejectua la tarea 'js'
    gulp.watch(["src/js/*.js", "src/js/**/*.js"], ["js"]);
});

    


// definimos la tarea de COMPILAR SASS
gulp.task("sass", function(){
    gulp.src("src/scss/style.scss") // cargamos el archivo styles.scss
        .pipe(sass().on("error", function(error){      // lo compilamos con gulp-sass
            return notify().write(error);              // si ocurre un error mostramos una notificacion
        })) 


        .pipe(gulp.dest("dist/")) // guardamos el resultado en la carpeta css
        .pipe(browserSync.stream())  // con esto recargamos solamente el css del navegador
        .pipe(notify("SASS Compilado!")); // muestra notificaciones en pantalla
});

// Copiar e importar HTML
gulp.task("html", function () {
    gulp.src("src/*.html")
        .pipe(gulpImport("src/components/"))
        .pipe(gulp.dest("dist/")) 
        .pipe(browserSync.stream())
        .pipe(notify("HTML importado"));
});

 // COMPILAR  Y GENERAR UN UNICO JAVASCRIPT

 gulp.task("js", function(){
     gulp.src("src/js/main.js")
         .pipe(tap(function(file){ // tap nos permite ejecutar una funcion por cada fichero seleccionado en gulp.src
            // reemplazamos el contenido del fichero por lo que nos devuelve browserify pasandole el fichero
            file.contents = browserify(file.path) // creamos una instancia de browserify en base al archivo
                            .transform("babelify", {presets: ["es2015"]}) // traduce nuestro codigo de ES6 -> ES5
                            .bundle() // compilamos el archivo
                            .on("error", function(error){ // en caso de error, mostramos una notificacion
                                return notify().write(error);
                            });

         }))
         .pipe(buffer())// convertimos a buffer para que funcione el siguiente pipe
         .pipe(gulp.dest("dist/")) // lo guardamos en la carpeta dist
         .pipe(browserSync.stream()) // recargamos el navegador
         .pipe(notify("JS Compilado"));
 });