$("#userSearcher").on("keyup", function() {
  var inputSearch = $(this).val().toLowerCase();
  $.ajax({
    url: "/users/historyList",
    method: "GET",
    data: {inputSearch},
    success: function(response) {
      $("#showUsers").empty();
      // if(data.users) $("#showUsers").append(`<div class="border-bottom py-1 whitesmoke text-center cursorPointer row mx-2"><div class="col-12"><span>No se han encontrado resultados</span></div></div>`)
      // else data.forEach(ele => {
      //   $("#showUsers").append(`
      //   <div class="border-bottom py-1 whitesmoke text-center cursorPointer row mx-2" data-id="${ele.id}">
      //     <div class="col-5"><span>${ele.nombre} ${ele.apellido1} ${ele.apellido2}</span></div>
      //     <div class="col-2"><span>${ele.correo}</span></div>
      //     <div class="col-5"><span>${ele.facultad}</span></div>
      //   </div> 
      //   `);
      // })
      console.log(response)
      
    }
  })
})


{/* <div class="border-bottom py-1 whitesmoke text-center cursorPointer row mx-2" data-id="">
                      <div class="col-5"><span>largo que Nombre apellido apellido2</span></div>
                      <div class="col-2"><span>Correolargo@ucm.es</span></div>
                      <div class="col-5"><span>Educación – Centro de Formación del Profesorado</span></div>
                    </div> */}