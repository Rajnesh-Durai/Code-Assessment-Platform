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
import { useMsal } from "@azure/msal-react";
import React ,{useEffect} from 'react';

function App() {
  const { instance, accounts } = useMsal();

  useEffect(() => {
    // Check if the user is logged in
    if (accounts.length > 0) {
      // User is logged in, show an alert
      alert('Successfully logged in!');
    }
  }, [accounts]);
  
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
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
