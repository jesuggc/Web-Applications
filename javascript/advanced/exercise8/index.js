class Figura {
    constructor (x, y, color) {
        this.x = x
        this.y = y
        this.color = color
    }


    esBlanca() { 
        return (this.color ==="#FFFFFF")
    }
    
    pintar() {
        console.log(`Nos movemos a la posicion (${this.x},${this.y})`)
        console.log(`Cogemos la pintura de color ${this.color}`)
    }
}

class Elipse extends Figura {
    constructor (x, y, color, rh, rv) {
        super(x,y,color)
        this.rh = rh
        this.rv = rv
    }
    pintar(){
        super.pintar()
        console.log(`Pintamos elipse de radios ${this.rh} y ${this.rv}`)
    }
}

class Circulo extends Elipse {
    constructor (x,y,color,r) {
        super(x,y,color,r,r)
    }
}

let x = new Figura(2,3,"#FFFFFF")
let y = new Elipse(2,1,"#F011FF",10,11)
let z = new Circulo(2,1,"#00FF00",16)
console.log("Figura:")
x.pintar()
console.log("¿Es blanca?" , x.esBlanca())
console.log("Elipse:")
y.pintar()
console.log("¿Es blanca?" , y.esBlanca())
console.log("Circulo:")
z.pintar()
console.log("¿Es blanca?" , z.esBlanca())