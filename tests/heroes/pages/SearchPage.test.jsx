import { fireEvent, getByRole, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { SearchPage } from "../../../src/heroes/pages/SearchPage"

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}))

describe('Pruebas en <SearchPage />', () => { 

    test('debe de mostrar correctamente con valores por defecto', () => { 

        const { container  } = render(
                        <MemoryRouter>
                            <SearchPage />
                        </MemoryRouter>
        );

        expect( container ).toMatchSnapshot();
     })

     test('debe de mostrar a Batman y el input con el valor del queryString', () => { 

        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        );
        
        const input = screen.getByRole('textbox');
        expect( input.value ).toBe( 'batman' );

        const img = screen.getByRole('img');
        expect( img.src ).toContain('/assets/heroes/dc-batman.jpg');

        const divSearch = screen.getByTestId('divSearch');
        expect( divSearch.style.display).toBe('none')
    })

    test('debe de mostrar un error si no encuentra el hero (batman123)', () => { 

        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        );
        
        const divError = screen.getByTestId('divError');
        expect( divError.style.display ).toBeFalsy();

    });

    test('debe de llamar el navigate a la pantalla nueva', () => { 

        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        const form = screen.getByRole('form');

        fireEvent.input( input, {target: {value: 'thor'}});
        //fireEvent.change( input, {target: {name: 'searchText', value: 'thor'}})
        fireEvent.submit( form );

        expect( mockedUseNavigate ).toHaveBeenCalledWith(`?q=${input.value}`);
     })
 })

 