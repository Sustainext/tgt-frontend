'use client'
import React, { useState } from 'react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('zoho');

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='mb-4'>
        <button
          className={`px-4 py-2 ${activeTab === 'zoho' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('zoho')}
        >
          Zoho Dashboard
        </button>
        <button
          className={`ml-2 px-4 py-2 ${activeTab === 'powerbi' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('powerbi')}
        >
          PowerBI Dashboard
        </button>
      </div>
      {activeTab === 'zoho' && (
        <iframe
          frameBorder='0'
          width='1200'
          height='700'
          src={`${process.env.NEXT_APP_TRACK_URL}`}
        ></iframe>
      )}
      {activeTab === 'powerbi' && (
        <iframe
          frameBorder='0'
          width='1200'
          height='700'
          src={`${process.env.NEXT_APP_POWERBI_URL}`}
        ></iframe>
      )}
    </div>
  );
};

export default Index;
