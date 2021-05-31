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
      <div className="page-image"></div>
      <div className="page-text">{props.children}</div>
      <div className="page-footer">{props.number + 1}</div>
    </div>
  </div>
));

// page with changes
class ListByFlipDessertResponsiv extends React.Component {
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
    axios.get('https://apicuisine.herokuapp.com/api/categories/3/recipes')
      .then((response) => {
        this.setState({ recipe: response.data });
      });
  }
 
  render() {const data = this.state;
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
          width={315}
          height={400}
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
      {data.recipe.slice(0,1).map((data) => (

          <Link to={`/recipe/${data.id}`}>

          <div className="recipe-content">
            <div className="info-recipe">
              <h5 className="page-title">{data.name}</h5>
              <div className="page-infos"> <p>Préparation : {data.prepare_time} </p>
              <p>Cuisson : {data.cooking_time} </p>
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
      
          <h4 className="page-header">Desserts</h4>
      <div className="page" ref={this.ref}>
      {data.recipe.slice(1,2).map((data) => (

          <Link to={`/recipe/${data.id}`}>

          <div className="recipe-content">
            <div className="info-recipe">
              <h5 className="page-title">{data.name}</h5>
              <div className="page-infos"> <p>Préparation : {data.prepare_time} </p>
              <p>Cuisson : {data.cooking_time} </p>
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
      
          <h4 className="page-header">Desserts</h4>
      <div className="page" ref={this.ref}>
      {data.recipe.slice(2,3).map((data) => (

          <Link to={`/recipe/${data.id}`}>

          <div className="recipe-content">
            <div className="info-recipe">
              <h5 className="page-title">{data.name}</h5>
              <div className="page-infos"> <p>Préparation : {data.prepare_time} </p>
              <p>Cuisson : {data.cooking_time} </p>
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
      
          <h4 className="page-header">Desserts</h4>
      <div className="page" ref={this.ref}>
      {data.recipe.slice(3,4).map((data) => (

          <Link to={`/recipe/${data.id}`}>

          <div className="recipe-content">
            <div className="info-recipe">
              <h5 className="page-title">{data.name}</h5>
              <div className="page-infos"> <p>Préparation : {data.prepare_time} </p>
              <p>Cuisson : {data.cooking_time} </p>
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
      
          <h4 className="page-header">Desserts</h4>
      <div className="page" ref={this.ref}>
      {data.recipe.slice(4,5).map((data) => (

          <Link to={`/recipe/${data.id}`}>

          <div className="recipe-content">
            <div className="info-recipe">
              <h5 className="page-title">{data.name}</h5>
              <div className="page-infos"> <p>Préparation : {data.prepare_time} </p>
              <p>Cuisson : {data.cooking_time} </p>
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
      
          <h4 className="page-header">Desserts</h4>
      <div className="page" ref={this.ref}>
      {data.recipe.slice(5,6).map((data) => (

          <Link to={`/recipe/${data.id}`}>

          <div className="recipe-content">
            <div className="info-recipe">
              <h5 className="page-title">{data.name}</h5>
              <div className="page-infos"> <p>Préparation : {data.prepare_time} </p>
              <p>Cuisson : {data.cooking_time} </p>
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
      
          <h4 className="page-header">Desserts</h4>
      <div className="page" ref={this.ref}>
      {data.recipe.slice(6,7).map((data) => (

          <Link to={`/recipe/${data.id}`}>

          <div className="recipe-content">
            <div className="info-recipe">
              <h5 className="page-title">{data.name}</h5>
              <div className="page-infos"> <p>Préparation : {data.prepare_time} </p>
              <p>Cuisson : {data.cooking_time} </p>
              <p>Pour {data.part_number} {data.part_type}</p>  
              </div>                         
              <div className="image-recipe"><img src={data.image} className="imgRecipe"/></div>
            </div>

</div>
          </Link>))}

      </div>
    </div>
          </Page>


          <Page number={11}>
          <div>
      
          <h4 className="page-header">Desserts</h4>
      <div className="page" ref={this.ref}>
      {data.recipe.slice(7,8).map((data) => (

          <Link to={`/recipe/${data.id}`}>

          <div className="recipe-content">
            <div className="info-recipe">
              <h5 className="page-title">{data.name}</h5>
              <div className="page-infos"> <p>Préparation : {data.prepare_time} </p>
              <p>Cuisson : {data.cooking_time} </p>
              <p>Pour {data.part_number} {data.part_type}</p>  
              </div>                         
              <div className="image-recipe"><img src={data.image} className="imgRecipe"/></div>
            </div>

</div>
          </Link>))}

      </div>
    </div>
          </Page>


          <Page number={12}>
          <div>
      
          <h4 className="page-header">Desserts</h4>
      <div className="page" ref={this.ref}>
      {data.recipe.slice(8,9).map((data) => (

          <Link to={`/recipe/${data.id}`}>

          <div className="recipe-content">
            <div className="info-recipe">
              <h5 className="page-title">{data.name}</h5>
              <div className="page-infos"> <p>Préparation : {data.prepare_time} </p>
              <p>Cuisson : {data.cooking_time} </p>
              <p>Pour {data.part_number} {data.part_type}</p>  
              </div>                         
              <div className="image-recipe"><img src={data.image} className="imgRecipe"/></div>
            </div>

</div>
          </Link>))}

      </div>
    </div>
          </Page>


          <Page number={13}>
          <div>
      
          <h4 className="page-header">Desserts</h4>
      <div className="page" ref={this.ref}>
      {data.recipe.slice(9,10).map((data) => (

          <Link to={`/recipe/${data.id}`}>

          <div className="recipe-content">
            <div className="info-recipe">
              <h5 className="page-title">{data.name}</h5>
              <div className="page-infos"> <p>Préparation : {data.prepare_time} </p>
              <p>Cuisson : {data.cooking_time} </p>
              <p>Pour {data.part_number} {data.part_type}</p>  
              </div>                         
              <div className="image-recipe"><img src={data.image} className="imgRecipe"/></div>
            </div>

</div>
          </Link>))}

      </div>
    </div>
          </Page>


          <Page number={14}>
          <div>
      
          <h4 className="page-header">Desserts</h4>
      <div className="page" ref={this.ref}>
      {data.recipe.slice(10,11).map((data) => (

          <Link to={`/recipe/${data.id}`}>

          <div className="recipe-content">
            <div className="info-recipe">
              <h5 className="page-title">{data.name}</h5>
              <div className="page-infos"> <p>Préparation : {data.prepare_time} </p>
              <p>Cuisson : {data.cooking_time} </p>
              <p>Pour {data.part_number} {data.part_type}</p>  
              </div>                         
              <div className="image-recipe"><img src={data.image} className="imgRecipe"/></div>
            </div>

</div>
          </Link>))}

      </div>
    </div>
          </Page>


          <Page number={15}>
          <div>
      
          <h4 className="page-header">Desserts</h4>
      <div className="page" ref={this.ref}>
      {data.recipe.slice(11,12).map((data) => (

          <Link to={`/recipe/${data.id}`}>

          <div className="recipe-content">
            <div className="info-recipe">
              <h5 className="page-title">{data.name}</h5>
              <div className="page-infos"> <p>Préparation : {data.prepare_time} </p>
              <p>Cuisson : {data.cooking_time} </p>
              <p>Pour {data.part_number} {data.part_type}</p>  
              </div>                         
              <div className="image-recipe"><img src={data.image} className="imgRecipe"/></div>
            </div>

</div>
          </Link>))}

      </div>
    </div>
          </Page>


          <Page number={16}>
          <div>
      
          <h4 className="page-header">Desserts</h4>
      <div className="page" ref={this.ref}>
      {data.recipe.slice(12,13).map((data) => (

          <Link to={`/recipe/${data.id}`}>

          <div className="recipe-content">
            <div className="info-recipe">
              <h5 className="page-title">{data.name}</h5>
              <div className="page-infos"> <p>Préparation : {data.prepare_time} </p>
              <p>Cuisson : {data.cooking_time} </p>
              <p>Pour {data.part_number} {data.part_type}</p>  
              </div>                         
              <div className="image-recipe"><img src={data.image} className="imgRecipe"/></div>
            </div>

</div>
          </Link>))}

      </div>
    </div>
          </Page>


          <Page number={17}>
          <div>
      
          <h4 className="page-header">Desserts</h4>
      <div className="page" ref={this.ref}>
      {data.recipe.slice(13,14).map((data) => (

          <Link to={`/recipe/${data.id}`}>

          <div className="recipe-content">
            <div className="info-recipe">
              <h5 className="page-title">{data.name}</h5>
              <div className="page-infos"> <p>Préparation : {data.prepare_time} </p>
              <p>Cuisson : {data.cooking_time} </p>
              <p>Pour {data.part_number} {data.part_type}</p>  
              </div>                         
              <div className="image-recipe"><img src={data.image} className="imgRecipe"/></div>
            </div>

</div>
          </Link>))}

      </div>
    </div>
          </Page>


          <Page number={18}>
          <div>
      
          <h4 className="page-header">Desserts</h4>
      <div className="page" ref={this.ref}>
      {data.recipe.slice(14,15).map((data) => (

          <Link to={`/recipe/${data.id}`}>

          <div className="recipe-content">
            <div className="info-recipe">
              <h5 className="page-title">{data.name}</h5>
              <div className="page-infos"> <p>Préparation : {data.prepare_time} </p>
              <p>Cuisson : {data.cooking_time} </p>
              <p>Pour {data.part_number} {data.part_type}</p>  
              </div>                         
              <div className="image-recipe"><img src={data.image} className="imgRecipe"/></div>
            </div>

</div>
          </Link>))}

      </div>
    </div>
          </Page>


          <Page number={19}>
          <div>
      
          <h4 className="page-header">Desserts</h4>
      <div className="page" ref={this.ref}>
      {data.recipe.slice(15,16).map((data) => (

          <Link to={`/recipe/${data.id}`}>

          <div className="recipe-content">
            <div className="info-recipe">
              <h5 className="page-title">{data.name}</h5>
              <div className="page-infos"> <p>Préparation : {data.prepare_time} </p>
              <p>Cuisson : {data.cooking_time} </p>
              <p>Pour {data.part_number} {data.part_type}</p>  
              </div>                         
              <div className="image-recipe"><img src={data.image} className="imgRecipe"/></div>
            </div>

</div>
          </Link>))}

      </div>
    </div>
          </Page>


          <Page number={20}>
          <div>
      
          <h4 className="page-header">Desserts</h4>
      <div className="page" ref={this.ref}>
      {data.recipe.slice(16,17).map((data) => (

          <Link to={`/recipe/${data.id}`}>

          <div className="recipe-content">
            <div className="info-recipe">
              <h5 className="page-title">{data.name}</h5>
              <div className="page-infos"> <p>Préparation : {data.prepare_time} </p>
              <p>Cuisson : {data.cooking_time} </p>
              <p>Pour {data.part_number} {data.part_type}</p>  
              </div>                         
              <div className="image-recipe"><img src={data.image} className="imgRecipe"/></div>
            </div>

</div>
          </Link>))}

      </div>
    </div>
          </Page>


          <Page number={21}>
          <div>
      
          <h4 className="page-header">Desserts</h4>
      <div className="page" ref={this.ref}>
      {data.recipe.slice(17,18).map((data) => (

          <Link to={`/recipe/${data.id}`}>

          <div className="recipe-content">
            <div className="info-recipe">
              <h5 className="page-title">{data.name}</h5>
              <div className="page-infos"> <p>Préparation : {data.prepare_time} </p>
              <p>Cuisson : {data.cooking_time} </p>
              <p>Pour {data.part_number} {data.part_type}</p>  
              </div>                         
              <div className="image-recipe"><img src={data.image} className="imgRecipe"/></div>
            </div>

</div>
          </Link>))}

      </div>
    </div>
          </Page>


          <Page number={22}>
          <div>
      
          <h4 className="page-header">Desserts</h4>
      <div className="page" ref={this.ref}>
      {data.recipe.slice(18,19).map((data) => (

          <Link to={`/recipe/${data.id}`}>

          <div className="recipe-content">
            <div className="info-recipe">
              <h5 className="page-title">{data.name}</h5>
              <div className="page-infos"> <p>Préparation : {data.prepare_time} </p>
              <p>Cuisson : {data.cooking_time} </p>
              <p>Pour {data.part_number} {data.part_type}</p>  
              </div>                         
              <div className="image-recipe"><img src={data.image} className="imgRecipe"/></div>
            </div>

</div>
          </Link>))}

      </div>
    </div>
          </Page>

          <Page number={23}>
          <div>
      
          <h4 className="page-header">Desserts</h4>
      <div className="page" ref={this.ref}>
      {data.recipe.slice(19,20).map((data) => (

          <Link to={`/recipe/${data.id}`}>

          <div className="recipe-content">
            <div className="info-recipe">
              <h5 className="page-title">{data.name}</h5>
              <div className="page-infos"> <p>Préparation : {data.prepare_time} </p>
              <p>Cuisson : {data.cooking_time} </p>
              <p>Pour {data.part_number} {data.part_type}</p>  
              </div>                         
              <div className="image-recipe"><img src={data.image} className="imgRecipe"/></div>
            </div>

</div>
          </Link>))}

      </div>
    </div>
          </Page>


          <Page number={24}>
          <div>
      
          <h4 className="page-header">Desserts</h4>
      <div className="page" ref={this.ref}>
      {data.recipe.slice(20,21).map((data) => (

          <Link to={`/recipe/${data.id}`}>

          <div className="recipe-content">
            <div className="info-recipe">
              <h5 className="page-title">{data.name}</h5>
              <div className="page-infos"> <p>Préparation : {data.prepare_time} </p>
              <p>Cuisson : {data.cooking_time} </p>
              <p>Pour {data.part_number} {data.part_type}</p>  
              </div>                         
              <div className="image-recipe"><img src={data.image} className="imgRecipe"/></div>
            </div>

</div>
          </Link>))}

      </div>
    </div>
          </Page>


          <Page number={25}>
          <div>
      
          <h4 className="page-header">Desserts</h4>
      <div className="page" ref={this.ref}>
      {data.recipe.slice(21,22).map((data) => (

          <Link to={`/recipe/${data.id}`}>

          <div className="recipe-content">
            <div className="info-recipe">
              <h5 className="page-title">{data.name}</h5>
              <div className="page-infos"> <p>Préparation : {data.prepare_time} </p>
              <p>Cuisson : {data.cooking_time} </p>
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
      </div></div>
    );
  }
}

export default ListByFlipDessertResponsiv;
