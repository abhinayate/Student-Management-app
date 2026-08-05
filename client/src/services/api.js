const BASE_URL = '/api/students'

async function parseJsonOrThrow(res, fallbackMessage) {
  const body = await res.json().catch(() => ({}))
  if (!res.ok) {
    const message = Array.isArray(body.errors) ? body.errors.join(' ') : body.error || fallbackMessage
    throw new Error(message)
  }
  return body
}

export async function fetchStudents(params = {}) {
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== '' && value != null)
  )
  const query = new URLSearchParams(cleanParams).toString()
  const res = await fetch(`${BASE_URL}${query ? `?${query}` : ''}`)
  return parseJsonOrThrow(res, 'Failed to load students.')
}

export async function fetchStudent(studentId) {
  const res = await fetch(`${BASE_URL}/${studentId}`)
  return parseJsonOrThrow(res, 'Student not found.')
}

export async function createStudent(data) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return parseJsonOrThrow(res, 'Failed to add student.')
}

export async function updateStudent(studentId, data) {
  const res = await fetch(`${BASE_URL}/${studentId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return parseJsonOrThrow(res, 'Failed to update student.')
}

export async function fetchDashboardStats() {
  const res = await fetch(`${BASE_URL}/stats/summary`)
  return parseJsonOrThrow(res, 'Failed to load dashboard stats.')
}

export async function deleteStudent(studentId) {
  const res = await fetch(`${BASE_URL}/${studentId}`, { method: 'DELETE' })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || 'Failed to delete student.')
  }
}
