import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { PrivateRoute } from "../../src/router/PrivateRoute";

describe('Pruebas en <PrivateRoute />', () => { 

    test('debe de mostrar el children si esta autenticado', () => { 

        Storage.prototype.setItem = jest.fn();

        const contextValue = {
            logged: true,
            user: {
                id: 'Asb124',
                name: 'Kjetil'
            }
        }
         
        render( 
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/marvel']}>

                    <Routes>
                        <Route path="marvel" element={
                            <PrivateRoute>
                                <h1>Private Route</h1>
                            </PrivateRoute>
                        }/>
                        <Route path="/login" element={ <h1>Login Route</h1>}/>
                    </Routes>


                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect( screen.getByText('Private Route')).toBeTruthy();
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/marvel')
     });

 })