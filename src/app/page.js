'use client'
import React, { useState } from 'react';

export default function Home() {
  const [msItem, setMsItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const runMicroservice = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Calling /api/microservice...');
      const response = await fetch('/api/microservice');
      console.log('Response status:', response.status);
      console.log('Response:', response);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Data received:', data);
      
      // Handle the response based on your microservice format
      const word = data.word || data.item || JSON.stringify(data);
      setMsItem(word);
      
    } catch (error) {
      console.error('Error calling microservice:', error);
      setError(error.message);
      setMsItem('Error: MS call failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center p-4 pt-12">
      {error && (
        <div className="text-red-500 mb-4 p-4 border border-red-500">
          Error: {error}
        </div>
      )}
      
      {msItem ? (
        <span className='p-8 border border-red-500 border-solid'>
          Word: {msItem}
        </span>
      ) : (
        <span className='border border-red-500 border-solid p-8'>
          {loading ? 'Loading...' : 'Not Loaded'}
        </span>
      )}
      
      <br/>
      <div className='flex flex-row justify-center items-center gap-6 pt-12'>
        <h1>ECS Microservice App</h1>
        <button 
          onClick={() => runMicroservice()} 
          className='border border-black border-solid p-2'
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Activate Microservice'}
        </button>
      </div>
    </div>
  );
}