import React, { Suspense } from 'react';
import './App.css';
import Loader from './components/Loader';

const RequestFuncBased = React.lazy(() => import('./components/funcBased/RequestFuncBased'));

export default function AppPortal() {
    return (
        <div className="app-portal">
            <Suspense fallback={<Loader processValue={'page loading'} />}>
                <RequestFuncBased />
            </Suspense>
        </div>
    );
}

