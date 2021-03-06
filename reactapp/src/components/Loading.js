import React from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';

export const Loading = (props) => {
    // from: https://github.com/davidhu2000/react-spinners

    const color = '#0077b6';
    const loading = true;

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '2rem',
            }}>
            <span style={{ marginTop: '0.25rem' }}>
                <ScaleLoader height={25} width={2} margin={3} color={color} loading={loading} />
            </span>
            <span style={{ marginLeft: '1rem', fontFamily: 'Spartan-R', fontSize: '2rem', color: 'White' }}>Loading...</span>
        </div>
    );
};

export default Loading;
