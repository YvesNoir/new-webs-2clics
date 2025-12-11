export default function PreviewSkeleton() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      {/* Header Skeleton */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Skeleton */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-300 rounded-lg"></div>
              <div className="w-32 h-6 bg-gray-300 rounded"></div>
            </div>

            {/* Navigation Skeleton */}
            <div className="hidden lg:flex items-center space-x-8">
              <div className="w-16 h-4 bg-gray-300 rounded"></div>
              <div className="w-20 h-4 bg-gray-300 rounded"></div>
              <div className="w-18 h-4 bg-gray-300 rounded"></div>
              <div className="w-12 h-4 bg-gray-300 rounded"></div>
              <div className="w-20 h-4 bg-gray-300 rounded"></div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <div className="w-6 h-6 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section Skeleton */}
      <div className="relative bg-gradient-to-br from-orange-50 to-orange-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Title Skeleton */}
            <div className="w-3/4 mx-auto h-12 bg-gray-300 rounded mb-6"></div>
            <div className="w-1/2 mx-auto h-12 bg-gray-300 rounded mb-8"></div>

            {/* Subtitle Skeleton */}
            <div className="w-2/3 mx-auto h-6 bg-gray-300 rounded mb-12"></div>

            {/* Search Box Skeleton */}
            <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="h-12 bg-gray-300 rounded-lg"></div>
                <div className="h-12 bg-gray-300 rounded-lg"></div>
                <div className="h-12 bg-gray-300 rounded-lg"></div>
                <div className="h-12 bg-orange-300 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Section Skeleton */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-12">
            <div className="w-64 mx-auto h-8 bg-gray-300 rounded mb-4"></div>
            <div className="w-96 mx-auto h-5 bg-gray-300 rounded"></div>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white rounded-xl overflow-hidden shadow-lg">
                {/* Image Skeleton */}
                <div className="h-48 bg-gray-300"></div>

                <div className="p-6">
                  {/* Price Skeleton */}
                  <div className="w-24 h-6 bg-gray-300 rounded mb-3"></div>

                  {/* Title Skeleton */}
                  <div className="w-full h-5 bg-gray-300 rounded mb-2"></div>
                  <div className="w-3/4 h-5 bg-gray-300 rounded mb-4"></div>

                  {/* Location Skeleton */}
                  <div className="w-1/2 h-4 bg-gray-300 rounded mb-4"></div>

                  {/* Features Skeleton */}
                  <div className="flex space-x-4 mb-4">
                    <div className="w-12 h-4 bg-gray-300 rounded"></div>
                    <div className="w-12 h-4 bg-gray-300 rounded"></div>
                    <div className="w-16 h-4 bg-gray-300 rounded"></div>
                  </div>

                  {/* Button Skeleton */}
                  <div className="w-full h-10 bg-gray-300 rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="w-32 h-6 bg-gray-700 rounded mb-4"></div>
              <div className="space-y-2">
                <div className="w-full h-4 bg-gray-700 rounded"></div>
                <div className="w-3/4 h-4 bg-gray-700 rounded"></div>
                <div className="w-1/2 h-4 bg-gray-700 rounded"></div>
              </div>
            </div>

            {/* Links Columns */}
            {[1, 2, 3].map((col) => (
              <div key={col}>
                <div className="w-20 h-5 bg-gray-700 rounded mb-4"></div>
                <div className="space-y-2">
                  <div className="w-16 h-4 bg-gray-700 rounded"></div>
                  <div className="w-20 h-4 bg-gray-700 rounded"></div>
                  <div className="w-18 h-4 bg-gray-700 rounded"></div>
                  <div className="w-24 h-4 bg-gray-700 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}