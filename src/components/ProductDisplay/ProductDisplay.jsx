import React, {useContext} from 'react'
import './ProductDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import ProductItem from '../ProductItem/ProductItem'

const ProductDisplay = ({category}) => {

    const{food_list} = useContext(StoreContext)

  return (
    <div className='product-display' id = 'product-display'>
        <hr/>
        <div className='product-display-list'>
            {food_list.map((item,index)=>{
              if(category==="All"|| category===item.category){
                return <ProductItem key={index} id={item._id} name={item.name} description={item.description } price={item.price} image={item.image}/>
              }//if state is all it returns complete items if not it will display a particular category
                //filters by category
            })}
        </div>
    </div>
  )
}

export default ProductDisplay
