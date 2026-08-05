import { useState } from 'react'
import { Heading } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import StudentForm from '../components/StudentForm'
import { createStudent } from '../services/api'

function AddStudentPage() {
  const navigate = useNavigate()
  const [submitError, setSubmitError] = useState('')

  async function handleSubmit(data) {
    setSubmitError('')
    try {
      await createStudent(data)
      navigate('/')
    } catch (err) {
      setSubmitError(err.message)
    }
  }

  return (
    <>
      <Heading mb={4}>Add Student</Heading>
      <StudentForm onSubmit={handleSubmit} submitLabel="Add Student" submitError={submitError} />
    </>
  )
}

export default AddStudentPage
