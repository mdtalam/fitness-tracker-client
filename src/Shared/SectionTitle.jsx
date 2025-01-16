import React from 'react';

const SectionTitle = ({title,subTitle}) => {
    return (
        <div>
            <h1 className='text-3xl font-bold text-center text-gray-800 mb-4'>{title}</h1>
            <p className='text-lg text-center text-gray-800 mb-8'>{subTitle}</p>
        </div>
    );
};

export default SectionTitle;