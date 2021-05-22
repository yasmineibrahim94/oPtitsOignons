import axios from 'axios';
import React, { Component, useEffect } from 'react';
axios.defaults.withCredentials = true;

const axiosRequest = {

/**
 * find all categories
 */
getCategories :async () => {
    const categorie = [];

    const response = await axios.get('https://apicuisine.herokuapp.com/api/categories')

    for (let i = 0; i < response.data.length; i++) {
        ategorie.push(response.data[i]);
    }
    return categorie;
},

/**
 * find all difficulty
 */
getDifficulty:async () => {
    const difficulty = [];

    const response = await axios.get('https://apicuisine.herokuapp.com/api/difficulty')
    

    for (let i = 0; i < response.data.length; i++) {
        difficulty.push(response.data[i]);
    }
    
    return difficulty;
},

/**
 * find all allergies
 */
getAllergies:async () => {
    const allergies = [];

    const response = await axios.get('https://apicuisine.herokuapp.com/api/allergies')

    for (let i = 0; i < response.data.length; i++) {
        allergies.push(response.data[i]);
    }

    return allergies;
},

/**
 * send the new user's recipe
 * @param {object} data.theRecipe - the user's recipe 
 * 
 * !!! label , mesure_unit , allergy_id , quantity , must be an array .
 */
sendRecipe: async  (theRecipe) => {

    const data = {
        name : theRecipe.name,
        prepare_time : theRecipe.prepare_time,
        cooking_time : theRecipe.cooking_time,
        image : theRecipe.image,
        part_number : theRecipe.part_number,
        part_type : theRecipe.part_type,
        share : theRecipe.share,
        category_id : theRecipe.category_id,
        description : theRecipe.description,
        difficulty_id : theRecipe.difficulty_id,
        label :  [...theRecipe.label],
        mesure_unit :  [...theRecipe.mesure_unit],
        allergy_id :  [...theRecipe.allergy_id],
        quantity :  [...theRecipe.quantity],
};

    const response = await axios.post('https://apicuisine.herokuapp.com/api/user/newrecipe', JSON.stringify(data));
    return response;
}
}

export default axiosRequest;