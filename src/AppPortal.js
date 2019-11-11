import React, { Suspense } from 'react';
import './App.css';
const RequestPortal = React.lazy(() => import('./components/RequestPortal'));

export default function AppPortal() {
    return (
        <div className="app-portal">
            <Suspense fallback={<div>Wait while page loading...</div>}>
                <RequestPortal />
            </Suspense>
        </div>
    );
}

