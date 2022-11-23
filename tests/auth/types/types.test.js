import { types } from "../../../src/auth"

describe('Pruebas en "Types.js"', () => { 

    test('debe de regresar estos types', () => { 

        expect( types ).toEqual({
            login : '[Auth] login', 
            logout: '[Auth] logout'
        })
     })
 })