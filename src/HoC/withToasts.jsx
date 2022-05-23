import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const withToasts = ( WrappedComponent ) => {

    return class extends React.Component
    {
        render()
        {
            return (
                <>
                    <WrappedComponent { ...this.props } />
                    <ToastContainer />
                </>
            );
        }
    }

}

export default withToasts;