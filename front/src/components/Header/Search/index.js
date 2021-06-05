import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

// composants import
import Header from '..';
import Footer from '../../Footer';

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
  }, []); // get all the recipe in an array

  useEffect(() => {
    setFilteredRecipes(
      recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(search.toLowerCase()),
        //filtered even if its in lower or uppercase

      )
    );
  }, [search, recipes]);

  if (loading) {
    return <p>Nous recherchons une recette pour vous</p>;
  }

   // = the visuel
    return (
      
      <div className="loginForm_container">
        <Header />
        <div className="login_loginForm">
          <input
        type="text"
        className="loginForm_pseudo"
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
     
     <p className="p_search">{name}</p>
    </>
  );
};


export default Search;
