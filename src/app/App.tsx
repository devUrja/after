import React, { Suspense } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import { ToastContainer } from 'react-toastify'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import { theme } from './app.theme'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import PostsData from './components/PostsData'

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <ToastContainer />
      <Navbar />
      <ThemeProvider theme={theme}>
        <PostsData />
        <Loader />
      </ThemeProvider>
    </Suspense>
  )
}

export default App
