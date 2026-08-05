import { useEffect, useState } from 'react'
import { Heading, Spinner, Text } from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import StudentForm from '../components/StudentForm'
import { fetchStudent, updateStudent } from '../services/api'

function EditStudentPage() {
  const { studentId } = useParams()
  const navigate = useNavigate()
  const [student, setStudent] = useState(null)
  const [loadError, setLoadError] = useState('')
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    fetchStudent(studentId)
      .then(setStudent)
      .catch((err) => setLoadError(err.message))
  }, [studentId])

  async function handleSubmit(data) {
    setSubmitError('')
    try {
      await updateStudent(studentId, data)
      navigate('/')
    } catch (err) {
      setSubmitError(err.message)
    }
  }

  if (loadError) return <Text color="red.500">{loadError}</Text>
  if (!student) return <Spinner />

  return (
    <>
      <Heading mb={4}>Edit Student — {student.student_id}</Heading>
      <StudentForm
        defaultValues={student}
        onSubmit={handleSubmit}
        submitLabel="Save Changes"
        submitError={submitError}
      />
    </>
  )
}

export default EditStudentPage
