import React, { Component, useEffect } from "react";


class Ingredient1 extends Component {
  state = {
    quantity1: 0,
    mesure_unit1: [],
    label1: [], // ingredient
  };

  /* initial state of form */
  onQuantity1 = (e) => {
    this.setState({
        quantity1 : e.target.value,
    }); 
  }; // focus on name quanity

  onLabel1 = (e) => {
    this.setState({
      label1: e.target.value,
    });
  }; // focus on name label/ ingredient

  onMesure_unit1 = (e) => {
    this.setState({
      mesure_unit1: e.target.value,
    });
  }; 

   /* handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = {
      quantity: this.state.quantity1,
     mesure_unit: this.state.mesure_unit1,
      label: this.state.label1,
    }; // when we click on valid button , the initial state change

    console.log('data', data);
    try {
      const response = await newRecipe({ quantity: data.quantity1, mesure_unit: data.mesure_unit1, label: data.label1, });
      console.log(response);
    }
    catch ({ response }) {
      console.log(response);
    }
  };  */

  render() {
    // = the visuel
    

    console.log("new recipe");
    return (
                    <div>
                    <input
                    type="number"
                    className="cCreateRecipe_ingredient_Button"
                    value={this.state.quantity1}
                    onChange={this.onQuantity1}
                    required
                  />
                    <input
                    type="text"
                    className="cCreateRecipe_ingredient_Button"
                    value={this.state.label1}
                    onChange={this.onLabel1}
                    required
                  />
                   <label>Mesure</label>
                    <select
                      value={this.state.mesure_unit1}
                      onChange={this.onMesure_unit1}
                    >
                      <option value="1">ML</option>
                      <option value="2">Gr</option>
                      <option value="3">Kilo</option>
                    </select>
                    
      </div>
    );
  }
}

export default Ingredient1;
