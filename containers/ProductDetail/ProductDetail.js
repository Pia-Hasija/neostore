import React, {Component} from 'react';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import { Link, Switch } from 'react-router-dom';
import './product-detail.css';
import axios from 'axios';

export default class ProductDetail extends Component {
    
    state = {
        product:{},
        main_image:""
    }
    constructor(props) {
        super(props);
        // console.log("inn");
        // this.getProductDetail();
    }
    getProductDetail = () => {
        const { match: { params } } = this.props;
        var url = `http://180.149.241.208:3000/api/products/${params.id}?filter={"include":"images"}`;
        axios.get(url)
			.then(response => {
				this.setState({
                    product : response.data,
                    main_image: Object.keys(response.data).length!=0 ? response.data.images[0].ImgURL : ""
                })
                console.log(response.data);
                // return response.data;
			});
    }
    componentDidMount(){
        // console.log('iiiiin');
		this.getProductDetail();
	}

    onThumbnailClick = (image) =>{
        this.setState({
            main_image: image.ImgURL
        });
    }

    render()
    {
        return(
             [
                 <Header />,
                 <ProductDiv product={this.state.product} main_image={this.state.main_image} changeImage={this.onThumbnailClick}/>,
                 <Footer />
             ]       
        );  
    }
}

const ProductDiv = (props) =>{
    // console.log('props',props.product);
    var style = { "background" : "" };
    style.background = (Object.keys(props.product).length!=0 && typeof props.product.product_color=='object') ? props.product.product_color.color_code : '';
    var images = (props.product && Object.keys(props.product).length!=0 && props.product.images.length!=0) ? props.product.images : [];
    return(        
            <div className="card" >
                <div className="row">
                    <div className="wrapper">
                    <div className="col-md-6">
                    <div className="preview">
                    <div className="preview-pic tab-content">
                        <div className="my-img active">
                            <img className="actual-img"   src={props.main_image} lensStyle="LENS" />
                        </div>
                    </div>  
                        <ul className="preview-thumbnail nav nav-tabs">                        
                            {images.map((thumb,i) => 
                            <li onClick={()=>props.changeImage(thumb)} >
                                <div className="my-img-thumb">
                                    <img  src={thumb.ThumbURL100}/>
                                </div>
                            </li>
                            )}
                        </ul>
                </div>
                    </div>
                    <div className="col-md-6 ">
                        <div className="details">
                        <h3 className="text-danger">{props.product.product_name}</h3>
                        <div className="rating width-box">
                            {/* <Stars /> */}
                        </div>
                        <hr/>
                        <h4 >Price: <span className="text-success">{props.product.product_cost}</span></h4>
                        <h4 >Color:
                            <span className="color" style={style}></span>
                        </h4>
                        <div className="action">
                            <h4>Share on
                            <i className="fa fa-share-alt fa-lg"></i>
                            </h4>
                            <div className="share-container">
                            {/* <Share /> */}
                            </div>
                        </div>
                        <div className="action">
                            <button className=" btn btn-primary bt-color" type="button" >ADD TO CART</button>
                                {/* <Rate-app /> */}
                        </div>
                        </div>
                    </div>
                    </div>
                    <hr/>
                    <div className="wrapper">
                    <div className="col-md-12">
                        <div className="preview">
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="description-tab" data-toggle="tab" href="#description" role="tab" aria-controls="description" aria-selected="true">Description</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="features-tab" data-toggle="tab" href="#features" role="tab" aria-controls="features" aria-selected="false">Features</a>
                                </li>                        
                                </ul>
                                <div class="tab-content" id="myTabContent">
                                    <div class="tab-pane active" id="description" role="tabpanel" aria-labelledby="description-tab">{props.product.product_description}</div>
                                    <div class="tab-pane" id="features" role="tabpanel" aria-labelledby="features-tab">
                                        <h5 className="caption">Dimensions: {props.product.product_dimension}</h5>
                                        <h5 className="caption">Material: {props.product.product_material}</h5>
                                        <h5 className="caption">Manufacturer: {props.product.product_producer}</h5>
                                    </div>                            
                                </div>                                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

const Thumbnails = (props)=>{
    var images = (props.product && Object.keys(props.product).length!=0 && props.product.images.length!=0) ? props.product.images : [];
    let main_image = Object.keys(props.product).length!=0 ? props.product.images[0].ImgURL: '';

    return(
        <div className="preview">
            <div className="preview-pic tab-content">
                <div className="my-img active">
                    <img className="actual-img"   src={main_image} lensStyle="LENS" />
                </div>
            </div>  
                <ul className="preview-thumbnail nav nav-tabs">                        
                    {images.map((thumb,i) => 
                    <li onClick={changeImage(thumb.ThumbURL100)} >
                        <div className="my-img-thumb">
                            <img  src={thumb.ThumbURL100}/>
                        </div>
                    </li>
                    )}
                </ul>
        </div>
            
    );                   
}

const SocialShare = (props)=>{
    
}