// import dependencies

import React, { Component } from 'react';
import axios from 'axios';
import 'src/components/ShoppingList/index.scss';
import 'semantic-ui-css/semantic.min.css';

// Necessary for cookies management
axios.defaults.withCredentials = true;

// import local component
import Header from '../Header';
import Footer from '../Footer';

// Drop list for refresh
function drop(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

// Append items list
async function ShowItemsList(itemName, itemId) {

  try {

    const ligne = document.createElement('li');
    const itemText = document.createTextNode(itemName);
    ligne.appendChild(itemText);

    document.getElementById('myUL').appendChild(ligne);
  
    const spanElement = document.createElement('span');
    spanElement.setAttribute("id", itemId);
    const txt = document.createTextNode('\u00D7');
    spanElement.className = 'close';
    spanElement.appendChild(txt);

    spanElement.onclick = async function dropItem() {
         
      // Delete item from list
      await deleteItem(itemId);
      // hide deleted element
      const parent = spanElement.parentElement;
      parent.style.display = 'none';    

    };

    ligne.appendChild(spanElement);
    
  }catch (error) {
    console.log(error);
  }

}


let myList; // set an empty list first

// Get user's grocery list Data
async function getList () {

  try {
      
    const response = await axios.get(`https://apicuisine.herokuapp.com/api/grocery`);

    myList = response.data[0]; // Set the list
  
    //! New user not have an empty list (response.data[0].items) is an Array
    //! User who have an existant list  (response.data[0].items) is an simple object

    // Array -> Empty data, skip for loop & set attribute
    // Object -> Get list of items
    if (Array.isArray(response.data[0].items)) {
      
      console.log("response.data[0].items est un Array", );

      // Don't have any item in list
      // Set id to Mylist if not exist
      console.log("myList.",myList);
      myList.list_id = response.data[0].list_id;
      
    }else { 
    console.log("je passe par le else de getList");
    // Check key(name) & value(id) of each item
    for  (let [name, id] of Object.entries(myList.items)) {
      console.log(`${name}: ${id}`);
      // Show the Items List
      await ShowItemsList(name, id);
      }
    }

  }catch (error) {
    console.log(error);
  }
}

//*----------------------------------
//* Add a new item
//*-----------------------------------
const newItem = {};

// Add a New item to user's list
async function AddItem ()  {

  const inputValue = document.getElementById('myInput').value;
  if (inputValue === '') {
       alert('Vous devez écrire quelque chose!'); //! mettre une modal

  }

  const container = document.querySelector('#myUL');
  // Drop list item
  drop(container);

  try {
    const addItem = await axios.post(`https://apicuisine.herokuapp.com/api/add-items/grocery/${myList.list_id}`, newItem);
    console.log("Items", addItem.data);

    // Clear the input value
    document.getElementById('myInput').value = '';
    // Get updating list
    await getList();

  }catch (error) {
    console.log(error);
  }
};

async function deleteItem (itemId)  {

  try {

    const res = await axios.delete(`https://apicuisine.herokuapp.com/api/item/del/${itemId}`, { itemId });
    //console.log("delete res.data.json id -> ",res.data.json); 
 
  }catch (error) {
    console.log(error);
  }
};



class ShoppingList extends Component {
  state = {
    add: '',
  };

  onAddChange = (e)  => {
    this.setState({
      add: e.target.value,
    });
    newItem.name = e.target.value; // Set new item value
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      add: this.state.add,
    };   
  };

  componentDidMount() {
    // Mount list on first load
    getList();
  }

  render() {
    
    return (
      <div className="PageshoppingList">
        <div className="shoppingHeader">
          <Header />
          <form className="ToDoListContainer" onSubmit={this.handleSubmit}>
            <div id="myDIV" className="ToDoListHeader">
              <h2>Ma liste de course</h2>
              <input
                id="myInput"
                type="text"
                placeholder="Saisir un article..."
                value={this.state.add}
                onChange={this.onAddChange}
                required
              />
              <span onClick={AddItem} className="addBtn">Ajouter à ma liste</span>
            </div>
            <div>
              <ul id="myUL" />
            </div>
          </form>
        </div>
        <Footer />
        
      </div>
    );
  };
};
export default ShoppingList;
