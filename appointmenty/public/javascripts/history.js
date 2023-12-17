$("#userSearcher").on("keyup", function() {
  var inputSearch = $(this).val().toLowerCase().trim();
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
        <div id="user" class="border-bottom py-1 whitesmoke text-center cursorPointer row mx-2" data-id="${ele.id}">
          <div class="col-5 "><span class="clickedName">${ele.nombre} ${ele.apellido1} ${ele.apellido2}</span></div>
          <div class="col-2"><span>${ele.correo}</span></div>
          <div class="col-5"><span class="clickedFaculty">${ele.facultad}</span></div>
        </div> 
        `);
      })
     
      
    }
  })
})

$("#showUsers").on("click","#user", function(){
  let name=$(this,".clickedName").text().trim().split(' ')[0].trim()
  let ap1=$(this,".clickedName").text().trim().split(' ')[1].trim()
  let ap2=$(this,".clickedName").text().trim().split(' ')[2].trim()
  $(".cardRow").addClass("d-none")
  $(".cardBody").removeClass("asistencia")
  $(".cardBody").removeClass("cancelada")
  $("#reservationTitle").removeClass("d-none")
  $("#detailsTitle").addClass("d-none")
  $(".reservationCard").addClass("d-none")
  $(".primera").empty()
  $(".segunda").empty()
  $.ajax({
    url:"/admin/reservationsList",
    type: "GET",
    data: {name,ap1,ap2},
    success: function(response){
      if(response.length===0)   $(".noBookingsMsg").removeClass("d-none")
      else{
        
        $(".noBookingsMsg").addClass("d-none")
        $(".cardRow").removeClass("d-none") 
        $(".reservationCard").each(function(i,ele) {
          
          if(i < response.length) {
            if(response[i].cancelado===1)  $(ele).find(".cardBody").addClass("cancelada")
            else  $(ele).find(".cardBody").addClass("asistencia")
            $(ele).attr("data-id",response[i].id)
            $(ele).removeClass("d-none")
            $(ele).find(".nombreInstalacion").empty()
            $(ele).find(".nombreInstalacion").prepend(`${response[i].nombre}`)
            $(ele).find(".fechaReserva").empty()
            
            $(ele).find(".fechaReserva").prepend(`${response[i].fechaReserva}`)
          }
        })
      }

     }
  })
})
$(".reservationCard").on("click", function(){
  $(".primera").empty()
  $(".segunda").empty()
  $("#detailsTitle").removeClass("d-none")
  let id= $(this).attr("data-id")
  $.ajax({
    url:"/admin/getResDetails",
    type: "GET",
    data: {id},
    success: function(response){
      $(".primera").append(`<p>Facultad: ${response.nombreFacultad}</p>
      <p>Tipo de instalación: ${response.tipoInstalacion}</p>
      <p>Aforo máximo: ${response.aforo}</p>`)
      let status= "ASISTIDO"
      if(response.cancelado === 1) status="CANCELADO"
      $(".segunda").append(`<p>Día: ${response.fechaReserva}</p>
      <p>Horas: ${response.horaIni}:00 - ${response.horaFin+1}:00</p>
      <p>Horas totales: ${response.totalHoras}</p>
      <p>Estado: ${status}</p>
      `)
    }

  })
})
