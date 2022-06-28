import axios from "axios"
import { useEffect, useReducer, useState } from "react"

const FETCH_START = 'FETCH_START'
const FETCH_SUCCESS = 'FETCH_SUCCESS'
const FETCH_FAILED = 'FETCH_FAILED'

const BASEURL = 'http://hn.algolia.com/api/v1/search?query='
const fetchData =  (url)=>{
  return axios(url) 
}

const initialState = {
  loading: false,
  list:[],
  error:false
}

const fetchDataReducer = (state ,action)=>{
  switch(action.type){
    case FETCH_START:
        return {...state,loading:true,error:false}
    case FETCH_SUCCESS:
        return {...state,loading:false,list:action.data}
    case FETCH_FAILED:
      return {...state, loading:false,error:true}
    default:
      throw new Error('母鸡呀...')
  }
}


function HackNews(){

  const [keyword,updateKeyword] = useState('react')
  const [url,updateUrl] = useState(null)

  const [state,dispatch] = useReducer(fetchDataReducer,initialState)


  useEffect(()=>{
    if(!url) return
    const query = async ()=>{
      dispatch({type:FETCH_START})
      try {
        const result = await fetchData(url)
        dispatch({type:FETCH_SUCCESS,data:result.data.hits})
      } catch (error) {
        dispatch({type:FETCH_FAILED})
      }
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
      
          state.list.map(item =>{
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
        貌似网络出错咯....
      </div>
    )
  }

  return (
    <div>
     <div>
        <input style={{padding:'10px', margin:'10px', width:'60%'}}  value={keyword}  placeholder="请输入查询内容" onChange={(e)=>handleInputChange(e)}/>
         <button onClick={()=> onSearch()}> 查询 </button>
     </div>
      { state.error  ? renderErrorMsg() : null}
      {
        state.loading ? renderLoading() : renderSearchResult()
      }
      
    </div>
  )
}

export default HackNews
