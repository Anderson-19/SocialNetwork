import React from 'react'

export const HeaderChat = ({ user }) => {
    return (
        <div className={`${ user ? "h-16 border-b flex justify-between items-center w-full px-5 py-2 shadow-sm": "hidden" } `} >
            <div className="flex items-center">
                <img className="h-10 w-10 overflow-hidden rounded-full"
                    src={ user?.avatar }
                    alt="" />
                <p className="font-semibold ml-3 text-slate-600">{ user?.name } { user?.lastname }</p>
            </div>
        </div>
    )
}
