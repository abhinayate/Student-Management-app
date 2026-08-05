import { useEffect, useState } from 'react'
import { Box, Card, Heading, SimpleGrid, Spinner, Stat, Text } from '@chakra-ui/react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { fetchDashboardStats } from '../services/api'

const GENDER_COLORS = { Male: '#2a78d6', Female: '#eb6834', Other: '#1baf7a' }
const CHART_GRID_COLOR = '#e1e0d9'
const CHART_AXIS_COLOR = '#c3c2b7'
const CHART_MUTED_COLOR = '#898781'
const BAR_COLOR = '#2a78d6'

function renderGenderLabel({ name, percent }) {
  return `${name} ${(percent * 100).toFixed(0)}%`
}

function ChartCard({ title, children }) {
  return (
    <Card.Root>
      <Card.Body>
        <Heading size="md" mb={4}>
          {title}
        </Heading>
        <Box height="280px">
          <ResponsiveContainer width="100%" height="100%">
            {children}
          </ResponsiveContainer>
        </Box>
      </Card.Body>
    </Card.Root>
  )
}

function DashboardPage() {
  const [stats, setStats] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchDashboardStats()
      .then(setStats)
      .catch((err) => setError(err.message))
  }, [])

  if (error) return <Text color="red.500">{error}</Text>
  if (!stats) return <Spinner />

  return (
    <Box>
      <Heading mb={4}>Dashboard</Heading>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} gap={4} mb={6}>
        <Card.Root>
          <Card.Body>
            <Stat.Root>
              <Stat.Label>Total Students</Stat.Label>
              <Stat.ValueText>{stats.total}</Stat.ValueText>
            </Stat.Root>
          </Card.Body>
        </Card.Root>
        {stats.byGender.map((entry) => (
          <Card.Root key={entry.gender}>
            <Card.Body>
              <Stat.Root>
                <Stat.Label>{entry.gender}</Stat.Label>
                <Stat.ValueText>{entry.count}</Stat.ValueText>
              </Stat.Root>
            </Card.Body>
          </Card.Root>
        ))}
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6}>
        <ChartCard title="Students by Gender">
          <PieChart>
            <Pie
              data={stats.byGender}
              dataKey="count"
              nameKey="gender"
              label={renderGenderLabel}
              labelLine={false}
            >
              {stats.byGender.map((entry) => (
                <Cell key={entry.gender} fill={GENDER_COLORS[entry.gender] || CHART_MUTED_COLOR} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ChartCard>

        <ChartCard title="Students by Grade">
          <BarChart data={stats.byGrade}>
            <CartesianGrid stroke={CHART_GRID_COLOR} vertical={false} />
            <XAxis dataKey="grade" tickFormatter={(g) => `Grade ${g}`} stroke={CHART_AXIS_COLOR} tick={{ fill: CHART_MUTED_COLOR }} />
            <YAxis allowDecimals={false} stroke={CHART_AXIS_COLOR} tick={{ fill: CHART_MUTED_COLOR }} />
            <Tooltip />
            <Bar dataKey="count" fill={BAR_COLOR} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartCard>

        <ChartCard title="Students by Section">
          <BarChart data={stats.bySection}>
            <CartesianGrid stroke={CHART_GRID_COLOR} vertical={false} />
            <XAxis dataKey="section" tickFormatter={(s) => `Section ${s}`} stroke={CHART_AXIS_COLOR} tick={{ fill: CHART_MUTED_COLOR }} />
            <YAxis allowDecimals={false} stroke={CHART_AXIS_COLOR} tick={{ fill: CHART_MUTED_COLOR }} />
            <Tooltip />
            <Bar dataKey="count" fill={BAR_COLOR} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartCard>

        <ChartCard title="Admissions Over Time">
          <BarChart data={stats.byMonth}>
            <CartesianGrid stroke={CHART_GRID_COLOR} vertical={false} />
            <XAxis dataKey="month" stroke={CHART_AXIS_COLOR} tick={{ fill: CHART_MUTED_COLOR }} />
            <YAxis allowDecimals={false} stroke={CHART_AXIS_COLOR} tick={{ fill: CHART_MUTED_COLOR }} />
            <Tooltip />
            <Bar dataKey="count" fill={BAR_COLOR} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartCard>
      </SimpleGrid>
    </Box>
  )
}

export default DashboardPage
