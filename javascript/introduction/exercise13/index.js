function createObject(properties) {
    let newObject = {};
    for (let i = 0; i < properties.length; i++) {
        newObject[properties[i]] = "";
    }
    return newObject;
}

let properties = ["nombre", "apellido1", "apellido2"];
let newObj = createObject(properties);
console.log(newObj);
