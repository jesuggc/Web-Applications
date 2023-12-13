$(".divEditable").on("click", function() {
    var placeholder = $(".placeHolder");
    if (placeholder.text().trim() === "Facultad") {
        $(".placeHolder").html('');;
    }
});

$(".divEditable").on("blur", function() {
    var placeholder = $(".placeHolder");
    var facNombre = $(this).text().trim();
    var idFac=null
    console.log("facNombre", facNombre)
    if ($(this).text().trim() === "") {
        placeholder.html("Facultad");
    }
    else{
        $.ajax({
            url:"/admin/getFacultades",
            type: "GET",
            success: function(response) {
                response.forEach(ele=>{
                    if(ele.nombre=== facNombre) idFac=ele.id;
                })
                if(idFac){
                    $.ajax({
                        url:"/admin/getStudents", //Por Fac Id
                        type: "GET",
                        data: {idFac},
                        success: function(res){
                            $("#listar").empty()
                            res.forEach(ele => { 
                                $("#listar").append(`
                                        <div id="usuarios" class="border-bottom py-1  row mx-2 ">
                                        <div class="col">`)
                                            if (! ele.foto){ 
                                                $("#usuarios").append(`<img style="width: 6em;mix-blend-mode: darken;" class="loginImage" src="/images/noPicture.jpg">`)
                                            } else{ 
                                                $("#usuarios").append(`<img style="width: 6em; mix-blend-mode:darken;" class="loginImage" src="/users/profilePhoto/${ele.id}">`)
                                            } 
                                        $("#listar").append(`</div>
                                        <div class="col"><span>${ele.nombre} ${ele.apellido1} ${ele.apellido2}</span></div>
                                        <div class="col"><span>${ele.correo }</span></div>
                                        <div class="col"><span>Curso: ${ele.curso }º</span></div>
                                        <div class="col"><span>${ele.facultad}, grado de: ${ele.grado}</span></div>
                                    </div>
                                    }) 
                                    <br>
                                `)
                                $("#usuarios").attr("data-id", ele.id)
                                
                            })
                        }
                    })
                }
                else {
                    $("#rowFiltros").append(`<p class="red mx-5">No se encontro esa Facultad<p>`)
                }
            }
        })
        
    }
});