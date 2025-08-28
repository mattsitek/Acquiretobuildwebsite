export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A73E8] mx-auto"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  )
}
