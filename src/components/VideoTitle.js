import React from 'react'

const VideoTitle = ({title,overview}) => {
  return (
    <div className='w-full aspect-video pt-[20%] px-20 absolute text-white bg-gradient-to-r from-black'>
        <h1 className='text-4xl font-bold'>{title}</h1>
        <p className='text-md py-6 w-1/4'>{overview}</p>
        <div className=''>
            <button className="border-grey-100 bg-white rounded-xl  text-black p-3 px-12 text-lg font-bold mx-2 hover:bg-opacity-60">  Play </button>
            <button className="border-grey-100  bg-gray-800 rounded-xl bg-black-400 text-white p-3 px-12 text-lg font-bold mx-2 hover:bg-gray-700">  More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle