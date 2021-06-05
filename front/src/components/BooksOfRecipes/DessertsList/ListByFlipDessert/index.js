import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// book import
import HTMLFlipBook from 'react-pageflip';

// composants import
import Header from '../../../Header';
import Footer from '../../../Footer';

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
     <div className="page-text">{props.children}</div>
      <div className="page-footer">{props.number + 1}</div>
    </div>
  </div>
));

// page with changes
class ListByFlipDessert extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      totalPage: 0,
      dessert: []
    };
  }

  componentDidMount() {
    // Simple GET request using axios
    axios.get('https://apicuisine.herokuapp.com/api/categories/3/recipes')
      .then((response) => {
        this.setState({ dessert: response.data });
      });
  }
  
  render() {  const data = this.state;
    console.log(data);
    return (
      <div className="myRecipe_container">
      <div className="stpageflip">
        <Header />
        <HTMLFlipBook
          minWidth={315}
          maxWidth={1000}
          minHeight={400}
          maxHeight={1533}
          width={550}
          height={700}
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

          <PageCover>Desserts</PageCover>

          <Page number={1}>
          <div>
      
          <h4 className="page-header">Desserts</h4>
      <div className="page" ref={this.ref}>
      {data.dessert.slice(0,3).map((data) => (

          <Link to={`/recipe/${data.id}`}>

          <div className="recipe-content">
              <div className="image-recipe"><img src={data.image} className="imgRecipe"/></div>
            <div className="info-recipe">
              <h5 className="page-title">{data.name}</h5>
              <div className="page-infos"> <p className="p_recipe_info">Temps de préparation : {data.prepare_time} </p>
              <p className="p_recipe_info">Temps de cuisson : {data.cooking_time} </p>
              <p className="p_recipe_info">Pour {data.part_number} {data.part_type}</p>  
              </div>                         
            </div>

</div>
          </Link>))}

      </div>
    </div>
          </Page>


          <Page number={2}>
          <div>
      
          <h4 className="page-header">Desserts</h4>
      <div className="page" ref={this.ref}>
      {data.dessert.slice(3,6).map((data) => (

          <Link to={`/recipe/${data.id}`}>

          <div className="recipe-content">
              <div className="image-recipe"><img src={data.image} className="imgRecipe"/></div>
            <div className="info-recipe">
              <h5 className="page-title">{data.name}</h5>
              <div className="page-infos"> <p className="p_recipe_info">Temps de préparation : {data.prepare_time} </p>
              <p className="p_recipe_info">Temps de cuisson : {data.cooking_time} </p>
              <p className="p_recipe_info">Pour {data.part_number} {data.part_type}</p>  
              </div>                         
            </div>

</div>
          </Link>))}

      </div>
    </div>
          </Page>


          <Page number={3}>
          <div>
      
          <h4 className="page-header">Desserts</h4>
      <div className="page" ref={this.ref}>
      {data.dessert.slice(6,9).map((data) => (

          <Link to={`/recipe/${data.id}`}>

          <div className="recipe-content">
              <div className="image-recipe"><img src={data.image} className="imgRecipe"/></div>
            <div className="info-recipe">
              <h5 className="page-title">{data.name}</h5>
              <div className="page-infos"> <p className="p_recipe_info">Temps de préparation : {data.prepare_time} </p>
              <p className="p_recipe_info">Temps de cuisson : {data.cooking_time} </p>
              <p className="p_recipe_info">Pour {data.part_number} {data.part_type}</p>  
              </div>                         
            </div>

</div>
          </Link>))}

      </div>
    </div>
          </Page>


          <Page number={4}>
          <div>
      
          <h4 className="page-header">Desserts</h4>
      <div className="page" ref={this.ref}>
      {data.dessert.slice(9,12).map((data) => (

          <Link to={`/recipe/${data.id}`}>

          <div className="recipe-content">
              <div className="image-recipe"><img src={data.image} className="imgRecipe"/></div>
            <div className="info-recipe">
              <h5 className="page-title">{data.name}</h5>
              <div className="page-infos"> <p className="p_recipe_info">Temps de préparation : {data.prepare_time} </p>
              <p className="p_recipe_info">Temps de cuisson : {data.cooking_time} </p>
              <p className="p_recipe_info">Pour {data.part_number} {data.part_type}</p>  
              </div>                         
            </div>

</div>
          </Link>))}

      </div>
    </div>
          </Page>

          <Page number={5}>
          <div>
      
          <h4 className="page-header">Desserts</h4>
      <div className="page" ref={this.ref}>
      {data.dessert.slice(12,15).map((data) => (

          <Link to={`/recipe/${data.id}`}>

          <div className="recipe-content">
              <div className="image-recipe"><img src={data.image} className="imgRecipe"/></div>
            <div className="info-recipe">
              <h5 className="page-title">{data.name}</h5>
              <div className="page-infos"> <p className="p_recipe_info">Temps de préparation : {data.prepare_time} </p>
              <p className="p_recipe_info">Temps de cuisson : {data.cooking_time} </p>
              <p className="p_recipe_info">Pour {data.part_number} {data.part_type}</p>  
              </div>                         
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
</div>
    );
  }
}

export default ListByFlipDessert;
