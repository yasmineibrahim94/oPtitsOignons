import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// book import
import HTMLFlipBook from 'react-pageflip';

// composants import
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';

axios.defaults.withCredentials = true;

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
class MyRecipesFlipResponsiv extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      totalPage: 0,
recipe: []
    };
  }

  componentDidMount() {
    // Simple GET request using axios
    axios.get('https://apicuisine.herokuapp.com/api/recipes/user')
      .then((response) => {
        this.setState({ recipe: response.data });
      });
     }

  render() {const data = this.state;
    console.log(data);
    return (
      <div>
        <Header />

        <div className="createMyRecipe"><Link to="/user/new-recipe" type="button" className="linkMyRecipe">Créer ma recette<i className="pencil alternate icon"></i></Link></div>

        <HTMLFlipBook
          width={315}
          height={400}
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

          <PageCover>Les recettes de user.name</PageCover>

          <Page number={1}>
          <div>
      
      <h4 className="page-header">Mes recettes</h4>
      <div className="page" ref={this.ref}>
      {data.recipe.slice(0,2).map((data) => (

          <Link to={`/recipe/${data.id}`}>

          <div className="recipe-content">
            <div className="info-recipe">
              <h5 className="page-title">{data.name}</h5>
              <div className="page-infos"> <p>Temps de préparation : {data.prepare_time} </p>
              <p>Temps de cuisson : {data.cooking_time} </p>
              <p>Pour {data.part_number} {data.part_type}</p>  
              </div>                         
              <div className="image-recipe"><img src={data.image} className="imgRecipe"/></div>
            </div>

</div>
          </Link>))}

      </div>
    </div>
          </Page>


          <Page number={2}>
          <div>
      
      <h4 className="page-header">Mes recettes</h4>
      <div className="page" ref={this.ref}>
      {data.recipe.slice(2,4).map((data) => (

          <Link to={`/recipe/${data.id}`}>

          <div className="recipe-content">
            <div className="info-recipe">
              <h5 className="page-title">{data.name}</h5>
              <div className="page-infos"> <p>Temps de préparation : {data.prepare_time} </p>
              <p>Temps de cuisson : {data.cooking_time} </p>
              <p>Pour {data.part_number} {data.part_type}</p>  
              </div>                         
              <div className="image-recipe"><img src={data.image} className="imgRecipe"/></div>
            </div>

</div>
          </Link>))}

      </div>
    </div>
          </Page>


          <Page number={3}>
          <div>
      
      <h4 className="page-header">Mes recettes</h4>
      <div className="page" ref={this.ref}>
      {data.recipe.slice(4,6).map((data) => (

          <Link to={`/recipe/${data.id}`}>

          <div className="recipe-content">
            <div className="info-recipe">
              <h5 className="page-title">{data.name}</h5>
              <div className="page-infos"> <p>Temps de préparation : {data.prepare_time} </p>
              <p>Temps de cuisson : {data.cooking_time} </p>
              <p>Pour {data.part_number} {data.part_type}</p>  
              </div>                         
              <div className="image-recipe"><img src={data.image} className="imgRecipe"/></div>
            </div>

</div>
          </Link>))}

      </div>
    </div>
          </Page>


          <Page number={4}>
          <div>
      
      <h4 className="page-header">Mes recettes</h4>
      <div className="page" ref={this.ref}>
      {data.recipe.slice(6,8).map((data) => (

          <Link to={`/recipe/${data.id}`}>

          <div className="recipe-content">
            <div className="info-recipe">
              <h5 className="page-title">{data.name}</h5>
              <div className="page-infos"> <p>Temps de préparation : {data.prepare_time} </p>
              <p>Temps de cuisson : {data.cooking_time} </p>
              <p>Pour {data.part_number} {data.part_type}</p>  
              </div>                         
              <div className="image-recipe"><img src={data.image} className="imgRecipe"/></div>
            </div>

</div>
          </Link>))}

      </div>
    </div>
          </Page>


          <Page number={8}>
          <div>
      
      <h4 className="page-header">Mes recettes</h4>
      <div className="page" ref={this.ref}>
      {data.recipe.slice(8,10).map((data) => (

          <Link to={`/recipe/${data.id}`}>

          <div className="recipe-content">
            <div className="info-recipe">
              <h5 className="page-title">{data.name}</h5>
              <div className="page-infos"> <p>Temps de préparation : {data.prepare_time} </p>
              <p>Temps de cuisson : {data.cooking_time} </p>
              <p>Pour {data.part_number} {data.part_type}</p>  
              </div>                         
              <div className="image-recipe"><img src={data.image} className="imgRecipe"/></div>
            </div>

</div>
          </Link>))}

      </div>
    </div>
          </Page>


          <Page number={9}>
          <div>
      
      <h4 className="page-header">Mes recettes</h4>
      <div className="page" ref={this.ref}>
      {data.recipe.slice(10,12).map((data) => (

          <Link to={`/recipe/${data.id}`}>

          <div className="recipe-content">
            <div className="info-recipe">
              <h5 className="page-title">{data.name}</h5>
              <div className="page-infos"> <p>Temps de préparation : {data.prepare_time} </p>
              <p>Temps de cuisson : {data.cooking_time} </p>
              <p>Pour {data.part_number} {data.part_type}</p>  
              </div>                         
              <div className="image-recipe"><img src={data.image} className="imgRecipe"/></div>
            </div>

</div>
          </Link>))}

      </div>
    </div>
          </Page>

          <Page number={10}>
          <div>
      
      <h4 className="page-header">Mes recettes</h4>
      <div className="page" ref={this.ref}>
      {data.recipe.slice(12,14).map((data) => (

          <Link to={`/recipe/${data.id}`}>

          <div className="recipe-content">
            <div className="info-recipe">
              <h5 className="page-title">{data.name}</h5>
              <div className="page-infos"> <p>Temps de préparation : {data.prepare_time} </p>
              <p>Temps de cuisson : {data.cooking_time} </p>
              <p>Pour {data.part_number} {data.part_type}</p>  
              </div>                         
              <div className="image-recipe"><img src={data.image} className="imgRecipe"/></div>
            </div>

</div>
          </Link>))}

      </div>
    </div>
          </Page>
          <PageCover>THE END</PageCover>

        </HTMLFlipBook>
        <Footer />
      </div>

    );
  }
}

export default MyRecipesFlipResponsiv;