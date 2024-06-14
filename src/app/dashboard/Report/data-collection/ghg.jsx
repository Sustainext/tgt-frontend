const GHG = () => {
  return (
    <>
      <div className='px-3'>
        <div className='box rounded-lg p-4  mb-5'>
          <h4 className='text-left'>
            <b>GHG Emission Activity Data Sources </b>
          </h4>
          <p className='text-left mb-4'>
            The following table shows the sources of emissions for which
            activity data has been collected along with the sources of data:
          </p>
          <p className='text-left mb-2'>Table 3: Emission Sources</p>
          <table className='min-w-full leading-normal border border-slate-200 rounded-lg'>
            <thead className='border-s-slate-200'>
              <tr className='border-s-slate-200'>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider '>
                  Emission Source
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Data Source
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-left'>
                  Energy Indirect GHG emissions - Grid electricity consumption
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  Bills/ Invoices/ Meter information
                </td>
              </tr>
              <tr>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-left'>
                  Energy Indirect GHG emissions - HVAC
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  Bills/ Invoices/ Meter information
                </td>
              </tr>
              <tr>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-left'>
                  Energy Indirect GHG emissions - Purchased backup electricity{' '}
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  Bills/ Invoices/ Meter information
                </td>
              </tr>
              <tr>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-left'>
                  Other indirect GHG emissions from Business Travel - Land
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  Based on the distance travelled/number of trips.
                </td>
              </tr>
              <tr>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-left'>
                  Other indirect GHG emissions from Air travel
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  Based on the distance travelled (itinerary).
                </td>
              </tr>
              <tr>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-left'>
                  Other indirect GHG emissions from Hotel Stays
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  Based on bills.
                </td>
              </tr>
              <tr>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-left'>
                  Other indirect GHG emissions from Waste
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  Based on waste generation data, gate passes and invoices.{' '}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='box rounded-lg p-4  mb-5'>
          <h4 className='text-left'>
            <b>Excluded Sources </b>
          </h4>
          <p className='text-left mb-2'>
            The following sources of emissions have been excluded from the
            calculation of (Organization’s name) total emissions
          </p>
          <form>
            <textarea className='block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'>
              Editable Text Box
            </textarea>
          </form>
        </div>
        <div className='box rounded-lg p-4  mb-5'>
          <h4 className='text-left'>
            <b>Emission Factors Considered</b>
          </h4>

          <p className='text-left mb-2'>Table 4: Emission Factors</p>
          <table className='min-w-full leading-normal border border-slate-200 rounded-lg'>
            <thead className='border-s-slate-200'>
              <tr className='border-s-slate-200'>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider '>
                  Emission Factor Name
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Unit
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Source
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Year
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-left'>
                  Ex: Steam & Heat
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  Ex: kg/MMBTU
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  Ex: EPA
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  Ex: 2022
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default GHG;
