function interpretarColor(hex) {
    let start = hex[0], end = hex[7]
    if (start !== "#" || end !== undefined) return null
    let r = parseInt(hex[1]+hex[2], 16)
    let g = parseInt(hex[3]+hex[4], 16)
    let b = parseInt(hex[5]+hex[6], 16)
    return {"R": r,"G":g, "B": b}
}
// parseInt("AA", 16);
let color = "#FF0023"
console.log(interpretarColor(color))