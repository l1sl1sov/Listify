//components
import { WelcomePage } from './pages/main/WelcomePage';
import { ToastContainer, Zoom } from 'react-toastify';
import { WorkspacePage } from './pages/tasks/WorkspacePage';

//styles
import './scss/_base.scss';
import './scss/_index.scss';

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

export default function App() {

  return (
    <><BrowserRouter>
      <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<WelcomePage />} />
          <Route path='/tasks' element={<WorkspacePage />} />
      </Routes>
    </BrowserRouter>

    <ToastContainer
      position="top-center"
      autoClose={3000}
      limit={3}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      transition={Zoom}
    /></>
  )
}
