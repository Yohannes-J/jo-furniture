import React from 'react'
import './ExploreProducts.css'
import { menu_list } from '../../assets/assets'
const ExploreProducts = ({category, setCategory}) => {
  return (
    <div className='explore-products' id='explore-products'>
        <h2>Explore our products</h2>
        <p className='explore-products-test'>choose the material for home here the luxry products are available with cosidering your pocket</p>
        <div className='explore-products-list'>
            {menu_list.map((item, index)=>{
                return(
                   <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='explore-products-list-item'>
                    <img className={category===item.menu_name?"active":" "} src={item.menu_image} alt="" />
                    <p>{item.menu_name}</p>
                     </div>
                )
            }
            )}
        </div>
      <hr />
    </div>
  )
}

export default ExploreProducts
