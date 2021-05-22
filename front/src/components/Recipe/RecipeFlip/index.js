import React from 'react';
import axios from 'axios';
import { withRouter } from "react-router";


// book import
import HTMLFlipBook from 'react-pageflip';

// composants import
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
// import RecipeFetch from '../RecipeFetch'; // fetch en attente
// style import
import 'src/components/Recipe/index.scss';

// basic cover
const PageCover = React.forwardRef((props, ref) => (
  <div className="page page-cover" ref={ref} data-density="hard">
    <div className="page-content">
      <h2>{props.children}</h2>
    </div>
  </div>
));

// basic page
const Page = React.forwardRef((props, ref) => (
  <div className="page" ref={ref}>
    <div className="page-content">
      <div className="page-image" />
      <div className="page-text">{props.children}</div>
      <div className="page-footer">{props.number + 1}</div>
    </div>
  </div>
));


// page with changes
class RecipeFlip extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id : this.props.match.params.id,
      page: 0,
      totalPage: 0,
      recipe: [],
      category: this.props.match.params.category
      
    };
  }

  getIngredients() {

    const qty = this.state.recipe.quantity;
    const mesures = this.state.recipe.mesure_unit;
    const ingredients = this.state.recipe.ingredient;

    let ingredientsList = ingredients.map(function(name, index){

      return <li key={ index }>{qty[index]} {mesures[index]} {name}</li>;

    })
    this.setState({
      ing: ingredientsList

    })           
    
  }

  async componentDidMount() {
    

    try { // Simple GET request using axios
      const response = await axios.get(`https://apicuisine.herokuapp.com/api/recipe/${this.props.match.params.id}`);
      this.setState({ recipe : response.data });
    
      //? Prevoir la recupération du pseudo du proprietaire de la recette avec link vers ces recettes
      //! BDD -> voir quelle route et si fonctionelle

    this.getIngredients();

    }catch (error) {
      console.log(error);
    }
  }
 
  /**
     * ! ne pas toucher source du souci des ombres
     */
  /* onPage = (e) => {
        this.setState({
            page: e.data,
        });

    };
    componentDidMount() {
        this.setState({<div className="MyRecipe"><Link to="/recipe/{id}" type="button" className="linkMyRecipe">nom de la recette recette</Link></div>
            totalPage: this.flipBook.getPageFlip().getPageCount()
        });
    } */

  render() {
   //const {recipe} = this.state;
     // console.log(recipe);

        //! Voir pour améliorer le return et conditions si la recette n'existe pas...

        //TODO  Prévoir l'affichage des alergènes
        //TODO  Prévoir l'affichage des reviews

    return (
      <div className="myRecipe_container">
      <div className="Recette_container">
        <Header />


        <div className="Recette_flip_container">


          <HTMLFlipBook
            width={550}
            height={700}
            minWidth={315}
            maxWidth={1000}
            minHeight={400}
            maxHeight={1533}
            drawShadow
            disableFlipByClick // désactivation au click sur la page
            maxShadowOpacity={0.5}
            showCover
            mobileScrollSupport
            onFlip={this.onPage}
            onChangeOrientation={this.onChangeOrientation}
            onChangeState={this.onChangeState}
            className="flip-book"
            ref={(el) => (this.flipBook = el)}
          >

            <PageCover>{this.state.recipe.name}</PageCover>
  
              <Page number={1}>
                <h2 className="Recipe_title">{this.state.recipe.name}</h2>
                <div className="Recipe_header">
                  
                  <div className="Recipe_image"> <img src={this.state.recipe.image} alt="img" /></div>
                  <div className="Recipe_part_time_difficult">
                    <ul>
                      <li><span className="Recipe_time">Temps de préparation : {this.state.recipe.prepare_time}</span></li>
                      <li><span className="Recipe_time">Temps de cuisson : {this.state.recipe.cooking_time}</span></li>
                      <li><span className="Recipe_part">Pour : {this.state.recipe.part_number} {this.state.recipe.part_type}</span></li>
                      <li><span >Difficulté : {this.state.recipe.difficulty}</span></li>
                      <li><div class="ui label"><i aria-hidden="true" class="dont icon" ></i>Allergènes : {this.state.recipe.allergie}</div></li>                   
                  </ul>
                  </div>
                </div>
                <div className="Recipe_ingredientsList"><ul>{this.state.ing}</ul></div>

                

              </Page>
              <Page number={2}>
                <div className="Detail_Recipe_step">
                <div dangerouslySetInnerHTML={{__html: this.state.recipe.description}} />                
                </div>
              </Page>
             

            <PageCover>Bonne dégustation</PageCover>

          </HTMLFlipBook>
        </div>
        <Footer />
      </div></div>

    );
  }
}

export default withRouter(RecipeFlip);
