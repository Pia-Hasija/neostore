import React, {Component} from 'react';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import axios from 'axios';
import {Carousel, CarouselItem, CarouselCaption} from 'react-bootstrap';
import { Switch, Link } from 'react-router-dom';

export default class Home extends Component {

    state ={
        categories:[],
        products:[]
    }    
    constructor(props){
        super(props);
        this.getCategories();
        this.getPopularProducts();
      }
    getCategories = () => {
        var url = "http://180.149.241.208:3000/api/categories?filter={%22include%22:%22images%22}";
        axios.get(url)
			.then(response => {
				this.setState({
					categories : response.data
                })
                // console.log(response.data);
                // return response.data;
			})
    }

    getPopularProducts = () =>{
        var url = 'http://180.149.241.208:3000/api/products?filter={"order": "product_avg_rating  DESC","include":"images" ,"limit":"6", "skip":"0"}';

        axios.get(url)
			.then(response => {
				this.setState({
					products : response.data
                })
                // console.log(response.data);
                // return response.data;
			})
    }
    render () {
        return (
                [
                    <Header />,
                    <HomeCarousel categories={this.state.categories}/>,
                    <ProductList products={this.state.products}/>,
                    <Footer />
                ]
                
            );
    }
}

const HomeCarousel = (props) =>{
	return (
        <div className="carousel-div">
            <Carousel>
                { props.categories.map((category,i)=> 
                    <Carousel.Item>                    
                            <img width={900} height={500} alt="900x500" src={category.images.ImgURL} />                                    
                    </Carousel.Item>
                )}
                {/* <Carousel.Item>
                    <img width={900} height={500} alt="900x500" src="assets/images/carousel.png" />
                    <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img width={900} height={500} alt="900x500" src="assets/images/carousel.png" />
                    <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item> */}
                </Carousel>
            </div>
	)
}

const ProductList = (props) => {
    console.log(props.products);
    // render(){
        return(
            <div>
            <h3 class="text-center">Popular Products <small><Link to="/product/list">--view all</Link></small></h3> 
            <div className="row">
                {props.products.map((product,i) =>
                    <div className="col-md-4"  >
                        <div className="thumbnail">
                        <div className="img-thumb">
                            <img src={product.images[0].ImgURL} className="img-inside img-responsive"/>                       
                        </div>
                        <div className="caption">
                            <h4 className="text-center"><Link to={`/product/details/${product.id}`}>{product.product_name}</Link></h4>
                            <h4 className="text-center">{product.product_cost}</h4>                          
                        </div>
                        </div>
                        <div className="stars">
                            <Stars rating={product.product_avg_rating} />
                        </div>
                    </div>
                )}
                </div>
            </div>
        )
    }

    const Stars = (props)=>{
        //const numberOfStars = 1+Math.floor(Math.random()*9);
        let stars = [];
        for(let i=0; i<props.rating; i++){
            stars.push(<i key={i} className="fa fa-star"></i>)
        }
        return(
          <div className="col-5">  	
            {stars}
        </div>
      )
    }