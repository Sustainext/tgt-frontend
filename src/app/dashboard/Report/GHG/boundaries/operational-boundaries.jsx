const Operationalboundaries = () => {
  return (
    <>
      <div className='px-3'>
        <div className='box rounded-lg p-4'>
          <h4 className='text-left mb-2'>
            <b>Operational boundaries </b>
          </h4>
          <p className='text-left mb-4'>
            The following table lists the sites operated by ACME Group and their
            corresponding addresses:
          </p>
          <p className='text-left mb-2'>
            Table 2: Geographical Locations of Offices / Factories
          </p>
          <table className='min-w-full leading-normal border border-slate-200 rounded-lg'>
            <thead className='border-s-slate-200'>
              <tr className='border-s-slate-200'>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider '>
                  Name
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Type of Location
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Address
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-left'>
                  ACME Factory 1
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-left'>
                  Production Facility
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-left'>
                  123 Main St, Las Vegas, NV, US
                </td>
              </tr>
              <tr>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  Acme Factory 2
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  Production Facility
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  456 Industrial Blvd, Bengaluru, KA, IN
                </td>
              </tr>
              <tr>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  Sales Office HQ
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  Sales
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  10 Commercial St, London, ENG, GB
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default Operationalboundaries;
