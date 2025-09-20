import AllCategory from '../../_components/AllCategory/page'
import MainSlider from '../../_components/mainSlider/page'
import React from 'react'
import Products from '../products/page'


export default function Home() {
  return (
    <>
    <MainSlider/>
    <AllCategory/>
    <Products/> 
    </>
  )
}
