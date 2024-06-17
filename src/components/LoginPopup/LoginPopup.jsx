import React, {  useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"

/* this component shows the login popup */
const LoginPopup = ({setShowLogin}) => {

    //fetch url via context api
    const {url,setToken} = useContext(StoreContext)

    //the variable will display the login state signed in/out
    const [currentState, setCurrentState] = useState("Login")  

    //state variable to save user credentials
    const [data, setData] = useState({
        name:"",
        email:"",
        password:""
    })

    //onchange handler takes data from input field and saves it to the state variable
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data =>({...data,[name]:value}))
    }

    //user function for login
    const onLogin = async (event) => {
        //link func to form tag
        event.preventDefault()
        let newUrl = url;
        if(currentState === "Login"){
            newUrl += "/api/user/login"
        }
        else{
            newUrl += "/api/user/register"
        }

        const response = await axios.post(newUrl,data);

        if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false);
        }
        else{
            alert(response.data.message)
        }
    }

    /*
    useeffect to check functionality
    whenever data is update function is executed
    useEffect(() =>{
        console.log(data);
    },[data])
    */

  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currentState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt=""/> {/*onClick property to use the setshowlogin function and set it to false*/}
            </div>
            <div className="login-popup-inputs">
                {currentState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='your name' required/>} {/*the ternary operator will hide and display certain contents depending on the state of the variable */}
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='your email' required/>
                <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder=' password' required/>
            </div>
            <button type='submit'>{currentState==="Sign Up"?"Create account":"Login"}</button>{/*the ternary operator will the contents of the button depending on the state of the variable */}
            <div className="login-popup-condition">
                <input className = "login-popup-check" type = "checkbox" required/>
                <p>By continuing, I acknowledge and agree to the Terms of Use and Privacy Policy.</p>
            </div>
            {currentState ==="Login"
            ?<p>Create a new account?<span onClick={()=> setCurrentState("Sign Up")}>Click here</span></p>
            :<p>Already have an account?<span onClick={()=> setCurrentState("Login")}>Login</span></p> 
            }
            {/*operator will display the paragraph depending on the state of the variable*/}
            {/*onclick will use the function to change the state of the variable */}  
            
        </form>
    </div>
  )
}

export default LoginPopup
