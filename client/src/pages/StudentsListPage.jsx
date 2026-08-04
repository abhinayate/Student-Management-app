import { useCallback, useEffect, useState } from 'react'
import {
  Box,
  Button,
  Card,
  Dialog,
  Heading,
  HStack,
  Input,
  NativeSelect,
  Spinner,
  Stack,
  Table,
  Text,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { deleteStudent, fetchStudents } from '../services/api'

const SORTABLE_COLUMNS = [
  { key: 'student_id', label: 'Student ID' },
  { key: 'name', label: 'Name' },
  { key: 'grade', label: 'Grade' },
  { key: 'section', label: 'Section' },
  { key: 'gender', label: 'Gender' },
  { key: 'admission_date', label: 'Admission Date' },
]

function StudentsListPage() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [search, setSearch] = useState('')
  const [grade, setGrade] = useState('')
  const [section, setSection] = useState('')
  const [gender, setGender] = useState('')
  const [sortBy, setSortBy] = useState('student_id')
  const [order, setOrder] = useState('asc')

  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const loadStudents = useCallback(() => {
    setLoading(true)
    setError('')
    fetchStudents({ search, grade, section, gender, sortBy, order })
      .then(setStudents)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [search, grade, section, gender, sortBy, order])

  useEffect(() => {
    const timeoutId = setTimeout(loadStudents, 300)
    return () => clearTimeout(timeoutId)
  }, [loadStudents])

  function handleSort(column) {
    if (sortBy === column) {
      setOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortBy(column)
      setOrder('asc')
    }
  }

  async function handleConfirmDelete() {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await deleteStudent(deleteTarget.student_id)
      setDeleteTarget(null)
      loadStudents()
    } catch (err) {
      setError(err.message)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <Box>
      <Heading mb={4}>Students</Heading>

      <Stack direction={{ base: 'column', md: 'row' }} gap={3} mb={4}>
        <Input
          placeholder="Search by name, ID, parent, or mobile number"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <NativeSelect.Root width={{ base: '100%', md: '160px' }}>
          <NativeSelect.Field value={grade} onChange={(e) => setGrade(e.target.value)}>
            <option value="">All Grades</option>
            {[6, 7, 8, 9, 10, 11, 12].map((g) => (
              <option key={g} value={g}>
                Grade {g}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
        <NativeSelect.Root width={{ base: '100%', md: '160px' }}>
          <NativeSelect.Field value={section} onChange={(e) => setSection(e.target.value)}>
            <option value="">All Sections</option>
            {['A', 'B', 'C'].map((s) => (
              <option key={s} value={s}>
                Section {s}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
        <NativeSelect.Root width={{ base: '100%', md: '160px' }}>
          <NativeSelect.Field value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Stack>

      {error && (
        <Text color="red.500" mb={4}>
          {error}
        </Text>
      )}
      {loading && <Spinner />}
      {!loading && students.length === 0 && <Text color="gray.600">No students found.</Text>}

      {!loading && students.length > 0 && (
        <>
          <Box display={{ base: 'none', md: 'block' }} overflowX="auto">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  {SORTABLE_COLUMNS.map((col) => (
                    <Table.ColumnHeader key={col.key} cursor="pointer" onClick={() => handleSort(col.key)}>
                      {col.label}
                      {sortBy === col.key ? (order === 'asc' ? ' ▲' : ' ▼') : ''}
                    </Table.ColumnHeader>
                  ))}
                  <Table.ColumnHeader>Actions</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {students.map((student) => (
                  <Table.Row key={student.student_id}>
                    <Table.Cell>{student.student_id}</Table.Cell>
                    <Table.Cell>{student.name}</Table.Cell>
                    <Table.Cell>{student.grade}</Table.Cell>
                    <Table.Cell>{student.section}</Table.Cell>
                    <Table.Cell>{student.gender}</Table.Cell>
                    <Table.Cell>{student.admission_date}</Table.Cell>
                    <Table.Cell>
                      <HStack gap={2}>
                        <Button asChild size="sm">
                          <RouterLink to={`/edit/${student.student_id}`}>Edit</RouterLink>
                        </Button>
                        <Button size="sm" colorPalette="red" onClick={() => setDeleteTarget(student)}>
                          Delete
                        </Button>
                      </HStack>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>

          <Stack display={{ base: 'flex', md: 'none' }} gap={3}>
            {students.map((student) => (
              <Card.Root key={student.student_id}>
                <Card.Body>
                  <Text fontWeight="bold">
                    {student.name} ({student.student_id})
                  </Text>
                  <Text>
                    Grade {student.grade} - Section {student.section} - {student.gender}
                  </Text>
                  <Text color="gray.600" fontSize="sm">
                    Parent: {student.parent_name}
                  </Text>
                  <Text color="gray.600" fontSize="sm">
                    Mobile: {student.mobile_number}
                  </Text>
                  <Text color="gray.600" fontSize="sm">
                    Admitted: {student.admission_date}
                  </Text>
                  <HStack mt={3} gap={2}>
                    <Button asChild size="sm">
                      <RouterLink to={`/edit/${student.student_id}`}>Edit</RouterLink>
                    </Button>
                    <Button size="sm" colorPalette="red" onClick={() => setDeleteTarget(student)}>
                      Delete
                    </Button>
                  </HStack>
                </Card.Body>
              </Card.Root>
            ))}
          </Stack>
        </>
      )}

      <Dialog.Root open={!!deleteTarget} onOpenChange={(e) => !e.open && setDeleteTarget(null)}>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Delete Student</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              Are you sure you want to delete {deleteTarget?.name} ({deleteTarget?.student_id})? This
              cannot be undone.
            </Dialog.Body>
            <Dialog.Footer>
              <Button variant="outline" onClick={() => setDeleteTarget(null)}>
                Cancel
              </Button>
              <Button colorPalette="red" onClick={handleConfirmDelete} loading={deleting}>
                Delete
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger />
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </Box>
  )
}

export default StudentsListPage
