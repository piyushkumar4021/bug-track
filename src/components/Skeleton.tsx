export default function Skeleton() {
  return (
    <div role='status' className='animate-pulse'>
      <div className='h-2.5 bg-gray-200 rounded-full mb-4'></div>
      <span className='sr-only'>Loading...</span>
    </div>
  );
}
