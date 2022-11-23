import { authReducer, types } from "../../../src/auth";

describe('Puebas en authReducer', () => { 

    const initialState = {};

    test('debe de retornar el estado por defecto', () => { 

        const action = {}
        
        const newState = authReducer(initialState, action);
        expect( newState ).toBe( initialState )
     });

     test('debe de (login) llamar el login autenticar y establecer el user', () => { 

        const action = {
            type: types.login,
            payload: {id:'ABC', name: 'Carlos'},
        }

        const newState = authReducer(initialState, action);

        expect( newState.logged ).toBeTruthy();
        expect( newState.user.name ).toBe( 'Carlos');
        expect( newState ).toEqual({
            logged: true,
            user: action.payload
        })
      });

      test('debe de (logout) borrar el name del usuario y logged en false', () => { 
        
        const state = {
            logge: true,
            user: {id:'ABC', name: 'Carlos'},
        }

        const action = {
            type: types.logout,
        }

        const newState = authReducer(state, action);

        expect( newState.logged ).toBeFalsy();
        expect( newState.user ).toBe( undefined );
        expect( newState ).toEqual( { logged: false })
       })

      
 })