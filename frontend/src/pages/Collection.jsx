import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/shopContext.jsx'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {

  const { products, search ,showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(true);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const toggleCategory = (e) => {
    const val = String(e.target.value).toLowerCase();
    if (category.includes(val)) {
      setCategory(prev => prev.filter(item => item !== val))
    } else {
      setCategory(prev => [...prev, val])
    }
  }

  const toggleSubCategory = (e) => {
    const val = String(e.target.value).toLowerCase();
    if (subCategory.includes(val)) {
      setSubCategory(prev => prev.filter(item => item !== val))
    } else {
      setSubCategory(prev => [...prev, val])
    }
  }

  const applyFilter = () => {
    if (!Array.isArray(products)) {
      setFilterProducts([]);
      return;
    }

    let productsCopy = products.slice();

    if(showSearch && search){
      productsCopy= productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => {
        const itemCat = String(item?.category || item?.cat || item?.type || '').toLowerCase();
        return category.includes(itemCat);
      });
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => {
        const itemSub = String(item?.subCategory || item?.subcategory || item?.type || '').toLowerCase();
        return subCategory.includes(itemSub);
      });
    }

    setFilterProducts(productsCopy);
  }

  const sortProduct = () => {
      let fpCopy = filterProducts.slice();

      switch(sortType){
        case 'low-high':
          setFilterProducts(fpCopy.sort((a,b) => a.price - b.price));
          break;

        case 'high-low':
          setFilterProducts(fpCopy.sort((a,b) => b.price - a.price));
          break;

        default:
          applyFilter();
          break;
      }
  }

  

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, products, search, showSearch])

  useEffect(() => {
    sortProduct();
  }, [sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* filter */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
          FILTER
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>

        {/* category */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden sm:block'}`}>
          <p className='mb-3 text-sm font-medium'>CATAGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'men'} onChange={toggleCategory} /> men
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'women'} onChange={toggleCategory} /> women
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'kids'} onChange={toggleCategory} /> kids
            </p>
          </div>
        </div>

        {/* sub category */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden sm:block'}`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'topwear'} onChange={toggleSubCategory} /> topwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'bottomwear'} onChange={toggleSubCategory} /> bottomwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'winterwear'} onChange={toggleSubCategory} /> winterwear
            </p>
          </div>
        </div>
      </div>

      {/* rs */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTION'} />

          {/* sorting */}
          <select  onChange={(e)=>setSortType(e.target.value)} className='border border-gray-300 text-sm px-2'>
            <option value="relevant">Sort By :Relevant</option>
            <option value="low-high">Sort By :low to high</option>
            <option value='high-low'>Sort By :high to low</option>
          </select>
        </div>

        {/* products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6'>
          {
            (Array.isArray(filterProducts) ? filterProducts : []).map((item, index) => (
              <ProductItem key={index} name={item?.name} id={item?._id} price={item?.price} image={item?.image} />
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default Collection
