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
        <div className=' bg-white  shadow-card2 rounded-[20px]'>
            <div className="py-6 border-b border-gray-220 mb-6">
                <h1 className="px-6 text-base font-medium "> Account settings
                    {group && ` / ${group}`}
                    {title && ` / ${title}`}</h1>
            </div>
            <div className='pb-6 flex flex-col gap-6'>
                {children}
            </div>

        </div>
    )
}
