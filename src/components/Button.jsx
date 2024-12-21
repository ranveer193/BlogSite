import React from 'react'

//children -> text of Button

function Button({
    children,
    type = 'button',
    Bgcolor = 'bg-blue-500',
    textColor = 'text-white',
    className = '',
    ...props
}) {
    return (
        <button
            className={`px-4 py-2 rounded-lg ${Bgcolor} ${textColor} ${className}`}
            {...props} 
            type={type}
        >
            {children}
        </button>
    )
}

export default Button
