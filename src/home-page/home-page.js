
import axios from 'axios';
import './home-page.css'
import { useEffect, useState } from 'react';

const sentenceUrl = 'https://api.vvhan.com/api/en?type=sj'
const weatherUrl = 'https://api.vvhan.com/api/weather?ip='
const ipUrl =  `https://ipinfo.io/json`
const bgImageUrl = 'https://api.vvhan.com/api/bing?type=json&rand=sj'
const placeholderBg="https://cn.bing.com/th?id=OHR.MountAbu_ZH-CN1348295593_1920x1080.jpg"

const getIpInfo = (url) => {
  return  axios(url).then(res => {
    return res.data.ip
  })
}

const getSjImage = () => {
  return  axios(bgImageUrl).then(res => {
    return res.data.data
  })
}

function HomePage() {
  const [sentence,updateSentence] = useState({zh:'正在获取今日一句...'})
  const [weather,updateWether] = useState({type:'正在获取天气...'})
  const [bgImage,updateBgImage] = useState({})

  const getWeather = (ip) => {
    axios(weatherUrl+ip).then(res => {
      console.log(res)
      if(res.data.success === false) {
        updateWether({type:'获取天气失败,'+res.data.message,success:false})
        return
      }
      updateWether({...res.data.info,city:res.data.city,success:true})
    })
  }


  
  useEffect(()=>{
    axios(sentenceUrl).then(res => {
      console.log(res.data.data)
      updateSentence(res.data.data)
    }) 

    getIpInfo(ipUrl).then(ip => {
      getWeather(ip)
    })  
    
    getSjImage().then(res => {
      console.log(res)
      updateBgImage(res)
    })
   
  },[])

  return (
    <div className="container" style={{ backgroundImage: `url(${bgImage.url})`}}>
      <div className='weather'>
         { !weather.success? '': `${weather.city} ${weather.date} ${weather.week} ${weather.low}~${weather.high} ` }
         {weather?.type} 
         
     </div>
     {/* <img src="https://api.vvhan.com/api/handWord?text=Hello%E6%9D%8E%E5%87%A1%E6%9D%BE%EF%BC%8C%E4%BD%A0%E5%A5%BD%E5%93%87%EF%BC%81" alt="hello" /> */}
      <div className="overlay">
      </div>
      <div className='content' >
     
       <img className="img" src={bgImage.url|| placeholderBg} alt="每日一图" />
       <p className="img-title"> {bgImage.title} </p>
        <div className='sentence'> 
          <p> {sentence.en} </p>
          <p> {sentence.zh} </p>
        </div>
      </div>
    </div>
  );
}
export default HomePage
