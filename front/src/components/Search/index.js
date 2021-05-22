import React, { useState, useEffect } from "react";
//import ReactDOM from "react-dom";
import axios from 'axios';
import { Link } from 'react-router-dom';

// composants import
import Header from '../Header';
import Footer from '../Footer';
//import Checkbox from '../Checkbox';

// style import
import './style.scss';

function Search() {
  /* initial state of form */
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://apicuisine.herokuapp.com/api/recipes")
      .then((res) => {
        setRecipes(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setFilteredRecipes(
      recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(search.toLowerCase()),
        //recipe.name.includes(setSearch) 

      )
    );
  }, [search, recipes]);

  if (loading) {
    return <p>Nous recherchons une recette pour vous</p>;
  }


// setSearch(e.target.getElementsByClassName('filtreSearch').style.visibility = 'visible')
   // = the visuel
    return (
      
      <div className="Search_container">
        <Header />
          <div className="search_searchForm">
          <input
        type="text"
        className="searchForm_search"
        placeholder="Rechercher une recette"
        onChange={(e) => {

          setSearch(e.target.value);
          if (e.target.value.length > 0){
          document.querySelector('.filtreSearch').removeAttribute("id")
        } else {
          document.querySelector('.filtreSearch').setAttribute("id", "visible")
        }}}
      />
      <div id="visible" className="filtreSearch">{filteredRecipes.map((recipe, idx) => (<Link to={`/recipe/${recipe.id}`} className="link">
        <RecipeDetail classname="filtreSearchDetail" key={idx} {...recipe} /></Link>))}</div>
          </div>
        <Footer />
      </div>

    );
  }

  const RecipeDetail = (props) => {
  const { name} = props;

  return (
    <>
     
     <p>{name}</p>
    </>
  );
};


export default Search;
