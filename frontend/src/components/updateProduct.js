import React, {useState} from "react";
// import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function UpdateProducts(props){

    const [name, setPName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');

    const navigate = useNavigate();

    const [nameError, setNameError] = useState(null);
    const [priceError, setpriceError] = useState(null);
    const [categoryError, setcategoryError] = useState(null);
    const [companyError, setcompanyError] = useState(null);

    // const params = useParams();

    let nameVal = false;
    let priceVal = false;
    let categoryVal = false;
    let companyVal = false;




    const addProduct = async(e)=>{
        e.preventDefault();

        if(name === ""){
            setNameError('Please enter the product name !')
        }else if(name.length > 40){
            setNameError('product name is Greater !')
        }else if(name.length < 3){
            setNameError('product name is too Short!')
        }
        else{
            setNameError(null);
            nameVal = true;
        }

        if(price === "0"){
            setpriceError("price must be greater than 0!")
        }else if(price.length <= 0){
            setpriceError('Please enter the Product price !')
        }else{
            setpriceError(null);
            priceVal = true;
        }

        if(category.length < 3){
            setcategoryError('Category name is too Short!')
         }else if(category.length > 40){
            setcategoryError('Category name is Greater!')
         }else if(category.length <= 0){
            setcategoryError('Please enter Product Category!')
         }else{
            setcategoryError(null);
            categoryVal = true;
         };


         if(company.length <= 0){
            setcompanyError('Please enter the Company name !')
         }else if(company.length > 40){
            setcompanyError('Company name is Greater !')
         }else{
            setcompanyError(null);
            companyVal = true;
         }


        if(nameVal === true && priceVal === true && categoryVal === true && companyVal === true){

            let result = await fetch(`https://e-commerce-six-lime.vercel.app/updateProducts/${props.productID}`,{
                method:"put",
                body: JSON.stringify({name, price, category, company}),
                headers: {
                    "Content-Type" : "application/json",
                    "authorization" : `berear ${JSON.parse(localStorage.getItem('token'))}`
                }
            });

            result = await result.json();
            console.log(result);
            navigate('/')
            props.hideEdit();
            setPName("");
            setPrice("");
            setCompany("");
            setCategory("");
        }
    }

    return (
        <>
        <div style={{position:"fixed",display:`${props.dis}`, flexDirection:"column" ,justifyContent:"center", alignItems:"center", zIndex:"99", width:"100%", height:"100vh", background:"rgb(216 216 216 / 60%)",backdropFilter:"blur(5px)", top:'0'}}>
          
          <form className="mx-5" style={{width:"50%"}}>
          <h1 className="my-5 mx-5">Update Product</h1>
            <div className="mb-3">
                <label className="form-label">Product Name</label>
                <input type="text" maxLength={40} placeholder={props.ProductName} onChange={(e)=>{setPName(e.target.value)}} value={name} className="form-control"  aria-describedby="emailHelp"/>
                <p style={{color:"red"}}>{nameError}</p>
            </div>
            <div className="mb-3">
                <label className="form-label">price</label>
                <input type="number" maxLength={6} placeholder={props.ProductPrice} onChange={(e)=>{setPrice(e.target.value)}} value={price} className="form-control"/>
                <p style={{color:"red"}}>{priceError}</p>
            </div>
            <div className="mb-3">
                <label className="form-label">Category</label>
                <input type="text" placeholder={props.ProductCategory} onChange={(e)=>{setCategory(e.target.value)}} value={category} className="form-control"/>
                <p style={{color:"red"}}>{categoryError}</p>
            </div>
            <div className="mb-3">
                <label className="form-label">Comapny</label>
                <input type="text" placeholder={props.ProductCompany} onChange={(e)=>{setCompany(e.target.value)}} value={company} className="form-control"/>
                <p style={{color:"red"}}>{companyError}</p>
            </div>
            <button type="submit" onClick={addProduct} className="btn btn-primary">Update Product</button>
            <button className="btn btn-danger" onClick={props.hideEdit}>Close</button>
            </form>
        </div>  
        </>
    )
};

export default UpdateProducts;
