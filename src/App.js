import React, { Suspense } from 'react';
import './App.css';
import Loader from './components/Loader';
import store from './store';
import {Provider} from 'react-redux';

const RequestClassBased = React.lazy(() => import('./components/classBased/RequestClassBased'));

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<Loader processValue="page loading" />}>
        <RequestClassBased />
      </Suspense>
    </Provider>
  );
}

export default App;
