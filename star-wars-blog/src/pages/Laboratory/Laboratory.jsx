import React from 'react'
import './Laboratory.scss'
import PencilImage from '../../components/PencilImage/PencilImage'

function Laboratory() {
    return (
        <div className='labo-content'>
            <div style={{ border: "1px solid black", width: "50px", height: "50px", padding: "20px", backgroundColor: "black" }}>
                <PencilImage pencilSideSize='50%' />
            </div>
        </div>
    )
}

export default Laboratory
