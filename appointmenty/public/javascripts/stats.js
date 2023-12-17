// var myCircle1 = Circles.create({
//     id:                  'circles-1',
//     radius:              60,
//     value:               43,
//     maxValue:            100,
//     width:               19,
//     text:                function(value){return value + '%';},
//     colors:              ['#D3B6C6', '#4B253A'],
//     duration:            1400,
//     wrpClass:            'circles-wrp',
//     textClass:           'circles-text',
//     valueStrokeClass:    'circles-valueStroke',
//     maxValueStrokeClass: 'circles-maxValueStroke',
//     styleWrapper:        true,
//     styleText:           true
// });
// var myCircle2 = Circles.create({
//     id:                  'circles-2',
//     radius:              60,
//     value:               43,
//     maxValue:            100,
//     width:               19,
//     text:                function(value){return value + '%';},
//     colors:              ['#D3B6C6', '#4B253A'],
//     duration:            1400,
//     wrpClass:            'circles-wrp',
//     textClass:           'circles-text',
//     valueStrokeClass:    'circles-valueStroke',
//     maxValueStrokeClass: 'circles-maxValueStroke',
//     styleWrapper:        true,
//     styleText:           true
// });
// var myCircle3 = Circles.create({
//     id:                  'circles-3',
//     radius:              60,
//     value:               43,
//     maxValue:            100,
//     width:               19,
//     text:                function(value){return value + '%';},
//     colors:              ['#D3B6C6', '#4B253A'],
//     duration:            1400,
//     wrpClass:            'circles-wrp',
//     textClass:           'circles-text',
//     valueStrokeClass:    'circles-valueStroke',
//     maxValueStrokeClass: 'circles-maxValueStroke',
//     styleWrapper:        true,
//     styleText:           true
// });

$(function () {
    let id = $("#panel").attr("data-id")
    $.ajax({
        url: "/admin/pertecentageStat",
        type: "GET",
        data: { id },
        success: function (response) {
            let total = 0
            response.forEach(ele => {
                total += ele.count
            })
            let circlesArray = new Array(response.length)
            response.forEach((ele, i) => {
                console.log(i)
                console.log("soy ele", ele)
                $("#circlesRow").append(`<div class="col text-center"><div class="circle d-inline" id="circles-${i}"></div><p>${ele.nombre}</p></div>`)
                circlesArray[i] = Circles.create({
                    id: `circles-${i}`,
                    radius: 60,
                    value: ele.count,
                    maxValue: total,
                    width: 19,
                    text: function (value) { console.log(value); return Math.round(this.getPercent()) + '%'; },
                    colors: ['#FFCAB1', '#e16024'],
                    duration: 800,
                    wrpClass: 'circles-wrp',
                    textClass: 'circles-text',
                    valueStrokeClass: 'circles-valueStroke',
                    maxValueStrokeClass: 'circles-maxValueStroke',
                    styleWrapper: true,
                    styleText: true
                })

            })
            let asistidas=$("#assisted").attr("data-id")
            $("#circleAsistidas").append(`<div class="circle text-center d-inline" id="circleAssisted"></div><p class="text-start ms-4">Asistidas</p>`)
                circleAssisted = Circles.create({
                    id: `circleAssisted`,
                    radius: 60,
                    value: asistidas,
                    maxValue: total,
                    width: 19,
                    text: function (value) { console.log(value); return Math.round(this.getPercent()) + '%'; },
                    colors:['#BFB48F', '#0B5D1E'],
                    duration: 800,
                    wrpClass: 'circles-wrp',
                    textClass: 'circles-text',
                    valueStrokeClass: 'circles-valueStroke',
                    maxValueStrokeClass: 'circles-maxValueStroke',
                    styleWrapper: true,
                    styleText: true
                })
        }
    })
    
}) 