var gulp = require("gulp"); // importamos la libreria gulp
var sass = require("gulp-sass");
var notify = require("gulp-notify");
var browserSync = require("browser-sync").create();
var gulpImport = require('gulp-html-import');

// definimos la tarea por defecto
gulp.task("default", ["html", "sass"], function(){

    // iniciamos el servidor de desarrollo
    browserSync.init({ server: "dist/" });

    // observa cambios en los archivos SASS, y entonces ejectua la tarea 'sass'
    gulp.watch(["src/scss/*.scss","src/scss/**/*.scss"],["sass"]);

    // obsevar cambio en los archivos html y entonces recarga el navegador
    gulp.watch("src/**/*.html", ["html"]); 
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