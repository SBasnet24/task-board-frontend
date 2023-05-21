import { lazy, Suspense } from 'react';
import NavbarComp from './components/common/Navbar';

const TaskBoard = lazy(() => import('./pages/TaskBoard'));

const App = () => {
  return (
    <div className="App">
      <NavbarComp />
      <Suspense fallback={<div>Loading...</div>}>
        <TaskBoard />
      </Suspense>
    </div>
  );
};

export default App;
