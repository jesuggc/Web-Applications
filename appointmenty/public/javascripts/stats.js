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
    $.ajax({
        url: "/admin/pertecentageStat",
        type: "GET",
        data: 2,
        success: function(response) {
            let total = 0
            response.forEach(ele => {
                total += ele.count
            })
            let circlesArray = new Array(response.length)
            response.forEach((ele,i) => {
                console.log(i)
                console.log(ele)
                $("#circlesRow").append(`<div class="col"><div class="circle d-inline" id="circles-${i}"></div><p>${ele.nombre}</p></div>`)
                circlesArray[i] = Circles.create({
                    id:                  `circles-${i}`,
                    radius:              60,
                    value:               ele.count,
                    maxValue:            7,
                    width:               19,
                    text:                function(value){console.log(value); return Math.round(this.getPercent()) + '%';},
                    colors:              ['#D3B6C6', '#4B253A'],
                    duration:            800,
                    wrpClass:            'circles-wrp',
                    textClass:           'circles-text',
                    valueStrokeClass:    'circles-valueStroke',
                    maxValueStrokeClass: 'circles-maxValueStroke',
                    styleWrapper:        true,
                    styleText:           true
                })
                
            })
        } 
    })
}) 