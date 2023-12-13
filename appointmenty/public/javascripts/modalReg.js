
// $('input[type="submit"]').on('click', function(){
//     console.log("Estoy en jquery JEJE")
//     $('#modSucces').removeClass('d-none');
//     //$('#modSucces').modal('show');

//     console.log("Estoy despues del modal?")
// })
// $('input[type="submit"]').on('click', function(event) {
//     event.preventDefault(); // Evita que el formulario se envíe automáticamente (si es un formulario)
    
    
//     console.log("Estoy en jQuery JEJE");
    
//     $('#modSucces').modal('open'); // Abre el modal
//     console.log("Estoy despues del modal?")
// });
$(function() {
    // Manejar el evento de envío del formulario
    $('#registroForm').on("submit", function(event) {
        // Cancelar el comportamiento predeterminado del formulario
        event.preventDefault();

        // Obtener la pantalla altura y ancho
        var maskHeight = $(document).height() / 2;
        var maskWidth = $(window).width() / 2;

        // Configurar altura y ancho de la máscara para cubrir toda la pantalla
        $('#mask').css({'width': maskWidth, 'height': maskHeight});

        // Efecto de transición en la máscara
         $('#mask').fadeIn(1000);
         $('#mask').fadeTo("slow");

        // Obtener la altura y ancho de la ventana
        var winH = $(window).height();
        var winW = $(window).width();

        // Configurar la posición del modal para centrarlo
        $('#mask').css('top', winH / 2 - $('#mask').height() / 2);
        $('#mask').css('left', winW / 2 - $('#mask').width() / 2);

        // Efecto de transición en el modal
        $('#mask').fadeIn(2000);
    });

    // Manejar el clic en el botón de cerrar
    $('.window .close').click(function (e) {
        // Cancelar el comportamiento predeterminado del enlace
        e.preventDefault();
        $('#mask, .window').hide();
    });

    // Manejar el clic en la máscara
    $('#mask').click(function () {
        $(this).hide();
        $('.window').hide();
    });
});

