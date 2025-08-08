function ScopeTableSkeleton({ rows = 3 }) {
  return (
    <div className='bg-white shadow-xs rounded-2xl p-6'>
      {/* Assign user button (top-left) */}
      <div className='flex items-center mb-3'>
        <button
          className='rounded px-2 py-0.5 bg-gray-100 text-gray-400 font-medium cursor-not-allowed shadow-inner text-xs'
          disabled
        >
          Assign Tasks
        </button>
      </div>
      {/* Table */}
      <div className='w-full overflow-x-auto'>
        <table className='min-w-full border-separate border-spacing-0'>
          <thead>
            <tr>
              <th className='w-8'></th>
              <th className='text-left text-[#72787E] px-2 py-3 text-xs font-medium'>
                Category
              </th>
              <th className='text-left text-[#72787E] px-2 py-3 text-xs font-medium'>
                Sub-Category
              </th>
              <th className='text-left text-[#72787E] px-2 py-3 text-xs font-medium'>
                Activity
              </th>
              <th className='text-left text-[#72787E] px-2 py-3 text-xs font-medium'>
                Quantity
              </th>
              <th className='text-left text-[#72787E] px-2 py-3 text-xs font-medium'>
                Assignee
              </th>
              <th className='text-left text-[#72787E] px-2 py-3 text-xs font-medium'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(rows)].map((_, i) => (
              <tr className='border-b' key={i}>
                <td className='px-2 py-2'>
                  <span className='block w-5 h-5 rounded border bg-gray-200 animate-pulse'></span>
                </td>
                <td className='px-2 py-3'>
                  <span className='block bg-gray-200 rounded-md w-32 h-5 animate-pulse'></span>
                </td>
                <td className='px-2 py-3'>
                  <span className='block bg-gray-200 rounded-md w-32 h-5 animate-pulse'></span>
                </td>
                <td className='px-2 py-3'>
                  <span className='block bg-gray-200 rounded-md w-60 h-5 animate-pulse'></span>
                </td>
                <td className='px-2 py-3 flex space-x-2'>
                  <span className='block bg-gray-200 rounded-md w-24 h-5 animate-pulse'></span>
                  <span className='block bg-gray-200 rounded-md w-20 h-8 animate-pulse'></span>
                </td>
                <td className='px-2 py-3'>
                  <span className='block bg-[#1A79F6] rounded-md w-24 h-8 animate-pulse opacity-60'></span>
                </td>
                <td className='px-2 py-3 flex space-x-4'>
                  <span className='block bg-gray-200 rounded-full w-7 h-7 animate-pulse'></span>
                  <span className='block bg-gray-200 rounded-full w-7 h-7 animate-pulse'></span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ScopeTableSkeleton;
