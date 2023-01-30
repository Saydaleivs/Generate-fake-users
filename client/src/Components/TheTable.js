import * as React from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import useGenerateUsers from '../Hooks/useGenerateUsers'
import { v4 as uuid, v4 } from 'uuid'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

export default function CustomizedTables({
  details,
  pageNumber,
  setPageNumber,
}) {
  const { loading, error, hasMore, users } = useGenerateUsers(
    details,
    pageNumber
  )

  const observer = React.useRef()
  const lastUserElement = React.useCallback(
    (node) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore]
  )
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Index</StyledTableCell>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Address</StyledTableCell>
            <StyledTableCell>Phone number</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => {
            if (users.length === index + 1) {
              return (
                <StyledTableRow key={user.id}>
                  <StyledTableCell component='th' scope='row'>
                    {user.index}
                  </StyledTableCell>
                  <StyledTableCell>{user.id}</StyledTableCell>
                  <StyledTableCell>{user.name}</StyledTableCell>
                  <StyledTableCell>{user.address}</StyledTableCell>
                  <StyledTableCell>{user.phone}</StyledTableCell>
                </StyledTableRow>
              )
            } else {
              return (
                <StyledTableRow key={user.id} ref={lastUserElement}>
                  <StyledTableCell component='th' scope='row'>
                    {user.index}
                  </StyledTableCell>
                  <StyledTableCell>{user.id}</StyledTableCell>
                  <StyledTableCell>{user.name}</StyledTableCell>
                  <StyledTableCell>{user.address}</StyledTableCell>
                  <StyledTableCell>{user.phone}</StyledTableCell>
                </StyledTableRow>
              )
            }
          })}
          <StyledTableRow>
            <StyledTableCell>{loading && 'Loading...'}</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>{error && 'error!'}</StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
