
let nombreBool=false;
let emailBool=false;
let surname1=false;
let surname2=false;
let passwordBool=false;
let passwordCheckBool=false;
let facultadReady=false
let gradoReady=false
let cursoReady=false

$("#confirmPassword").on("keyup", () => {
    $("#errorConfirm").remove()
    let password = $("#password").val()
    let confirmPassword = $("#confirmPassword").val()
    
    passwordCheckBool = password === confirmPassword
    if(password !== confirmPassword) $("#confirmContainer").append(`<p style="color:red" id="errorConfirm">Las contraseñas deben coincidir</p>`)
    else $("#errorConfirm").remove()
        
})


let sizeCheck = /^.{8,}$/
let capitalCheck = /[A-ZÁÉÍÓÚ]/
let specialCheck = /[^a-zA-Z0-9]/
let numberCheck = /\d/
let nameLikeCheck = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/
let nameLikeSizeCheck = /^.{3,}$/
let allCheck = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/

$("#password").on("keyup", () => {
    $("#capitalCheck").remove()
    $("#sizeCheck").remove()
    $("#specialCheck").remove()
    $("#numberCheck").remove()

    if(!capitalCheck.test($("#password").val()) === true) $("#passContainer").append(`<li style="color:red" id="capitalCheck">Debe contener una mayuscula</li>`)
    else $("#capitalCheck").remove()

    if(!sizeCheck.test($("#password").val()) === true) $("#passContainer").append(`<li style="color:red" id="sizeCheck">Debe contener 8 caracteres</li>`)
    else $("#sizeCheck").remove()

    if(!specialCheck.test($("#password").val()) === true) $("#passContainer").append(`<li style="color:red" id="specialCheck">Debe contener 1 caracter especial</li>`)
    else $("#specialCheck").remove()

    if(!numberCheck.test($("#password").val()) === true) $("#passContainer").append(`<li style="color:red" id="numberCheck">Debe contener 1 número</li>`)
    else $("#numberCheck").remove()

    passwordBool = allCheck.test($("#password").val())
})

$("#email").on("keyup", () => {
    let emailCheck = /^\w*@ucm[.]es$/
    $("#errorEmail").remove()
    $("#wrongMail").remove()
    emailBool = emailCheck.test($("#email").val())

    if(emailCheck.test($("#email").val()) === false) $("#emailContainer").append(`<p style="color:red" id="errorEmail">Solo correo UCM</p>`)
    else $("#errorEmail").remove()
})

$("#name").on("keyup",()=>{

    $("#letterCheck").remove()
    $("#letterSizeCheck").remove()

    nombreBool = nameLikeCheck.test($("#name").val()) && nameLikeSizeCheck.test($("#name").val()) 
   
    if(nameLikeCheck.test($("#name").val()) === false ) $("#nameContainer").append(`<p style="color:red" id="letterCheck">Solo puede contener letras</p>`)
    else $("#letterCheck").remove()

    if(nameLikeSizeCheck.test($("#name").val()) === false ) $("#nameContainer").append(`<p style="color:red" id="letterSizeCheck">Nombre demasiado corto</p>`)
    else $("#letterSizeCheck").remove()

})
$("#surname1").on("keyup",()=>{

    $("#surname1Check").remove()
    $("#surname1SizeCheck").remove()

    surname1 = nameLikeCheck.test($("#surname1").val()) && nameLikeSizeCheck.test($("#surname1").val())

    if(nameLikeCheck.test($("#surname1").val()) === false ) $("#surname1Container").append(`<p style="color:red" id="surname1Check">Solo puede contener letras</p>`)
    else $("#surname1Check").remove()

    if(nameLikeSizeCheck.test($("#surname1").val()) === false ) $("#surname1Container").append(`<p style="color:red" id="surname1SizeCheck">Apellido demasiado corto</p>`)
    else $("#surname1SizeCheck").remove()
})
$("#surname2").on("change",()=>{

    $("#surname2Check").remove()
    $("#surname2SizeCheck").remove()

    surname2 = nameLikeCheck.test($("#surname2").val()) && nameLikeSizeCheck.test($("#surname2").val())

    if(nameLikeCheck.test($("#surname2").val()) === false ) $("#surname2Container").append(`<p style="color:red" id="surname2Check">Solo puede contener letras</p>`)
    else $("#surname2Check").remove()

    if(nameLikeSizeCheck.test($("#surname2").val()) === false ) $("#surname2Container").append(`<p style="color:red" id="surname2SizeCheck">Apellido demasiado corto</p>`)
    else $("#surname2SizeCheck").remove()
})


$('#myForm input, #myForm select').on('change', function() {
    if(nombreBool && passwordBool && passwordCheckBool && emailBool && surname1 && surname2 && facultadReady && gradoReady && cursoReady) $('#register').prop('disabled', false);
    else $('#register').prop('disabled', true);
});

$("#register").on("click", () => {
    // let nombre = $("#name").val()
    // let apellido1 = $("#surname1").val()
    // let apellido2 = $("#surname2").val()
    // let email = $("#email").val()
    let password = $("#password").val()
    let facultad = $("#facultad option:selected").val().split("#")[0]
    let grado = $("#grado option:selected").val().split("#")[2]
    let curso = $("#curso option:selected").val()

    let formData = new FormData($("#myForm")[0]);
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);
    formData.append('facultad', facultad);
    formData.append('grado', grado);
    formData.append('curso', curso);
   
    $.ajax({
        url: "/users/checkEmail",
        type: "GET",
        data: {email: formData.get('email')},
        processData: false,
        contentType: false,
        success: function(response) {
            if(response.existe === true) $("#emailContainer").append(`<p id="wrongMail" style="color:red">Correo ya existente</p>`)
            else {  
                
                $.ajax({
                    url: "/users/register",
                    type: "POST",
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(response) {
                        $("#modalLaunch").trigger("click")
                    }
                })
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    })
})

$("#facultad").on("input", () => {
    facultadReady = true;
})
$("#grado").on("input", () => {
    gradoReady = true;
})
$("#curso").on("input", () => {
    cursoReady = true;
})

var formulario = document.getElementById("myForm");

// Deshabilitar la funcionalidad de copiar
formulario.addEventListener("copy", function (e) {
    e.preventDefault();
});

// Deshabilitar la funcionalidad de pegar
formulario.addEventListener("paste", function (e) {
    e.preventDefault();
});

// Deshabilitar la funcionalidad de cortar
formulario.addEventListener("cut", function (e) {
    e.preventDefault();
});
document.addEventListener('keydown', function (e) {
    // Desactivar pegar (Ctrl+V) y cortar (Ctrl+X)
    if (e.ctrlKey && (e.key === 'v' || e.key === 'V' || e.key === 'x' || e.key === 'X'|| e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
    }
});
