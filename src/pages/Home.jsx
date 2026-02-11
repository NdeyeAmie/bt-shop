import React from 'react'
import Header from '../composants/Header'
import Bannier from '../composants/Bannier'
import ProductGrid from '../composants/ProductCard'
import InfiniteCarousel from '../composants/InfiniteCarousel'
import Footer from '../composants/Footer'
// import ProductDetaillle from '../composants/ProductDetaillle'


export default function Home() {
  return (
    <>
     <header className="w-full">
      <Header />
      <Bannier/>
    <ProductGrid/>
    <InfiniteCarousel/>
    <Footer/>
    {/* <ProductDetaillle/> */}
    </header>
    </>
  )
}
