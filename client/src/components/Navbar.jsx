import { Box, Flex, HStack, Heading, Link } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

const linkStyle = ({ isActive }) => ({
  fontWeight: isActive ? 700 : 400,
  textDecoration: isActive ? 'underline' : 'none',
})

function Navbar() {
  return (
    <Box bg="teal.600" color="white" px={4} py={3}>
      <Flex
        maxW="1100px"
        mx="auto"
        direction={{ base: 'column', sm: 'row' }}
        align="center"
        justify="space-between"
        gap={3}
      >
        <Heading size="md">Student Management</Heading>
        <HStack gap={5} wrap="wrap" justify="center">
          <Link as={NavLink} to="/" style={linkStyle} end>
            Students
          </Link>
          <Link as={NavLink} to="/add" style={linkStyle}>
            Add Student
          </Link>
          <Link as={NavLink} to="/dashboard" style={linkStyle}>
            Dashboard
          </Link>
        </HStack>
      </Flex>
    </Box>
  )
}

export default Navbar
