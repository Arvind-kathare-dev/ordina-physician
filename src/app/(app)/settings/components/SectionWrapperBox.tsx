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
                <h1 className="text-[16px] sm:text-[18px] font-bold text-[#303030] flex flex-wrap items-center gap-y-1 gap-x-2">
                    <span className="whitespace-nowrap">Account settings</span>
                    {title && <span className="text-[#D1D1D6] font-normal mx-0.5">/</span>}
                    {title && <span className="text-[#303030] whitespace-nowrap">{title}</span>}
                </h1>
            </div>
            <div className='p-3 sm:p-0 sm:pb-6 flex flex-col'>
                {children}
            </div>
        </div>
    )
}
