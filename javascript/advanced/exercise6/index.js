
function mapFilter(array, f) {
    return array.map(f).filter(ele => ele !== undefined )
}


console.log(mapFilter(["23", "44", "das", "555", "21"], (str) => {
    let num = Number(str);
    if (!isNaN(num)) return num;
}))
// Devuelve: [23, 44, 555, 21]
