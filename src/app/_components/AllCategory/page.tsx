import getAllCategories from '../../../Api/category.api'
import React from 'react'
import CategoriesSlider from '../categorySlider/page'

export default async function AllCategory() {
    const data = await getAllCategories()
  
    return (
    <div>
        <CategoriesSlider datalist={data} />
    </div>
  )
}
