import { useEffect , useState , useMemo,useCallback} from 'react'
const Home = () => {
    const [url,setUrl]=useState('https://plentific-fe-challenge.herokuapp.com/categories')
    const [response,setResponse]=useState();
    const [list,setList]=useState();
    const [postcode,setPostCode]=useState('');
    const [page_count,setPage_count]=useState('');
    const [page, setPage]=useState([])
    const [pages,setPages]=useState({
        page_start: 0,
        page_end: 20
    });
    const [flag,setFlag]=useState(false)
    const [category,setCategory]=useState({
        cat:'select',
        id: ''})

    useEffect(()=>{
        const fetchData=async()=>{
            const json=await fetch(url);
            const response=await json.json();
           let val=response.filter((data)=>data.hidden)
            setResponse(val);
        }
        fetchData();
    }, [url])

    const handleCategory=(e)=>{
     const child=e.target.childNodes[e.target.selectedIndex]
     setCategory({
         cat : e.target.value,
         id: child.getAttribute('id'),


     })
    }
    const handlePostCode=(e)=>{
        setPostCode(e.target.value.toLowerCase().replace(/ /g, ""));
    }




//     const handleSubmit=useCallback(async()=>{
//         console.log('memo');
//         if(category.cat==='select' || !postcode){
//             alert('Please select a Category/Enter Postcode')
//         }
//         else{
//         const response=await fetch('https://plentific-fe-challenge.herokuapp.com/search',{
//         method: 'POST',
//         headers:{
//             'Content-Type': 'application/json',
//             'x-pagination-offset': pages.page_start,
//             'x-pagination-limit': pages.page_end
//         },
//         body:JSON.stringify({
//             category_id: category.id,
//             location: postcode
//         }),
//         })
//         const data=await response.json();
//         setPage_count(Math.ceil(response.headers.get('x-pagination-count')/20));
//         setList(data)
//     }
    
// } 
// ,[pages,category,postcode]
// )




useEffect(()=>{
    const fetchData=async()=>{
        if(!category.id || !postcode ){
            
        }
        else{
        if(category.cat==='select' || !postcode){
            alert('Please select a Category/Enter Postcode')
        }
        else{
    const response=await fetch('https://plentific-fe-challenge.herokuapp.com/search',{
    method: 'POST',
    headers:{
        'Content-Type': 'application/json',
        'x-pagination-offset': pages.page_start,
        'x-pagination-limit': pages.page_end
    },
    body:JSON.stringify({
        category_id: category.id,
        location: postcode
    }),
    })
    const data=await response.json();
    setPage_count(Math.ceil(response.headers.get('x-pagination-count')/20));
    setList(data)
}}}
fetchData()
},[flag]
)

const handleSubmit=()=>{
setFlag(!flag)
}




//     const handleSubmit=async()=>{
//         if(category.cat==='select' || !postcode){
//             alert('Please select a Category/Enter Postcode')
//         }
//         else{
//         const response=await fetch('https://plentific-fe-challenge.herokuapp.com/search',{
//         method: 'POST',
//         headers:{
//             'Content-Type': 'application/json',
//             'x-pagination-offset': pages.page_start,
//             'x-pagination-limit': pages.page_end
//         },
//         body:JSON.stringify({
//             category_id: category.id,
//             location: postcode
//         }),
//         })
//         const data=await response.json();
//         setPage_count(Math.ceil(response.headers.get('x-pagination-count')/20));
//         setList(data)
//     }
// }


const handlePagination=(data)=>{
    setPages({
        page_start: data*20,
        page_end : (data*20)+20
    })
    handleSubmit()
    setFlag(!flag)
   
}
    return ( 
        <div className="home">
               <div className="upper-content">
                   <div className="heading">
                       <h1>Your Site</h1>
                   </div>
                   <div className="inputs">
                       <div className="drop">
                       <label >Category</label>
                       <select  onChange={(e)=> handleCategory(e)}>
                           <option value={category.cat}>Select Category</option>
                       { response?.map(data=>{
                            return(
                            <option key={data.id} id={data.id}>{data.name}</option>
                            )
                       })
                   }
                   </select>
                       </div>
                       <div className="name drop">
                           <label >Postcode</label>
                           <input type="text" value={postcode} onChange={(e)=>handlePostCode(e)}/>
                       </div>
                       <button onClick={(e)=> handleSubmit()}>Submit</button>
                   </div>
                   <div className="table-div">
                       <table>
                           <tbody>
                           <tr className='th-heading'>
                               <th>Id</th>
                               <th>Name</th>
                               <th>Postcode</th>
                               <th>Review Rating</th>
                           </tr>
                           {
                               list?.map((data)=>{
                                   return(
                                       <tr key ={data.id}>
                                           <td>{data.id}</td>
                                           <td>{data.name}</td>
                                           <td>{data.main_address.postcode}</td>
                                           <td>{data.review_rating}</td>
                                       </tr>
                                   )
                               })
                           }
                           </tbody>
                       </table>
                   </div>
                   <div className="pagination">
                   <a href="#">&laquo;</a>
                    {
                        list?.map((data,index)=>{
                            return(
                            <a href="#" key={index} onClick={()=>handlePagination(index)}>{index}</a>
                            )
                        })
                    }
                   <a href="#">&raquo;</a>
                   </div>
               </div>
           </div>
     );
}
 
export default Home;