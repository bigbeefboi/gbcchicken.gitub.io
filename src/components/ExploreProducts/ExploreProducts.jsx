import React from 'react'
import './ExploreProducts.css'
import { menu_list } from '../../assets/assets'

const ExploreProducts = ({category,setCategory}) => {

  return (
    <div className='explore-product' id = 'explore-product'>
        <h1>Explore our products</h1>
        <p className='explore-product-text'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos, repellendus vitae quo cupiditate dolorem quas laboriosam voluptatibus harum cumque? Ducimus, nesciunt suscipit libero ipsam rem magnam illo dolores numquam exercitationem.</p>
        <div className="explore-product-list">
            {menu_list.map((item,index)=>{
                return (
                    <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='explore-product-list-item'>
                        <img className={category===item.menu_name?"active":""} src={item.menu_image} alt = ""/>
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr/>
    </div>
  )
}

export default ExploreProducts
