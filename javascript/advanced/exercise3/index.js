function pluck(objects, fieldName) {
    names = []
    objects.forEach(element => {
        if(element[fieldName]) names.push(element[fieldName])
    });
    return names
}

let personas = [
    {nombre: "Ricardo", edad: 63},
    {nombre: "Paco", edad: 55},
    {nombre: "Enrique", edad: 32},
    {nombre: "Adrián", edad: 34},
    {apellido: "García", edad: 28}
];

    // console.log(pluck(personas, "nombre")) // Devuelve: ["Ricardo", "Paco", "Enrique", "Adrián"]
    // console.log( pluck(personas, "edad")) // Devuelve: [63, 55, 32, 34,28]
    // console.log(pluck(personas, "apellido")) // Devuelve: [“García”]
    // console.log(pluck(personas, "email")) // Devuelve: []

    function partition(objects, x) {
        a1 = []
        a2 = []
        objects.forEach(element => {
            if(x(element)===true) a1.push(element)
            else a2.push(element)
        });
        b = []
        b.push(a1)
        b.push(a2)
        return b
    }

    console.log(partition(personas, pers => pers.edad >= 60))
    // Devuelve:
    // [
    // [ {nombre: "Ricardo", edad: 63} ],
    // [ {nombre: "Paco", edad: 55}, {nombre: "Enrique", edad: 32},
    // {nombre: "Adrián", edad: 34}, {apellidos: "García", edad: 28 ]
    // ]