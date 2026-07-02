import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import humanizeDuration from "humanize-duration";
import {useAuth,useUser} from "@clerk/clerk-react"
export const Appcontext = createContext();

export const Appcontextprovider = ({ children }) => {

  // Currency
  const currency = import.meta.env.VITE_CURRENCY;

  // Courses State
  const [allcourse, setcourse] = useState([]);
  const [iseducator, setiseducator] = useState(true);
  const [enrolled,setenrolled]= useState(true);

const {getToken} = useAuth()
const {user} = useUser()

  // Fetch Courses
  const fetchallcourse = async () => {
    setcourse(dummyCourses);
  };
// function to calculate average ratings for a course
const ratings = (course) => {
  if (course.courseRatings.length === 0) return 0;

  let totalratings = 0;

  course.courseRatings.forEach((item) => {
    totalratings += item.rating;
  });

  return totalratings / course.courseRatings.length;
};


const fetchenrollement =async ()=>{
  setenrolled(dummyCourses)
}
  useEffect(() => {
    fetchallcourse();
    fetchenrollement()
  }, []);

  const logToken = async () =>{
    // console.log(await getToken())
  }

  useEffect(()=>{
    if(user){
      logToken()
    }
  },[user])

//calculate chapter time
const calculatechaptertime = (chapter)=>{
let time = 0;
chapter.chapterContent.map((lecture)=>(time += lecture.lectureDuration))
return humanizeDuration(time*60*1000,{units:["h","m"]})
}

// calculate course duration
const calculatecourseduration =(course)=>{
  let time = 0;
  course.courseContent.map((chapter)=>(chapter.chapterContent.map((lecture)=>(time += lecture.lectureDuration))))
  return humanizeDuration(time*60*1000,{units:["h","m"]})
}

// function no of lectures in a course
const calculatecourselectures =(course)=>{
  let lectures = 0;
  course.courseContent.map((chapter)=>(lectures += chapter.chapterContent.length))
  return lectures;
}

  // Context Value
  const value = {
    currency,
    allcourse,
    ratings,
    iseducator,
    setiseducator,
    calculatechaptertime,
    calculatecourseduration,
    calculatecourselectures,
    enrolled,
    fetchenrollement
  };

  return (
    <Appcontext.Provider value={value}>
      {children}
    </Appcontext.Provider>
  );
};