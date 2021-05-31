import React from 'react';
import axios from 'axios';
import { withRouter } from "react-router";

// book import
import HTMLFlipBook from 'react-pageflip';

// composants import
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';

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
class RecipeFlipResponsiv extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id : this.props.match.params.id,
      page: 0,
      totalPage: 0,
      recipe: [],

    };
  }

  async componentDidMount() {
    // Simple GET request using axios

    try {
      const response = await axios.get(`https://apicuisine.herokuapp.com/api/recipe/${this.props.match.params.id}`);
      this.setState({ recipe : response.data });
    
    }catch (error) {
      console.log(error);
    }
  }

  render() {const {recipe} = this.state;
  console.log(recipe);

    return (
      <div className="Recette_container">
        <Header />
        <div className="Recette_flip_container">
          <HTMLFlipBook
            width={350}
            height={500}
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

            <PageCover>{recipe.name}</PageCover>
  
            <Page number={1}>
                <h2 className="Recipe_title">{recipe.name}</h2>
                <div className="Recipe_header">
                  
                  <div className="Recipe_image"> <img src={recipe.image} alt="img" /></div>
                  <div className="Recipe_part_time_difficult">
                    <ul>
                      <li><span className="Recipe_time">Temps de préparation : {recipe.prepare_time}</span></li>
                      <li><span className="Recipe_time">Temps de cuisson : {recipe.cooking_time}</span></li>
                      <li><span className="Recipe_part">Pour : {recipe.part_number} {recipe.part_type}</span></li>
                      <li><span >Difficulté : {recipe.difficulty}</span></li>
                      <li><div class="ui label"><i aria-hidden="true" class="dont icon" ></i>Allergènes : {recipe.allergie}</div></li>                   
                  </ul>
                  </div>
                </div>
                <div className="Recipe_ingredientsList"
                dangerouslySetInnerHTML={{__html: recipe.ingredient}} />            
              </Page>
              <Page number={2}>
                <div className="Detail_Recipe_step">
                <div dangerouslySetInnerHTML={{__html: recipe.description}} />                
                </div>
              </Page>

            <PageCover>Bonne dégustation</PageCover>

          </HTMLFlipBook>
        </div>
        <Footer />
      </div>

    );
  }
}

export default withRouter(RecipeFlipResponsiv);
