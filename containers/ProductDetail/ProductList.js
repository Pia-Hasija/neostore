import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import axios from 'axios';
import { categoryUrl,colorUrl,productUrl } from '../core/constants';
import './product-list.css';

export default class ProductList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            categories : [],
            colors:[],
            products:[]
        }
    }
    componentDidMount = () =>{
        axios.get(categoryUrl)
             .then(response =>{
                this.setState({
                    categories:response.data
                })
             })
             .catch(error=>{
                 console.log(error);
             })
        axios.get(colorUrl)
             .then(response =>{
                this.setState({
                    colors:response.data
                })
             })
             .catch(error=>{
                 console.log(error);
             })   
        this.getProducts({"include":"images"});     
    }
    getProducts = (filter) =>{
        var obj = JSON.stringify(filter);
        axios.get(productUrl+'?filter='+obj)
             .then(response =>{
                this.setState({
                    products:response.data
                })
             })
             .catch(error=>{
                 console.log(error);
             })
    }
    applyFilter = (type,value) =>{
        console.log(type+'--'+value);
        var obj = {}
        if(type==1){
            obj = {"where":{"categoryId":value},"include":"images"};
            this.getProducts(obj);
        }
        else if(type==2){
            obj = {"where":{"product_color.color_name":{"like":value,"options":"i"}},"include":"images"};
            this.getProducts(obj);
        }
        

    }
    render(){
        return(
            [
                <Header />,   
                <div className="row">                    
                    <Filters colors={this.state.colors} categories={this.state.categories} clickAction={this.applyFilter}/>
                    <List products={this.state.products}/>
                </div>,
                <Footer />
            ]
        )
    }
}

const Filters = (props)=>{
    return(
                    <div className="col-md-3">
                        <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                            <div className="panel panel-danger">
                            <div className="panel-heading" role="tab" id="headingOne">
                                <h4 className="panel-title">
                                <a data-toggle="collapse" data-parent="#accordion" href="#categories">
                                    <i className="fa fa-lg fa-angle-double-down"></i> Categories
                                </a>
                                </h4>
                            </div>
                            <div id="categories" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                                <div className="list-group">
                                { props.categories.map((category,i)=> 
                                <li className="list-group-item" >
                                    <a onClick={()=>props.clickAction(1,category.id)}>
                                    {/* <i className="fa fa-dot-circle-o" aria-hidden="true"></i> */}
                                    <input type="radio" name="category" value={category.categoryId}/>
                                    {category.category_name}
                                    </a>
                                </li>
                                )}
                                </div>
                            </div>
                            </div>

                            <div className="panel panel-danger">
                            <div className="panel-heading" role="tab" id="headingOne">
                                <h4 className="panel-title">
                                <a data-toggle="collapse" data-parent="#accordion" href="#colors">
                                    <i className="fa fa-lg fa-angle-double-down"></i> Colors
                                </a>
                                </h4>
                            </div>
                            <div id="colors" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                                <div className="list-group-item">
                                <ul className="list-inline">
                                    {props.colors.map((color,i) =>
                                        <li >
                                        <button type="button"                      
                                                placement="top"                    
                                                className="color-box"
                                                onClick={()=>props.clickAction(2,color.color_name)}
                                                style={{background:color.color_code,width:35,height:25}}>
                                        </button>
                                        </li>
                                    )}
                                </ul>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
            );
}

const List = (props) =>{
    return(
        <div className="col-md-9 vertical-line">
            <div className="row padding-row">
                <h5 className="pull-left">Category Title</h5>
                <div className="pull-right">
                <tabset type="pills">
                    <tab  >
                    <template tabHeading>
                        <i className="fa fa-star" aria-hidden="true"></i>
                    </template>
                    </tab>
                    <tab>
                    <template tabHeading>
                        <i className="fa fa-inr" aria-hidden="true"></i>
                        <i className="fa fa-arrow-up" aria-hidden="true"></i>
                    </template>
                    </tab>
                    <tab>
                    <template tabHeading>
                        <i className="fa fa-inr" aria-hidden="true"></i>
                        <i className="fa fa-arrow-down" aria-hidden="true"></i>
                    </template>
                    </tab>
                </tabset>
                </div>
                <h5 className="pull-right">Sort By : </h5>
            </div>
            <br/>
            <div>
                { props.products.map((product,i) =>
                    <div className="col-md-4" >
                        <div className="thumbnail">
                            <div className="img-thumb">
                            <img className="img-reposive" src={product.images[0].ImgURL}  alt="product_image"/>
                            </div>
                            <div className="caption">
                            <p className="elipse-product"><Link to={`/product/details/${product.id}`}>{product.product_name}</Link></p>
                            <button className="pull-right btn btn-danger btn-xs">Add To Cart</button>
                            <p><strong><td>{new Intl.NumberFormat('en-GB', { 
                                                                style: 'currency', 
                                                                currency: 'INR',
                                                                minimumFractionDigits: 0, 
                                                                maximumFractionDigits: 0 
                                                            }).format(product.product_cost)}
</td></strong></p>
                            <fieldset className="rating">              
                            </fieldset>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>  
    );
} 