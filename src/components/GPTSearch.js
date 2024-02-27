import React from 'react'
import GPTInputBar from './GPTInputBar'
import Suggestions from './Suggestions'
import { BG_URL } from '../utils/constants'

const GPTSearch = () => {
  return (
    <div>
      <div className="absolute -z-10">
        <img src={BG_URL} className="bg-cover" alt="logo" />
      </div>
      <GPTInputBar />
      <Suggestions />
    </div>
  )
}

export default GPTSearch