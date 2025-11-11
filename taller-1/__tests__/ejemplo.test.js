// importaciones
import { suma } from "../src/utils/ejemplo.js";



// desarrollo



// bloques de prueba (agrupa por metodo) -> describe

describe("probar funcion suma",()=>{

    //definimos los casos individuales
    it("caso 1 : suma de numeros positivos",()=>{
        expect(suma(2,3)).toBe(5);
    });

    it("caso 2 : suma numero con cero",()=>{
        expect(suma(7,0)).toBe(7);
    });

    it("caso 3 : suma numeros negativos",()=>{
        expect(suma(-3,-3)).toBe(-6);
    })

});