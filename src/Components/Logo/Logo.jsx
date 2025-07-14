import React, { Component } from 'react'
import logo from '../../assets/logo.png'

export class Logo extends Component {
  render() {
    return (
      <div className='flex items-center gap-2'>
        <img className='w-10' src={logo} alt="" />
        <h2 className='text-2xl text-[#ad4df1] md:text-4xl font-bold'>Postopia</h2>
      </div>
    )
  }
}

export default Logo