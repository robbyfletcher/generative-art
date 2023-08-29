import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Gallery, { Showcase } from './gallery';

const App = () => (
  <div className='h-screen'>
    <div className='flex justify-center pb-6'>
      <div className='flex justify-between p-4 md:w-3/4 w-full md:rounded-b-lg bg-white'>
        <div className='text-xl font-light'>
          <Link to='/'>
            robby fletcher
          </Link>
        </div>
        <div className='text-right text-md font-light'>
          generative art gallery
        </div>
      </div>
    </div>
    <div className='flex justify-center h-5/6'>
      <Routes>
        <Route path='' element={<Gallery />} />
        <Route path="/:sketch" element={<Showcase />} />
      </Routes>
    </div>
  </div>
)

export default App;
