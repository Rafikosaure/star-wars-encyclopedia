import React from 'react'
import '../styles/Code.css'
import code from '../data/code.txt'


export default function Code() {


  return (
    <div className='collapse-main'>
      <div className='collapse-bar'>
        <h2 className='collapse-title'>CHARTE DU FORUM</h2>
      </div>
      <div className='collapse-div-text'>
          <object data={code} type="text/plain" aria-label="Alternative Text"/>
      </div>
    </div>
  )
}
