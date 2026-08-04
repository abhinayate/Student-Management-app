import { Box } from '@chakra-ui/react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import StudentsListPage from './pages/StudentsListPage'
import AddStudentPage from './pages/AddStudentPage'
import EditStudentPage from './pages/EditStudentPage'
import DashboardPage from './pages/DashboardPage'

function App() {
  return (
    <>
      <Navbar />
      <Box maxW="1100px" mx="auto" px={4} py={6}>
        <Routes>
          <Route path="/" element={<StudentsListPage />} />
          <Route path="/add" element={<AddStudentPage />} />
          <Route path="/edit/:studentId" element={<EditStudentPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </Box>
    </>
  )
}

export default App
