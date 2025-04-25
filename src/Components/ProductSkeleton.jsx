import React from 'react'

const ProductSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 bg-white shadow-md rounded-xl p-6 animate-pulse">
    
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-80 h-80 bg-gray-200 rounded-xl" />
        </div>

    
        <div className="w-full md:w-1/2 space-y-4">
          <div className="h-6 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-5 bg-gray-200 rounded w-1/3" />
          <div className="h-8 bg-gray-300 rounded mt-4 w-1/2" />
          <div className="h-10 bg-gray-300 rounded w-full mt-6" />
        </div>
      </div>
    </div>
  )
}

export default ProductSkeleton