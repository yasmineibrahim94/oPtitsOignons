import React from 'react';

//book import
import HTMLFlipBook from 'react-pageflip';

// composants import
import Header from '../../Header';
import Footer from '../../Footer';

// style import
import '/src/components/EditRecipe/style.scss'

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
class EditRecipe extends React.Component {  
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      totalPage: 0,

    };
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
        this.setState({
            totalPage: this.flipBook.getPageFlip().getPageCount()
        });
    } */

  render() {
    return (
      <div>
        <Header />

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

          <PageCover>category.name</PageCover>

          <Page number={1}>                  
          <h4 className="page-header">category.name</h4>

            <div className="page" ref={this.ref}>
              <div className="page-content">
                <h5 className="page-title">recipe.title</h5>
                <p className="page-img">recipe.img</p>
                <p classname="page-infos"> recipe.difficulty recipe.time recipe.portion</p>

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

export default EditRecipe;
