

function concatenar() {
    let finalString = ""
    for (let i = 1; i < arguments.length; i++) {
        finalString = finalString.concat(arguments[i], arguments[0])
    }
    return finalString
}


console.log(concatenar()) // Devuelve la cadena vacía
console.log(concatenar("-")) // Devuelve la cadena vacía
console.log(concatenar("-","uno")) // Devuelve “uno-”
console.log(concatenar("-","uno","dos","tres")) // Devuelve “uno-dos-tres-”

let paco = {[2,4],[[],[]]}
