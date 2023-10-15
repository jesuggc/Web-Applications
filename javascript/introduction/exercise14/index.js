function createObject(properties,values) {
    let newObject = {};
    for (let i = 0; i < properties.length; i++) {
        newObject[properties[i]] = values[i];
    }
    return newObject;
}

let properties = ["nombre", "apellido1", "apellido2"];
let values = ["Marcos", "Salgado", "Vizcaino"];
let newObj = createObject(properties, values);
console.log(newObj);