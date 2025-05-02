import React from 'react'
import './style.css'

//          component: Header 레이아웃          //
export default function index() {

  //          render: Header 레이아웃 렌더링          //  
  return (
    <div id='header'>
        <div className='header-container'>
            <div className='header-left-box'>
                <div className='icon-box'>
                    <div className='icon logo-edu-icon'></div>
                </div>
                <div className='header-logo'>{'JINOs Board'}</div>
            </div>
            <div className='header-right-box'>
                
            </div>
        </div>
    </div>
  )
}
