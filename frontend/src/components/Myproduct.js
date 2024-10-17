
import React, { useEffect, useState } from "react";
import UpdateProducts from "./updateProduct";
function MyProduct() {
    const [Products, setProducts] = useState([]);
    const [getId, setID] = useState('');
    const [Name1, setName] = useState('');
    const [Price1, setPrice] = useState('');
    const [Company1, setCompany] = useState('');
    const [Category1, setCategory] = useState('');
    const [dis, setDis] = useState('none');

    useEffect(()=>{
            getProducts();
    },[]);
    const getProducts = async ()=>{
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch(`https://e-commerce-six-lime.vercel.app/fetchProducts/${userId}`,{
            headers:{
                "authorization" : `berear ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setProducts(result);
    };

    const DeletePro = async (id)=>{
        let deleteProduct = await fetch(`https://e-commerce-six-lime.vercel.app/deleteProducts/${id}`,{
            method:'delete'
        });
        deleteProduct = await deleteProduct.json();
        console.log(deleteProduct);

        if(deleteProduct){
            getProducts();
        }
    };

    const showEdit =()=>{
        setDis('flex');
    }
    const hideEdit = ()=>{
        setDis('none');
    }

    const getPid = async(Id)=>{
        let result = await fetch(`https://e-commerce-six-lime.vercel.app/Products/${Id}`,{
            headers:{
                "authorization" : `berear ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setID(result._id);
        setName(result.name);
        setPrice(result.price);
        setCompany(result.company);
        setCategory(result.category);
        showEdit();
    }
  return (
    <>
     <h1 className="my-5 mx-5">Products</h1>
        <UpdateProducts productID = {getId} ProductName={Name1} ProductPrice = {Price1} ProductCompany = {Company1} ProductCategory = {Category1} dis = {dis} showEdit = {showEdit}  hideEdit = {hideEdit}/>
     <div style={{display:"flex", width:"100%", flexWrap:"wrap"}}>
     {Products.length > 0 ?(Products?.map((items,index)=>{
            return(
                <div key={items._id} >

                    <div className="card my-5 mx-5"  style={{width:"18rem"}}>

                        <div  className="card-body">
                        <h3 style={{textAlign:"center", marginBottom:"20px"}}>{index + 1}</h3>    
                        <h5 className="card-title" style={{textAlign:"center"}}>Product: {items.name}</h5>
                        <p className="card-text my-3" style={{textAlign:"center"}}>Category: {items.category}</p>
                        <p className="card-text" style={{marginTop:"-10px",textAlign:"center"}}>Company: {items.company}</p>
                        <button style={{display:"flex", justifyContent:"center", width:"100%"}} className="btn btn-success">{items.price}$</button>
                        <button style={{display:"flex", justifyContent:"center", width:"100%"}} className="btn btn-primary my-2" onClick={()=>getPid(items._id)}>Edit</button>
                        <button style={{display:"flex", justifyContent:"center", width:"100%"}} className="btn btn-danger my-2" onClick={()=>DeletePro(items._id)}>delete</button>

                        </div>

                    </div>
                </div>
            )
        })):(
            <>
            </>
        )}
     </div>
    </>
  );
}


export default MyProduct;
