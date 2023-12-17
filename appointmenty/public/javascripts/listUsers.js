$("#searchBar").on("keyup", function() {
    let inputSearch = $("#searchBar").val().toLowerCase().trim()
    let option = $("#option").val()

    console.log(inputSearch)
    console.log(option)
    
    $.ajax({
        url:"/admin/filterList",
        type: "GET",
        data: {inputSearch,option},
        success: function(response) {
            $("#listar").empty()
            if(response.length === 0) $("#listar").append(`
                <div id="usuarios" class="row border-bottom py-4 align-items-center mx-2 text-center">  
                    <div class="col"><span>No se encontraron resultados</span></div>
                </div>
            `)
            else {
                response.forEach(ele => {
                    let ruta = null
                    if (!ele.foto) ruta = "/images/noPicture.jpg"
                    else ruta = `/users/profilePhoto/${ele.id}`
                        
                    $("#listar").append(`
                    <div id="usuarios" class="row border-bottom py-1 align-items-center mx-2 " data-id="${ele.id}">
                        <div class="col-1">
                            <img style="width: 4em;mix-blend-mode: darken;" class="loginImage" src="${ruta}">
                        </div>
                        <div class="col-3"><span>${ele.nombre} ${ele.apellido1} ${ele.apellido2}</span></div>
                        <div class="col-2"><span>${ele.correo}</span></div>
                        <div class="col-1"><span>${ele.curso}º</span></div>
                        <div class="col-2"><span>${ele.facultad}</span></div>
                        <div class="col-3"><span>${ele.grado}</span></div>
                    </div>
                    `)
                })
            }
        }
    })
        
});

$("#option").on("change", function() {
    let inputSearch = $("#searchBar").val().toLowerCase().trim()
    let option = $("#option").val()

    console.log(inputSearch)
    console.log(option)
    
    $.ajax({
        url:"/admin/filterList",
        type: "GET",
        data: {inputSearch,option},
        success: function(response) {
            $("#listar").empty()
            if(response.length === 0) $("#listar").append(`
                <div id="usuarios" class="row border-bottom py-4 align-items-center mx-2 text-center">  
                    <div class="col"><span>No se encontraron resultados</span></div>
                </div>
            `)
            else {
                response.forEach(ele => {
                    let ruta = null
                    if (!ele.foto) ruta = "/images/noPicture.jpg"
                    else ruta = `/users/profilePhoto/${ele.id}`
                        
                    $("#listar").append(`
                    <div id="usuarios" class="row border-bottom py-1 align-items-center mx-2 " data-id="${ele.id}">
                        <div class="col-1">
                            <img style="width: 4em;mix-blend-mode: darken;" class="loginImage" src="${ruta}">
                        </div>
                        <div class="col-3"><span>${ele.nombre} ${ele.apellido1} ${ele.apellido2}</span></div>
                        <div class="col-2"><span>${ele.correo}</span></div>
                        <div class="col-1"><span>${ele.curso}º</span></div>
                        <div class="col-2"><span>${ele.facultad}</span></div>
                        <div class="col-3"><span>${ele.grado}</span></div>
                    </div>
                    `)
                })
            }
        }
    })
        
});