$("#userSearcher").on("keyup", function() {
  var inputSearch = $(this).val().toLowerCase().trim();
  console.log(inputSearch)
  $.ajax({
    url: "/admin/historyList",
    method: "GET",
    data: {inputSearch},
    success: function(response) {
      $("#showUsers").empty();
      if(response.length=== 0) $("#showUsers").append(`
      <div class=" py-1 whitesmoke text-center cursorPointer row mx-2">
        <div class="col my-4"><span>Sin resultados</span></div>
      </div>`)
      else response.forEach(ele => {
        $("#showUsers").append(`
        <div class="border-bottom py-1 whitesmoke text-center cursorPointer row mx-2" data-id="${ele.id}">
          <div class="col-5"><span>${ele.nombre} ${ele.apellido1} ${ele.apellido2}</span></div>
          <div class="col-2"><span>${ele.correo}</span></div>
          <div class="col-5"><span>${ele.facultad}</span></div>
        </div> 
        `);
      })
     
      
    }
  })
})


{/* <div class="border-bottom py-1 whitesmoke text-center cursorPointer row mx-2" data-id="">
                      <div class="col-5"><span>largo que Nombre apellido apellido2</span></div>
                      <div class="col-2"><span>Correolargo@ucm.es</span></div>
                      <div class="col-5"><span>Educación – Centro de Formación del Profesorado</span></div>
                    </div> */}