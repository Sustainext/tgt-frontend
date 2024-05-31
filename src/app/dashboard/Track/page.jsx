import React from 'react';

const index = () => {
  return (
    <div className='flex justify-center items-center'>
      <iframe
        frameborder='0'
        width='1000'
        height='700'
        src={`${process.env.NEXT_APP_TRACK_URL}`}
      ></iframe>
    </div>
  );
};

export default index;
