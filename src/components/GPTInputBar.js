import React from 'react'
import { lang } from '../utils/languageConstants';
import { useSelector } from 'react-redux'

const GPTInputBar = () => {
    const langKey=useSelector(store=> store.config.lang);
  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-gray-900 rounded-xl grid grid-cols-12"
      >
        <input
          type="text"
          className=" p-4 m-4 col-span-9 text-black border-0 rounded-md"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="col-span-3 m-5 px-4 bg-red-700 text-white rounded-lg"
        >
        {lang[langKey].search}
        </button>
      </form>
    </div>
  )
}

export default GPTInputBar