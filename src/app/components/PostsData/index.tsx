import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useInView } from 'react-intersection-observer'
import { toast } from 'react-toastify'
import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Box,
  makeStyles,
  Typography,
  TextField,
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { IPostFetchHitsData } from 'app/utility/interface/post-data'
import { GetPostsData } from 'app/services/post-fetch-service'
import { ALL_DATA_FETCHED, COULD_NOT_LOAD_DATA } from 'app/utility/constants'
import { FETCH_DATA_INTERVAL_TIME } from 'app/configs'
import DialogBox from '../DialogBox'
import DatePicker from '../common/DatePickerComponent'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    paddingBottom: '2%',
  },
  tableCell: {
    border: '1px solid #aaa',
    maxWidth: '400px',
    overflowWrap: 'break-word',
  },
  tableRowStriped: {
    background: '#3f51b596',
    cursor: 'pointer',
  },
  tableRow: {
    cursor: 'pointer',
    background: '#ffffff',
  },
  tableHeadCell: {
    textAlign: 'center',
    border: '1px solid #aaa',
    position: 'sticky',
    fontWeight: 600,
  },
  filterDiv: {
    margin: '0px !important',
  },
  searchContainer: {
    paddingBottom: '2%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '3% 0',
  },
  postListContainer: {
    padding: '16px',
  },
  searchInput: {
    width: '100%',
    background: '#ffffff',
    borderRadius: '5px',
  },
  noData: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  autocomplete: {
    background: '#ffffff',
    borderRadius: '5px',
  },
})

interface ITableValueProps {
  value: string
}

const columns = [
  {
    id: 'title',
    label: 'Title',
  },
  {
    id: 'author',
    label: 'Author',
  },
  {
    id: 'url',
    label: 'URL',
    format: (value: ITableValueProps) => (value ? value : '-'),
  },
  {
    id: 'created_at',
    label: 'Created Date',
    format: (value: ITableValueProps) => (value ? value : '-'),
  },
]

const PostsData = React.memo(() => {
  const classes = useStyles()
  const [allPostData, setPostData] = useState<IPostFetchHitsData[]>([])
  const [allPostsFetched, setAllPostsFetched] = useState(false)
  const [selectedRowData, setSelectedRowData] = useState<IPostFetchHitsData>()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [title, setTitle] = useState('')
  const [autoCompleteInput, setAutoCompleteInput] = useState('')
  const [selectedDate, setSelectedDate] = useState(null)
  const currentPage = useRef<number>(null)
  const [lastPost, isLastPostVisible] = useInView()

  const postEndingRef = useCallback(
    (node) => {
      lastPost(node)
    },
    [lastPost]
  )

  const handleGetPostList = useCallback(async () => {
    const page: number = currentPage.current ? currentPage.current : 0
    currentPage.current = page + 1
    try {
      const res = await GetPostsData(page)
      const dataList: IPostFetchHitsData[] = res.data.hits
      if (page >= res.data.nbPages) {
        setAllPostsFetched(true)
        toast.info(ALL_DATA_FETCHED)
      }
      setPostData((existingPosts) => [
        ...existingPosts.filter(
          (item: IPostFetchHitsData) =>
            !dataList.some(
              (i: IPostFetchHitsData) => i.objectID === item.objectID
            )
        ),
        ...dataList,
      ])
    } catch (err) {
      toast.error(COULD_NOT_LOAD_DATA)
    }
  }, [])

  const handleOpenDetailPopup = () => {
    setOpen(true)
  }

  const handleCloseDetailPopup = () => {
    setOpen(false)
  }

  const handleRowClick = useCallback((data: IPostFetchHitsData) => {
    setSelectedRowData(data)
    handleOpenDetailPopup()
  }, [])

  useEffect(() => {
    if (isLastPostVisible && allPostData?.length > 0 && !allPostsFetched) {
      handleGetPostList()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLastPostVisible])

  useEffect(() => {
    let fetchData: any
    if (!allPostsFetched) {
      handleGetPostList()
      fetchData = setInterval(() => {
        handleGetPostList()
      }, FETCH_DATA_INTERVAL_TIME)
    }
    return () => {
      clearInterval(fetchData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allPostsFetched])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value)
  }

  let filteredPosts: IPostFetchHitsData[] = [...allPostData]

  if (search.trim()) {
    filteredPosts = filteredPosts.filter(
      (item) =>
        item.author?.toLowerCase().includes(search.trim().toLowerCase()) ||
        item.url?.toLowerCase().includes(search.trim().toLowerCase()) ||
        item.title?.toLowerCase().includes(search.trim().toLowerCase())
    )
  }

  if (selectedDate) {
    filteredPosts = filteredPosts.filter((item) => {
      const itemCreatedDate = new Date(item.created_at)
        .toISOString()
        .slice(0, 10)

      return selectedDate === itemCreatedDate
    })
  }

  if (autoCompleteInput.trim()) {
    filteredPosts = filteredPosts.filter(
      (item) => item.title?.toLowerCase() === autoCompleteInput?.toLowerCase()
    )
  }

  return (
    <Box className={classes.root}>
      <Box className={classes.postListContainer}>
        <Box className={classes.searchContainer}>
          <TextField
            id="outlined-basic"
            label="Search post"
            variant="outlined"
            name="search"
            value={search}
            onChange={handleSearch}
            className={classes.searchInput}
          />
        </Box>
        <Box className={classes.searchContainer}>
          <>
            <Autocomplete
              freeSolo
              disableClearable
              fullWidth
              value={title}
              options={allPostData.map((post) => post.title)}
              onChange={(event: any, newValue: string | null) => {
                setTitle(newValue)
              }}
              onInputChange={(event: any, newValue: string | null) => {
                setAutoCompleteInput(newValue)
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Title"
                  variant="outlined"
                  InputProps={{ ...params.InputProps, type: 'search' }}
                  className={classes.autocomplete}
                />
              )}
            />
            <DatePicker
              handleChangeDate={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleChangeDate(event)
              }
            />
          </>
        </Box>

        {filteredPosts && filteredPosts.length > 0 ? (
          <Box>
            <TableContainer className={classes.filterDiv}>
              <Table aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        className={classes.tableHeadCell}
                        key={column.id}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredPosts.map((item: any, rowIndex) => (
                    <TableRow
                      hover
                      className={
                        rowIndex % 2
                          ? classes.tableRowStriped
                          : classes.tableRow
                      }
                      tabIndex={-1}
                      key={rowIndex}
                      onClick={() => handleRowClick(item)}
                    >
                      {columns.map((column, columnIndex) => {
                        const value = item[column.id]
                        return (
                          <TableCell
                            className={classes.tableCell}
                            key={`${rowIndex}${columnIndex}`}
                          >
                            {column.format ? column.format(value) : value}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ) : (
          <Box>
            <div className={classes.noData}>
              <Typography variant="body1"> No data found </Typography>
            </div>
          </Box>
        )}
        <div ref={postEndingRef} style={{ opacity: '0' }}>
          End of data
        </div>
      </Box>
      <DialogBox
        open={open}
        close={handleCloseDetailPopup}
        data={selectedRowData}
      />
    </Box>
  )
})

export default PostsData
