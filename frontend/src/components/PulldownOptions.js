import React from 'react';

export const PulldownOptions = (props) =>{
    return(
        <>
            {props.options.length !== 1 ? <option defaultValue>選択して下さい...</option>:''}
            {              
                props.options.map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                ))
            }
        </>
    )
}