import React, { Component, useEffect } from "react";


class Ingredient2 extends Component {
  state = {
    quantity2: 0,
    mesure_unit2: [],
    label2: [], // ingredient
  };

  /* initial state of form */
  onQuantity2 = (e) => {
    this.setState({
        quantity2 : e.target.value,
    }); 
  }; // focus on name quanity

  onLabel2 = (e) => {
    this.setState({
      label2: e.target.value,
    });
  }; // focus on name label/ ingredient

  onMesure_unit2 = (e) => {
    this.setState({
      mesure_unit2: e.target.value,
    });
  }; 

/*   handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = {
      quantity: this.state.quantity2,
     mesure_unit: this.state.mesure_unit2,
      label: this.state.label2,
    }; // when we click on valid button , the initial state change

    console.log('data', data);
    try {
      const response = await newRecipe({ quantity: data.quantity2, mesure_unit: data.mesure_unit2, label: data.label2, });
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
                    value={this.state.quantity2}
                    onChange={this.onQuantity2}
                    required
                  />
                    <input
                    type="text"
                    className="cCreateRecipe_ingredient_Button"
                    value={this.state.label2}
                    onChange={this.onLabel2}
                    required
                  />
                   <label>Mesure</label>
                    <select
                      value={this.state.mesure_unit2}
                      onChange={this.onMesure_unit2}
                    >
                      <option value="1">ML</option>
                      <option value="2">Gr</option>
                      <option value="3">Kilo</option>
                    </select>
                    
      </div>
    );
  }
}

export default Ingredient2;
