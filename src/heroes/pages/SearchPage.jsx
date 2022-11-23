import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string"// install with yarn add........

import { useForm } from "../../hooks/useForm"
import { HeroCard } from "../components"
import { getHeroByName } from "../helpers";

export const SearchPage = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { q = ''} = queryString.parse( location.search );

  const heroes = getHeroByName( q );

  const showSearch = (q.length === 0);
  const showError = heroes.length === 0 && q.length >= 1;
  
  const {searchText, onInputChange } = useForm({
    searchText: q,
  });

  const onSearchSubmit = ( event ) => {
    event.preventDefault();

    // if( searchText.trim().length <= 1 )return;
    
    navigate(`?q=${ searchText }`);

    }

  return (
    <>
      <h1>Search</h1>
      <hr />
      
      <div className="row">
        <div className="col-5">
          <form
            role={'form'} 
            onSubmit={ onSearchSubmit } >
            <input 
              type="text"
              placeholder="Search a hero"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={ searchText }
              onChange={ onInputChange }
            />

            <button className="btn btn-outline-primary mt-1">
              Search
            </button>
          </form>
        </div>

        <div className="col-7">
          <h4>Results</h4>
          <hr />

          {/* {
            (q === '')
            ? <div className="alert alert-primary"> Search a hero </div>
            : ( heroes.length === 0 ) && <div className="alert alert-danger">No hero with <b>{ q }</b> </div>
          } */}

          {/* <div className="alert alert-primary" style={{ display: q === '' ? '' : 'none'}}> 
            Search a hero 
          </div>

          <div className="alert alert-danger" style={{ display: heroes.length === 0 && q !== '' ? '' : 'none'}}>
            No hero with <b>{ q }</b> 
          </div> */}

          <div 
            data-testid="divSearch"
            className="alert alert-primary animate__animated animate__fadeIn" 
            style={{ display: showSearch ? '' : 'none'}}> 
            Search a hero 
          </div>

          <div 
            data-testid="divError"
            className="alert alert-danger animate__animated animate__fadeIn" 
            style={{ display: showError ? '' : 'none'}}>
            No hero with <b>{ q }</b> 
          </div>


          { heroes.map( hero => (
            <HeroCard key={ hero.id} {...hero}/> 
          ))}
        </div>
      </div>
    </>
  )
}
