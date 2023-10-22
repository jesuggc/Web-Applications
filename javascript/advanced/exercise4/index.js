function pluck(objects, fieldName) {
    names = []
    objects.forEach(element => {
        if(element[fieldName]) names.push(element[fieldName])
    });
    return names
}



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

    // console.log(partition(personas, pers => pers.edad >= 60))
    // Devuelve:
    // [
    // [ {nombre: "Ricardo", edad: 63} ],
    // [ {nombre: "Paco", edad: 55}, {nombre: "Enrique", edad: 32},
    // {nombre: "Adrián", edad: 34}, {apellidos: "García", edad: 28 ]
    // ]

    function groupBy(array, x) {
        let ret = {}
        array.forEach(ele => {
            let vowel = x(ele) 
            if (ret[vowel]) ret[vowel].push(ele)
            else ret[vowel] = [ele]
            
        });
        return ret;
    }

    // let prueba = groupBy(["Mario", "Elvira", "María", "Estela", "Fernando"], str => str[0])
    // console.log(prueba)
    // Agrupamos por el primer carácter
    // Devuelve el objeto:
    // { "M" : ["Mario", "María"], "E" : ["Elvira", "Estela"], "F" : ["Fernando"] }

    let personas = [
        {nombre: "Ricardo", edad: 63},
        {nombre: "Paco", edad: 55},
        {nombre: "Enrique", edad: 32},
        {nombre: "Adrián", edad: 34},
        {apellido: "García", edad: 28}
    ];

    function where(array, modelo) {
        let ret = []
        array.forEach(ele => {
            let i = Object.keys(modelo).length - 1
            let valid = true
            while (i >= 0 && valid) {
                const attr = Object.keys(modelo)[i]; // "nombre"
                if(ele[attr]) { if(ele[attr] !== modelo[attr]) valid = false }
                else valid = false
                i--
            }
            if (valid ===true) ret.push(ele)
        })
        return ret;
    }
    let i = where(personas, { edad: 55 })
    // devuelve [ { nombre: 'Paco', edad: 55 } ]
    let i2 = where(personas, { nombre: "Adrián"})
    // devuelve [ { nombre: 'Adrián', edad: 34 } ]
    let i3 = where(personas, { nombre: "Adrián", edad: 21 })
    // devuelve []
    console.log(i2)