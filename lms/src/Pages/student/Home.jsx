import React from 'react'
import Hero from '../../components/student/Hero'
import Companies from '../../components/student/Companies'
import Coursessection from '../../components/student/Coursessection'
import Testimonals from '../../components/student/Testimonals'
import CalltoAction from '../../components/student/CalltoAction'
import Footer from '../../components/student/Footer'
const Home = () => {
  return (
    <div className='flex flex-col items-center space-y-7 text-center'>
        <Hero/>
      <Companies  />
      <Coursessection/>
      <Testimonals/>
      <CalltoAction />
      <Footer />
          </div>
  )
}

export default Home
