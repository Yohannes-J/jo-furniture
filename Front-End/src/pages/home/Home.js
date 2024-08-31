import React, { useState } from 'react'
import "./Home.css"
import Header from '../../components/header/Header'
import ExploreProducts from '../../components/exploreProducts/ExploreProducts'
import LuxryDisplay from '../../components/luxryDisplay/LuxryDisplay'
import AppDownload from '../../components/appDownload/AppDownload'
const Home = () => {
  const [category, setCategory]=useState("All");
  return (
    <div>
      <Header />
      <ExploreProducts category ={category} setCategory={setCategory} />
      <LuxryDisplay category={category}/>
      <AppDownload/>
    </div>
  )
}

export default Home
