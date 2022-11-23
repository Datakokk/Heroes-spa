import { render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../src/auth"
import { PublicRoute } from "../../src/router/PublicRoute"

describe('Pruebas en <PublicRoute />', () => { 

    test('debe de mostrar el children si no esta autenticado', () => { 
         
        render( 
            <AuthContext.Provider value={{logged: false}}>
                <PublicRoute>
                    <h1>Route Public</h1>
                </PublicRoute>
            </AuthContext.Provider>
        );
        expect( screen.getByText('Route Public')).toBeTruthy();
     });

     test('debe de navegar si esta autenticado', () => { 

        const contextValue = {
            logged: true, 
            user: {
                id: "ABC",
                name: "Carlos",
            }
        }

        render( 
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/login']}>
                    
                    <Routes>
                        <Route path="login" element={
                            <PublicRoute>
                                <h1>Route Public</h1>
                            </PublicRoute>
                        }/>
                        <Route path="marvel" element={<h1>Pagina Marvel</h1>} />
                    </Routes>

                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( screen.getByText('Pagina Marvel')).toBeTruthy();

      });
 })