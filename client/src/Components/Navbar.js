import React, { useState } from "react";
import { NavLink, useParams,useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {searchActions} from '../store/search-Slice';
export default function () {
  const {home} = useParams('');
  const location = useLocation();
  const [input,setInput] = useState('');  
  const dispatch = useDispatch();
  const searchFilter = useSelector(state => state.crud.search);
  console.log(searchFilter);
  
  const handleChange =(e) =>{
    const{name,value} = e.target;
    e.preventDefault();
    dispatch(searchActions.addtoCart(value))
  }
  const handleSubmit  = (e) => {
    e.preventDefault();
  }
  return (
    <header>
      <nav class="navbar bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand">Navbar</a>
          <NavLink to='/'>Home</NavLink>
          <form class="d-flex" role="search">
            
          { location.pathname === '/' && ( <><input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => handleChange(e)}
          /> <button class="btn btn-outline-success" type="submit" onClick={handleSubmit}>
          Search
        </button></>)
          }
          </form>
        </div>
      </nav>
    </header>
  );
}
