import React, { Component, useEffect } from "react";
// import React from 'react';
// import React from 'react';
import axios from "axios";
// composants import
import Header from "src/components/Header";
import Footer from "src/components/Footer";
import ValidButton from "src/components/ValidButton";
import UploadPic from "src/components/UploadPic";
import AddStep from "src/components/MyRecipes/CreateRecipe/CreateRecipeStep";
import { newRecipe } from "../../../services";
// import { withCookies, Cookies } from "react-cookie";
// style import
import "./style.scss";
import { Label } from "semantic-ui-react";

let counterIngredient = 1;

function addIngredient() {
  // element targeting and creation

  const RecipeIngredientLi = document.getElementById(
    "CreateRecipe_ingredient_li"
  );
  const ingredientContainer = document.createElement("div");
  const RecipeIngredientText = document.createElement("textarea");
  const remove = document.createElement("Button");
  const quantity = document.createElement("input");
  const unity = document.createElement("select");
  const unityOptiona = document.createElement("option");
  const unityOptionb = document.createElement("option");
  const unityOptionc = document.createElement("option");
  const divContainer = document.createElement("div");

  // we give a class to the button remove as well as an id to the div container

  remove.setAttribute("class", "delButton step" + counterIngredient);
  ingredientContainer.setAttribute(
    "id",
    "ingredientContainer" + counterIngredient
  );

  // we put Attribute in the text area
  RecipeIngredientText.setAttribute(
    "class",
    "CreateRecipe_ingredient CreateRecipe_ingredient" + counterIngredient
  );
  //  step.setAttribute('maxLength', '550');
  RecipeIngredientText.setAttribute("value", "{this.state.label}");
  RecipeIngredientText.setAttribute("onChange", "{this.onLabel}");

  // we put Attribute in the span
  divContainer.setAttribute("id", "divContainer" + counterIngredient);
  divContainer.setAttribute("class", "divContainer");

  // we put Attribute in the input quantity
  quantity.setAttribute("type", "number");
  quantity.setAttribute("class", "CreateRecipe_ingredient_quantity");
  RecipeIngredientText.setAttribute("value", "{this.state.quantity}");
  RecipeIngredientText.setAttribute("onChange", "{this.onQuantity}");

  // we put Attribute in the input unity
  unity.setAttribute("name", "unity");
  unity.setAttribute("id", "CreateRecipeIngredientUnity" + counterIngredient);
  unity.setAttribute("onChange", "Choix(event);");
  RecipeIngredientText.setAttribute("value", "{this.state.mesure_unit}");
  RecipeIngredientText.setAttribute("onChange", "{this.onMesureUnit}");

  // we put Attribute in the input option
  unityOptiona.setAttribute("value", "1");
  unityOptiona.setAttribute("class", "unit1");

  unityOptionb.setAttribute("value", "2");
  unityOptionb.setAttribute("class", "unit2");

  unityOptionc.setAttribute("value", "3");
  unityOptionc.setAttribute("class", "unit3");

  // we create a fragment of different text for each step and remove
  const textNode = document.createTextNode("ingrédient" + counterIngredient);
  RecipeIngredientText.appendChild(textNode);

  // we create a fragment of different text for each remove
  const textNodeRemove = document.createTextNode("suprimer");
  remove.appendChild(textNodeRemove);

  // we create a fragment of different text for each input select option
  const textNodeUnityOptiona = document.createTextNode("ml");
  unityOptiona.appendChild(textNodeUnityOptiona);

  const textNodeUnityOptionb = document.createTextNode("g");
  unityOptionb.appendChild(textNodeUnityOptionb);

  const textNodeUnityOptionc = document.createTextNode("kg");
  unityOptionc.appendChild(textNodeUnityOptionc);

  // we play and lego and we nest everything
  document
    .getElementById("CreateRecipe_ingredient_li")
    .appendChild(ingredientContainer);
  document
    .getElementById("ingredientContainer" + counterIngredient)
    .appendChild(divContainer);
  document
    .getElementById("divContainer" + counterIngredient)
    .appendChild(RecipeIngredientText);
  document
    .getElementById("divContainer" + counterIngredient)
    .appendChild(quantity);
  document
    .getElementById("divContainer" + counterIngredient)
    .appendChild(unity);
  document
    .getElementById("CreateRecipeIngredientUnity" + counterIngredient)
    .appendChild(unityOptiona);
  document
    .getElementById("CreateRecipeIngredientUnity" + counterIngredient)
    .appendChild(unityOptionb);
  document
    .getElementById("CreateRecipeIngredientUnity" + counterIngredient)
    .appendChild(unityOptionc);

  document
    .getElementById("ingredientContainer" + counterIngredient)
    .appendChild(remove);

  // remove step
  for (let index = 0; index < close.length; index += 1) {
    close[index].onclick = function ClickOnAClose() {
      const div = this.parentElement;
      div.style.display = "none";
    };
  }

  counterIngredient += 1;
}

class CreateRecipe extends Component {
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
    // user: this.props.cookies.get('user'),
  };

  /* initial state of form */
  onQuantity = (e) => {
    this.setState({
      quantity: e.target.value,
    });
  }; // focus on name quanity

  onShare = (e) => {
    this.setState({
      share: e.target.value,
    });
  };

  onMesureUnit = (e) => {
    this.setState({
      mesure_unit: e.target.value,
    });
  }; // focus on name mesure_unit

  onLabel = (e) => {
    this.setState({
      label: e.target.value,
    });
  }; // focus on name label/ ingredient

  onRecipeName = (e) => {
    this.setState({
      name: e.target.value,
    });
  }; // focus on name data

  onAddImage = (e) => {
    this.setState({
      image: e.target.value,
    });
  }; // focus on image data

  onDifficulty = (e) => {
    this.setState({
      difficulty_id: e.target.value,
    });
  }; // focus on difficult data

  onPrepareTime = (e) => {
    this.setState({
      prepare_time: e.target.value,
    });
  }; // focus on prepare_time data

  onParts = (e) => {
    this.setState({
      part_number: e.target.value,
    });
  }; // focus on part_number data

  onDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
  }; // focus on step data

  onCookingTime = (e) => {
    this.setState({
      cooking_time: e.target.value,
    });
  }; // focus on cooking_time data

  onPartType = (e) => {
    this.setState({
      part_type: e.target.value,
    });
  }; // focus on part_type data

  onCategoryId = (e) => {
    this.setState({
      category_id: e.target.value,
    });
  };

  onallergyId = (e) => {
    this.setState({
      allergy_id: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
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
      quantity: this.state.quantity,
      mesure_unit: this.state.mesure_unit,
      label: this.state.label,
      allergy_id: this.state.allergy_id,
      share: this.state.share
    }; // when we click on valid button , the initial state change

    const recipe = 'il y a une erreur sur l\'email ou le mot de passe';
    console.log('data', data);
    try {
      const response = await newRecipe({ description: data.description, prepare_time: data.prepare_time, cooking_time: data.cooking_time, name: data.name, part_number: data.part_number, part_type: data.part_type, category_id: data.category_id, quantity: data.quantity, mesure_unit: data.mesure_unit, label: data.label, allergy_id: data.allergy_id, share: data.share, difficulty_id: data.difficulty_id});
      console.log(response);
      this.props.history.push('/');
    }
    catch ({ response }) {
      console.log(response);
    }
  };

  render() {

    let counter = 0;
const addStep = () => {
  console.log("addStep")
  counter += 1;
  const click = {function(){this.parentElement.innerHTML=""}}
  const html = `
  <div id=stepContainer ${counter}>
    <textarea className=step-text className=step${counter} maxLength=550  >
      étape ${counter}
    </textarea>
    <button
      class=delButton step ${counter}
      onClick=${click}
    >
      suprimer
    </button>
  </div>`
  const target = document.getElementById("ContainerTextArea");
  console.log(`target`, target)
  target.innerHTML = html;
};
    // = the visuel
    /*
    const getCategories = () => {
      const categorie = [];
      axios
        .get("https://apicuisine.herokuapp.com/api/categories")
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            console.log("response.data[i]", response.data[i]);
            categorie.push(response.data[i]);
          }
          this.setState({ categories: categorie });
        });
    };
    useEffect(() => {
      getCategories();
    }, []);*/
    console.log("wlad help", this.state.categories);
    return (
      <div className="CreateRecipe_container">
        <Header />
        <form onSubmit={this.handleSubmit}>
          <div className="Create_recipe_pageContainer">
            <div className="CreateRecipe_page1_header">
              <div className="CreateRecipe_page1_header_left">
                <h1 className="form_Title">{this.state.categories[0]}</h1>
                <input
                  type="text"
                  className="inputForm"
                  id="name"
                  name="name"
                  placeholder="Nom de la recette"
                  value={this.state.name}
                  onChange={this.onRecipeName}
                  required
                />
              </div>
              <div className=" Create_recipepage_page1">
                <div className="cookingInfo_part">
                  <Label>Nombre de parts :</Label>
                  <input
                    type="number"
                    className="cookingInfo_part_input CreateRecipe_input inputCheck"
                    value={this.state.part_number}
                    onChange={this.onParts}
                    required
                  />
                  {/* why not put a maxLength */}
                  <Label>type :</Label>
                  <input
                    type="text"
                    className="cooking_part_input_type CreateRecipe_input "
                    value={this.state.part_type}
                    onChange={this.onPartType}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="CreateRecipe_Bottom">
              <div className="ingredientsListContainer">
                <div className="ingredientsList">
                  <div className="CreateRecipe_ingredients_container">
                    <div id="CreateRecipe_ingredient_li"></div>
                    <div>
                      <button
                        type="submit"
                        className="CreateRecipe_ingredient_Button"
                        onClick={addIngredient}
                      >
                        ajouter un ingredient
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="Create_recipepage_instructionContainer">
                <div className="Create_recipepage_instruction">
                  <div id="ContainerTextArea" ></div>
                  <div>
                    <textarea
                      className="TextAreaButton"
                      rows="20" cols="33"
                      //onClick= {() => addStep()}
                      value={this.state.description}
    onChange={this.onDescription}>
                    </textarea>
                  </div>
                  <div className="Create_recipe_validButton">
                    <ValidButton />
                  </div>
                </div>
              </div>
              <div className="cookingInfoContainer">
                <div className="cookingInfo">
                  <UploadPic
                    value={this.state.image}
                    onChange={this.onAddImage}
                  />
                  <div className="difficulty">
                    <label>Difficulté</label>
                    <select
                      value={this.state.difficulty_id}
                      onChange={this.onDifficulty}
                    >
                      <option value="1">Facile</option>
                      <option value="2">Moyen</option>
                      <option value="3">Difficile</option>
                    </select>
                    <label>Categorie</label>
                    <select
                      value={this.state.category_id}
                      onChange={this.onCategoryId}
                    >
                      <option value="1">Entrée</option>
                      <option value="2">Plat</option>
                      <option value="3">Dessert</option>
                    </select>
                  </div>
                  <div className="cookingInfo_time">
                    <Label>Temps de preparation:</Label>
                    <input
                      type="time"
                      className="cookingInfo_time_input CreateRecipe_input"
                      value={this.state.prepare_time}
                      onChange={this.onPrepareTime}
                      required
                    />
                  </div>
                  <div className="cookingInfo_time">
                    <Label>Temps de cuisson:</Label>
                    <input
                      type="time"
                      className="cookingInfo_time_input CreateRecipe_input"
                      value={this.state.cooking_time}
                      onChange={this.onCookingTime}
                      required
                    />
                  </div>
                        <label>Partager</label>
                  <select
                      value={this.state.share}
                      onChange={this.onShare}
                    >
                      <option value="true">Oui</option>
                      <option value="false">Non</option>
                    </select>
                </div>
              </div>
            </div>
          </div>
        </form>
        <Footer />
      </div>
    );
  }
}

export default CreateRecipe;
