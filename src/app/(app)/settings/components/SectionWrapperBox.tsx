import React from 'react'
interface Props {
    title: string;
    children: React.ReactNode;
    group?: string;
}


export const SectionWrapperBox = ({
    title,
    children,
    group
}: Props) => {
    return (
        <div className='bg-white shadow-card2 rounded-[20px] overflow-hidden'>
            <div className="py-4 sm:py-5 px-4 sm:px-6 ">
                <h1 className="text-sm font-bold text-[#858585] flex items-center gap-2">
                    <span>Account Settings</span>
                    {group && <span className="text-gray-300 font-normal">/</span>}
                    {group && <span className="text-[#606060]">{group}</span>}
                    {title && <span className="text-gray-300 font-normal">/</span>}
                    {title && <span className="text-[#528DB5]">{title}</span>}
                </h1>
            </div>
            <div className='p-3 sm:p-0 sm:pb-6 flex flex-col'>
                {children}
            </div>
        </div>
    )
}
