import { useState } from 'react'
import './App.css'
import { toast, Toaster } from "sonner"
import { X } from 'lucide-react'
import { Button } from './components/ui/button'
import { errorToaster, successToaster } from '@/widget/toaster'
import { BASE_API_URL, NODE_ENV } from '@/utils/constants'
import { Route, Routes, useSearchParams } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CursorGlow from './widget/CursorGlowEffect'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import AdminPage from './pages/AdminPage'
import { useSubjectStore } from './store/useSubjectStore'
import { useQuestionpoolStore } from './store/useQuestionPoolStore'
import { useQuestionStore } from './store/useQuestionStore'
import ExamPage from './layouts/exam/ExamPage'
import { useExamStore } from './store/useExamStore'
import { MathJaxContext } from 'better-react-mathjax'

const config = {
  tex: {
    inlineMath: [["\\(", "\\)"]],
    displayMath: [["$$", "$$"]],
    processEscapes: true,
    packages: { "[+]": ["ams"] },
  },

};

function App() {
  const {checkAuth} = useAuthStore()
  const {fetchSubjects} = useSubjectStore()
  const {fetchQuestionPool} = useQuestionpoolStore()
  const {fetchQuestion} = useQuestionStore()
  const {fetchExamSchedules} = useExamStore()



  useEffect(() => {
    checkAuth() 
    fetchSubjects()
    fetchQuestionPool()
    fetchQuestion()
    fetchExamSchedules()
  }, [])

  return (
    <>
    <MathJaxContext config={config} >
    <div style={{transition: "all 0.5s"}}>
      {/*Cursorglow here if you like it */}
      <Routes>
        <Route path='/*' element={<HomePage />} />
        <Route path='/admin/*' element={<AdminPage />} />
        <Route path='/exam/:examID' element={<ExamPage />} />
      </Routes>

    <Toaster />
    </div>
    </MathJaxContext>
    
  </>
  )
}


export default App
