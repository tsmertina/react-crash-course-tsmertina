import React, { Suspense } from 'react';
import './App.css';
import Loader from './components/Loader';

const RequestPortal = React.lazy(() => import('./components/RequestPortal'));

export default function AppPortal() {
    return (
        <div className="app-portal">
            <Suspense fallback={<Loader processValue={'page loading'} />}>
                <RequestPortal />
            </Suspense>
        </div>
    );
}

