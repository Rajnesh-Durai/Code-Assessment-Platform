import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Landing from './features/pages/assessmentPage/Landing'
import ExitAssessmentPage from './features/pages/exitAssessmentPage/ExitAssessmentPage';
import InstructionPage from './features/pages/instructionPage/InstructionPage';
import Error from './features/components/Error';
import SystemCheck from './features/pages/systemCheckPage/SystemCheck';
import Validate from './features/pages/validatePage/Validate';
import Dashboard from './features/pages/dashboardPage/Dashboard';
import AssessmentTab from './features/pages/assessmentTabPage/AssessmentTab';
import LoginPage from './features/pages/landingPage/LoginPage';

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />}></Route>
        <Route path='/take-assessment' element={<AssessmentTab />}></Route>
        <Route path='/systemcheck/:id' element={<SystemCheck/>}></Route>
        <Route path='/validate' element={<Validate/>}></Route>
        <Route path="/instruction" element={<InstructionPage/>}></Route>
        <Route path="/assessment" element={<Landing/>}></Route>
        <Route path="/exit" element={<ExitAssessmentPage/>}></Route>  
        <Route path='/*' element={<Error/>}></Route>      
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
