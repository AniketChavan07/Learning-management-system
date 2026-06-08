import React from 'react'
import {Routes,Route, useMatch} from 'react-router-dom'
import Home from './Pages/student/Home'
import CourseList from './Pages/student/CourseList'
import CourseDetails from './Pages/student/CourseDetails'
import Myenrollments from './Pages/student/Myenrollments'
import Player from './Pages/student/Player'
import Loader from './components/student/Loader'
import Educator from './Pages/educator/Educator'
import Dashboard from './Pages/educator/Dashboard'
import AddCourse from './Pages/educator/AddCourse'
import Mycourse from './Pages/educator/Mycourse'
import Studentsenrollment from './Pages/educator/Studentsenrollment'
import Navbar from './components/student/Navbar'

const App = () => {
  const educator = useMatch('/educator/*')
  return (
    <div className='min-h-screen bg-gray-50 text-default'>
      {!educator && <Navbar/>}
      <div className="h-[0.3px] w-full bg-black"></div>

      
      <Routes>  

        <Route path='/' element ={ <Home/>}/>
        <Route path='/course-list' element ={ <CourseList/>}/>
        <Route path='/course-list/:input' element ={ <CourseList/>}/>
        <Route path='/course/:id' element ={ <CourseDetails/>}/>
         <Route path='/my-enrollments' element ={ <Myenrollments/>}/>
        <Route path='/player/:courseId' element ={ <Player/>}/>
        <Route path='/loading/:path' element ={ <Loader/>}/>
        <Route path='/educator' element={<Educator/>}>   
          <Route index element={<Dashboard/>}/>
          <Route path='add-course' element ={<AddCourse/>}/>
          <Route path='my-course' element ={<Mycourse/>}/>
          <Route path='student-enrollments' element ={<Studentsenrollment/>}/>
        </Route>
        

      </Routes>
    </div>
  )
}

export default App
