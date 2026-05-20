export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-24 h-24 border-4 border-gray-100 rounded-full"></div>
        <div className="absolute w-24 h-24 border-4 border-t-[#1a8b4c] rounded-full animate-spin"></div>
        <div className="w-12 h-12 bg-green-50 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}
