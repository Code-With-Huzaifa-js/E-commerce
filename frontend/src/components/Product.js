
import React, { useEffect, useState } from "react";
function Product() {
    const [Products, setProducts] = useState([]);

    useEffect(()=>{
            getProducts();
    },[]);
    const getProducts = async ()=>{
        let result = await fetch(`https://e-commerce-six-lime.vercel.app/getProduct`,{
            headers:{
                "authorization" : `berear ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setProducts(result);
    };
    let SearchProducts = async(e)=>{
        let key = e.target.value
        if(key){
            let results = await fetch(`https://e-commerce-six-lime.vercel.app/search/${key}`,{
                headers:{
                    "authorization" : `berear ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            results = await results.json();
            if(results){
                setProducts(results);
            }
        }else if(key.length <=0){
            getProducts();
        }
        else{
            getProducts();
        }
    }
  return (
    <>
     <h1 className="my-5 mx-5">Products</h1>
     <input className="form-control me-2 mx-5" onChange={SearchProducts}  style={{width:"30%"}} type="text" placeholder="Search"/>
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

                        </div>

                    </div>
                </div>
            )
        })):(
            <>
            <h1>No result Found</h1>
            </>
        )}
     </div>
    </>
  );
}


export default Product;
