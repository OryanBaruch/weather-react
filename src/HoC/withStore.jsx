import React from 'react';
import { Provider } from 'react-redux';
import store from '../Redux/store';

const withStore = ( WrappedComponent ) => {

    return class extends React.Component
    {
        render()
        {
            return (
                <Provider store={ store }>
                    <WrappedComponent { ...this.props } />
                </Provider>
            );
        }
    }

}

export default withStore;