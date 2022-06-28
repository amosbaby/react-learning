import axios from "axios"
import { useEffect, useState } from "react"

const BASEURL = 'http://hn.algolia.com/api/v1/search?query='
const fetchData =  (url)=>{
  return axios(url) 
}

function HackNews(){

  const [keyword,updateKeyword] = useState('react')
  const [url,updateUrl] = useState(null)
  const [list,updateList] = useState([])
  const [loading,updateLoading] = useState(false)
  const [error,updateError] = useState(null)

  useEffect(()=>{
    if(!url) return
    const query = async ()=>{
      updateError(null)
      updateLoading(true)
      try {
        const result = await fetchData(url)
        updateList(result.data.hits || [])
      } catch (error) {
        updateError('貌似网络出错咯....')
      }
       updateLoading(false)
    }
    query()
  },[url])

  const handleInputChange = (event)=>{
    updateKeyword(event.target.value)
  }

  const onSearch = ()=>{
    updateUrl(`${BASEURL}${keyword}`)
  }

  const renderSearchResult = ()=>{
    return (
      <ul>
        {
      
          list.map(item =>{
            return (
              <li key={item.objectID}> {item.title || item.story_title} </li> 
            )
          })
        }
      </ul>
    )
  }

  const renderLoading = ()=>{
    return (
      <div  style={{color:'orange',textAlign:'center'}}>loading... </div>
    )
  }

  const renderErrorMsg = ()=>{
    return (
      <div  style={{color:'red',textAlign:'center'}}>
        {error}
      </div>
    )
  }

  return (
    <div>
     <div>
        <input style={{padding:'10px', margin:'10px', width:'60%'}}  value={keyword}  placeholder="请输入查询内容" onChange={(e)=>handleInputChange(e)}/>
         <button onClick={()=> onSearch()}> 查询 </button>
     </div>
     { error ? renderErrorMsg() : null }
      {
         loading ? renderLoading() : renderSearchResult()
      }
      
    </div>
  )
}

export default HackNews
