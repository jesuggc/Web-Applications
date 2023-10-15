let x = 9
// let x = [1,2]
let y = 3

console.log(x instanceof Number)
function producto(x,y) {
    if (x instanceof Number && y instanceof Number) return x*y
    if (x instanceof Array && y instanceof Array && x.length) return 0;
    return 0
}
console.log(producto(x,y))