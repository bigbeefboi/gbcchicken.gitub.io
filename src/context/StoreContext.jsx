import { createContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios"

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const[cartItems,setCartItems] = useState({});

    //declare url for backend
    const url = "http://localhost:4000"

    //token
    const [token,setToken] = useState("")

    //makes assets/items available thru the db
    const [food_list,setFoodList] = useState([])

    const addToCart = async (itemId) => {
        if(!cartItems[itemId]) {
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }//create a new entry for a product if the product id is not available
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }//increases item value by 1
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
}  

    const removeFromCart  = async (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }//decreases item value by 1

    const getTotalCartAmount = ()=>{
        /*calculates the total in the cart*/
        let totalAmount = 0;
        /*for loop iterates through the object*/
        for(const item in cartItems)
        {
            if(cartItems[item]>0){//executes if item quantity is greater than 0
                let itemInfo = food_list.find((product)=>product._id === item);
                totalAmount += itemInfo.price*cartItems[item];//retrieve the total amount
            }
             
        }
        return totalAmount;
    }

    //retrieves the items from db
    const fetchFoodList = async () => {
        //call api
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data)
    }

    //does not reset page upon reset and saves the state
    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get",{},{headers:{token}});
        setCartItems(response.data.cartData);
    }

    //keeps login state upon refresh
    useEffect(() =>{

        async function loadData() {
            await fetchFoodList();
            if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"));
            await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();

    },[])

    const contextValue = {  
            food_list,
            cartItems,
            setCartItems,
            addToCart,
            removeFromCart,
            getTotalCartAmount,
            url,
            token,
            setToken
            //makes the functionality available to other components
    }
    return(
        <StoreContext.Provider value={contextValue} >
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;