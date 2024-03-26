import React, { useState } from 'react'
import DataHolderComponent from './DataHolderComponent'

const SearchBarComponent = () => {
    const [cityInput, setCityInput] = useState<string>();

    return (
        <div>
            <div className='flex justify-center'>
                <input className='bg-[#F3CAF1]' placeholder='Input City' />
            </div>

            <DataHolderComponent />

        </div>
    )
}

export default SearchBarComponent
