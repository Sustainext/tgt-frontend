import reportimg from 'assets/images/report1.png';
const Methodologused = () => {
  return (
    <>
      <div className='px-3'>
        <div className='box rounded-lg p-4'>
          <h4 className='text-left mb-2'>
            <b>Methodology Used </b>
          </h4>
          <p className='text-left'>
            This report follows the GHG protocol corporate standard and
            specifications for quantification of GHG Emissions. The methodology
            can be summarized as follows:
          </p>
          <div className='mt-3'>
            <img src={reportimg} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Methodologused;
