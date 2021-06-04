import React, { Component } from "react";
// composants import

import Header from "src/components/Header";
import Footer from "src/components/Footer";
import { newRecipe } from "../../services";

// style import
import "./style.css";
 
class CreateRecipe extends Component {
  // initial state of a recipe
  state = {
    name: "",
    image: "", 
    difficulty_id: 0,
    prepare_time: "",
    part_number: 0,
    cooking_time: "",
    description: "",
    part_type: "",
    category_id: 0,
    quantity: [],
  mesure_unit: [],
    label: [], // ingredient
    allergy_id: [],
    categories: [],
    share: false
  };

  onQuantity1 = (e) => {
    this.setState({
        quantity1 : e.target.value,
    }); 
  }; // quantity ingredient 1

  onLabel1 = (e) => {
    this.setState({
      label1: e.target.value,
    });
  }; // name ingredient 1

  onMesure_unit1 = (e) => {
    this.setState({
      mesure_unit1: e.target.value,
    });
  }; // mesure ingredient 1

  onQuantity2 = (e) => {

    this.setState({
        quantity2 : e.target.value,
    }); 
  }; // quantity ingredient 2

  onLabel2 = (e) => {
    this.setState({
      label2: e.target.value,
    });
  }; // name ingredient 2

  

  onMesure_unit2 = (e) => {
    this.setState({
      mesure_unit2: e.target.value,
    });
  }; // mesure ingredient 2


  onShare = (e) => {
    this.setState({
      share: e.target.value,
    });
  }; // share recipe

  


  onRecipeName = (e) => {
    this.setState({
      name: e.target.value,
    });
  }; // name of the recipe

onAddImage = (e) => {
    this.setState({
      image: e.target.value,
    });
  }; // image of the recipe

  onDifficulty = (e) => {
    this.setState({
      difficulty_id: e.target.value,
    });
  }; // difficulty of the recipe

  onPrepareTime = (e) => {
    this.setState({
      prepare_time: e.target.value,
    });
  }; // prepare time for the recipe

  onParts = (e) => {
    this.setState({
      part_number: e.target.value,
    });
  }; // number of parts

  onDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
  }; // description of the recipe

  onCookingTime = (e) => {
    this.setState({
      cooking_time: e.target.value,
    });
  }; // cooking time for the recipe

  onPartType = (e) => {
    this.setState({
      part_type: e.target.value,
    });
  }; // choose if its for person, quantity or unity

  onCategoryId = (e) => {
    this.setState({
      category_id: e.target.value,
    });
  }; // category of the recipe

  onallergyId = (e) => {
    this.setState({
      allergy_id: e.target.value,
    });
  }; // select allergy in recipe

  handleSubmit = async (e) => {
    e.preventDefault();
    //event with change when we submit form
    const data = {
      name: this.state.name,
      image: this.state.image,
      difficulty_id: this.state.difficulty_id,
      prepare_time: this.state.prepare_time,
      part_number: this.state.part_number,
      description: this.state.description,
      cooking_time: this.state.cooking_time,
      part_type: this.state.part_type,
      category_id: this.state.category_id,
      allergy_id: this.state.allergy_id,
      share: this.state.share,
      label: [this.state.label1, this.state.label2],
      mesure_unit: [this.state.mesure_unit1, this.state.mesure_unit2],
      quantity: [this.state.quantity1, this.state.quantity2]
    }; // when we click on valid button , the initial state change!
           
    console.log('data', data);
    //post in back what the user change then redirect to my recipes page
    try {
      const response = await newRecipe({ description: data.description, prepare_time: data.prepare_time, cooking_time: data.cooking_time, name: data.name, part_number: data.part_number, part_type: data.part_type, category_id: data.category_id, allergy_id: data.allergy_id, share: data.share, difficulty_id: data.difficulty_id, label: data.label, mesure_unit: data.mesure_unit, quantity: data.quantity});
      console.log(response);
      this.props.history.push('/user/recipes');
    }
    catch ({ response }) {
      console.log(response);
    }
  };

  render() {
    // = the visuel
    console.log("new recipe");


    return (
      <div className="recipe_container">
        <Header />
        <form onSubmit={this.handleSubmit}>
        <div className="recipe_form">
         <input className="recipe_name"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Nom de la recette"
                  value={this.state.name}
                  onChange={this.onRecipeName}
                  required
                />
     
     <div className="recipe_all_infos">
     <div className="recipe_info1">
              <input
                    type="number"
                    className="recipe_part"
                    value={this.state.part_number}
                    onChange={this.onParts}
                    required/>
                  
                  
                  <input
                    type="text"
                    className="recipe_type"
                    value={this.state.part_type}
                    onChange={this.onPartType}
                    placeholder="quantité / personnes / ect.."
                    required
                  /> </div>


<div className="recipe_info2">
<label className="recipe_p">Difficulté :</label>
                    <select className="recipe_select"
                      value={this.state.difficulty_id}
                      onChange={this.onDifficulty}
                    >
                      <option value="null"> </option>
                      <option value="1">Facile</option>
                      <option value="2">Moyen</option>
                      <option value="3">Difficile</option>
                    </select>

                    <label className="recipe_p">Categorie :</label>
                    <select className="recipe_select"
                      value={this.state.category_id}
                      onChange={this.onCategoryId}
                    >
                      <option value="null"> </option>
                      <option value="1">Entrée</option>
                      <option value="2">Plat</option>
                      <option value="3">Dessert</option>
                    </select></div>
                    
                  <div className="recipe_info3">  
                  <div className="md-form mx-5 my-5">
                  <label className="recipe_label">Temps de preparation :</label>
                  <input type="time" id="inputMDEx1" class="recipe_prepare_time" 
                  defaultValue="00:00"
                      type="time"
                      outputvalue={this.state.prepare_time}
                      onChange={this.onPrepareTime}
                   /> </div>          
                    
                    <div className="md-form mx-5 my-5">
                    <label className="recipe_label">Temps de cuisson :</label>
                   <input type="time" id="inputMDEx1"
                  defaultValue="00:00"
                      type="time"
                      class="recipe_cooking_time"
                      outputvalue={this.state.cooking_time}
                      onChange={this.onCookingTime}
                      required
                    /></div></div></div>

                    <div className="recipe_details">
                    <div className="recipe_ingredients">
                    <h1 className="recipe_h1">Liste des ingrédients</h1>
                    <div className="recipe_ingredient1"><input
                    type="number"
                    className="label_quantity"
                    value={this.state.quantity1}
                    onChange={this.onQuantity1}
                  />
                    <select
                    className="label_mesure"
                      value={this.state.mesure_unit1}
                      onChange={this.onMesure_unit1}
                    >
                      <option value="null">Mesure </option>
                      <option value="cl">cl</option>
                      <option value="gr">gr</option>
                      <option value="kilo">kilo</option>
                      <option value="litre">litre</option>
                      <option value="unité">unité</option>
                    </select> 

                    <input
                    type="text"
                    className="label_name"
                    value={this.state.label1}
                    onChange={this.onLabel1}
                  /></div>

                    <div className="recipe_ingredient2">                   
                    <input
                    type="number"
                    className="label_quantity"
                    value={this.state.quantity2}
                    onChange={this.onQuantity2}
                  />
                    <select
                    className="label_mesure"
                      value={this.state.mesure_unit2}
                      onChange={this.onMesure_unit2}
                    >
                      <option value="null">Mesure</option>
                      <option value="cl">cl</option>
                      <option value="gr">gr</option>
                      <option value="kilo">kilo</option>
                      <option value="litre">litre</option>
                      <option value="unité">unité</option>

                    </select>
                      <input
                    type="text"
                    className="label_name"
                    value={this.state.label2}
                    onChange={this.onLabel2}
                  /></div>
                   <div className="Create_recipe_validButton">
                    <button type="submit" className="recipe_button">Poster ma recette</button> 
                  </div>
                  </div>
            
<div className="recipe_description">
<h1 className="recipe_h1">Etapes (minimum 20 caractères)</h1>
                    <textarea
                      className="recipe_textarea"
                      rows="20" cols="80"
                      value={this.state.description}
    onChange={this.onDescription}>
                    </textarea>
                    

                   </div></div>
                 


          </div>
        </form>
        <Footer />
      </div>
    );
  }
}

export default CreateRecipe;
