"use strict"
function sequence1 (a, x) {
    a.forEach(ele => {
        x = ele(x)
    });
    return x;
}

function sequence2 (a, x) {
    for (let i = 0; i < a.length; i++) {
        x = a[i](x);
        if(x ===undefined) return x;
    }
    return x;
}

function sequence3 (a, x, right=false) {
    if(right ===true){
        for (let i = a.length -1; i >= 0; i--) {
            x = a[i](x);
            if(x ===undefined) return x;
        }
        return x;
    }
    else{
        return sequence2(a,x);
    }
}



const f1 = (x) => {
    return ++x
}
const f2 = (x) => {
    return 2*x;
}
const f3 = (x) => {
    return x**2;
}

console.log(sequence3([f1,f2,f3],3))