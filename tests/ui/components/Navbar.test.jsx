import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../src/auth";
import { Navbar } from "../../../src/ui/components/Navbar";

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}));

describe('Pruebas en <Navbar />', () => { 

    const contextValue = {
        logged: true,
        user: {
            id: 'ABC',
            name: 'Carlos Calvo'
        },
        logout: jest.fn()
    }

    beforeEach( () => jest.clearAllMocks() );

    test('debe de mostrar el nombre del usuario', () => { 

        render(
        <AuthContext.Provider value={ contextValue } >
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        </AuthContext.Provider>
        )
        expect( screen.getByText( 'Carlos Calvo' )).toBeTruthy();

     });
     

     test('debe de llamar el logout y navigate cuando de hace click en el boton', () => { 

        render(
            <AuthContext.Provider value={ contextValue } >
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
            )
        const btnLogout = screen.getByRole('button');
        fireEvent.click( btnLogout )
        expect( contextValue.logout ).toHaveBeenCalled();
        expect( mockedUseNavigate ).toHaveBeenCalledWith("/login", {"replace": true})
      });
 })