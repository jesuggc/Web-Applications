function primitiveOrObject(x) {
    if (typeof(x) === "object") return "Object"
    return "Primitive - " + typeof(x)
}
let a = {
    b : 3,
    c : 2
}
console.log(primitiveOrObject(a))