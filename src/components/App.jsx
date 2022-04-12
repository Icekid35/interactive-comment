import React,{useState,useRef,useEffect} from 'react';
import './App.css';
var currentuser

function Popup(props) {
  useEffect(() => {
    console.log(data)
  },[])
  let {setshowpop,show}=props
  return (
    < div style={{display:show ? "":"none"}}>
      <div onClick={() => {
        setshowpop(false)
      }} className='popup' >
        </div>
      <div className='popupbox' >
          <div className='pophead' >
            Delete comment
   </div>
          <div className="poptext">
            Are you sure you want to delete this comment? This will remove the comment and can't be undone.

          </div>
          <div className='buttons'>
          <button onClick={() => {
           setshowpop(false) 
          }
          }className='popbutton'  >
              No, Cancel
            </button>
          <button onClick={() => {
            props.delete()
           setshowpop(false) 
          }
          }
            className='popbutton'  >
            Yes, Delete
            </button>
          </div>
      </div>
    
    </div>
  )
}
function CommentBox(props) {
  
  let textref=useRef()
  let { text, initial, replies ,changereply,hidereply} = props
let [update,reupdate]=useState(0)
  

  return (
    <>
  
      <div data-reply className="box commentholder"> 
     
      <img alt='img' src={currentuser.image.png} />

        <textarea ref={ textref} defaultValue={initial ? `@${initial}  ` : '' } placeholder="Type in you comment">

        </textarea>
     
        <button onClick={(e) => {

        if(textref.current.value==`@${initial}  ` ) return
          changereply({
            "id": Math.random()*10,
            "content":textref.current.value,
            "createdAt": "just now",
            "score": 0,
            "user":currentuser,
          })
          if (hidereply) {
            hidereply(false)
          }
       
          reupdate(1)
          textref.current.value=''
        }} className="btn">
      {text ? text: ''}
</button>
         </div>
         {/* { setTimeout(()=>textref.focus(),1000)} */}
      </>
  )

}



function Card(props) {
  let [showreply,setshowreply]=useState(false)
  let [showpop, setshowpop] = useState(false)
  let [tools,setTools]=useState(false)
  let ref = useRef()
  let [addreview,setaddReview]=useState(false)
  let [removereview,setremoveReview]=useState(false)
  let [review,setReview]=useState(false)
  let { comment } = props
  let [change,setChange]=useState(0)
  // useEffect((e) => {
  //   setReview(!review)
  //   alert('hi')
  // },[addreview,removereview])
  function deletecurrent() {
    props.delete(comment.id)

  }

  useEffect(() => {
    console.log(data)
  }, [])
  function deletecurren(id) {
 if(!comment.replies[id])return
    comment.replies.splice(id,1)
    setChange(Math.random())
  }
  
  return (
    <>
      <Popup delete={deletecurrent} setshowpop={setshowpop} show={ showpop}/>
    <div data-reply={props.data-reply!= undefined ? 'true' : 'no'}  className="commentholder">
    <div className='bigscreen rateholder'>
      <div className="inner">

            <button onClick={(e) => {
              if(removereview) return
     if(currentuser.username == comment.user.username ) return
              e.target.style.color = !addreview ? 'red' : ''
              comment.score=!addreview ? comment.score+1:comment.score-1
              setaddReview(!addreview)
            }} className="incr">+</button>
            <div className='rate'>{comment.score}</div>
      <button onClick={(e) => {
              if(addreview) return
              if(currentuser.username == comment.user.username ) return
              e.target.style.color = !removereview ? 'red' : ''
              comment.score=removereview ? comment.score+1:comment.score-1
              setremoveReview(!removereview)
            }} className="decr">-</button>
      </div>
    </div> 
    <div className='othersholder'>
      <div className='topbar' >
        <div className='firstbar'>
          <img alt='user'src={comment.user.image.png} />
            <div className='name'>{comment.user.username}</div>
              {currentuser.username == comment.user.username ?
                <div className='you' >you</div> : ''}
              <div className='date' >{comment.createdAt} { comment.edited ? <b>Edited</b>:''}</div>
         
            </div>
       
       
            <div className="bigscreen reply ">
              {currentuser.username==comment.user.username ?
                <>
               {tools ? <button onClick={(e) => {
                    comment.content = ref.current.innerText
                    comment.createdAt = 'just now '
                    comment.edited=true
                                     ref.current.contentEditable = false
                                     ref.current.focus()
                                     setTools(false)
                  }} className="btn">
                    Edit
                  </button> :
                    <>
            <div onClick={(e) => {
                    setshowpop(true)
              }} className="delete">
              <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"  /></svg>
              <span>
              Delete
            </span>
            </div>
            <div onClick={(e) => {
                    ref.current.contentEditable = true
                    ref.current.focus()
                    setTools(true)
                  }}
                    className="edit">
              <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"  /></svg>
              <span>
             Update
            </span>
                      </div>
                      </>
                  }
                </>
                :
                <div onClick={(e) => {
                  setshowreply(!showreply)
            }}>
              <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" /></svg>
              <span>
                Reply
                  </span>
                  </div>
         }
            </div>
         
      </div>
      {/* end of the header */}

          <div  className='text'>
            {props.for ? <span contentEditable={false} className='for' >
            @{props.for } 
          </span> :' '} <span ref={ref}> {comment.content}</span>
           </div>
        <div className='residue '>
       <div  className='  rateholder'>
      <div className="inner">

      <button onClick={(e) => {
              if(removereview) return
              if(currentuser.username == comment.user.username ) return
              e.target.style.color = !addreview ? 'red' : ''
              comment.score=!addreview ? comment.score+1:comment.score-1
              setaddReview(!addreview)
                }} className="incr">+</button>
                <div className='rate'>{comment.score}</div>
      <button  onClick={(e) => {
              if(addreview) return
              if(currentuser.username == comment.user.username ) return
              e.target.style.color = !removereview ? 'red' : ''
              comment.score=removereview ? comment.score+1:comment.score-1
              setremoveReview(!removereview)
                }} className="decr">-</button>
      </div>
    </div> 
         
          
            <div  className="reply smallscreen">
            {currentuser.username==comment.user.username ?
                <>
                  {tools ? <button onClick={(e) => {
                    comment.content = ref.current.innerText
                    comment.createdAt = 'just now '
                    comment.edited=true
                                     ref.current.contentEditable = false
                                     ref.current.focus()
                                     setTools(false)
                  }} className="btn">
                    Edit
                  </button> :
                    <>
            <div onClick={(e) => {
                    setshowpop(true)
              }} className="delete">
              <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"  /></svg>
              <span>
              Delete
            </span>
            </div>
            <div onClick={(e) => {
                    ref.current.contentEditable = true
                    ref.current.focus()
                    setTools(true)
                  }}
                    className="edit">
              <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"  /></svg>
              <span>
            Update
            </span>
                      </div>
                      </>
                  }
              </>
              :
              <div onClick={(e) => {
                setshowreply(!showreply)
          }}>
            <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" /></svg>
            <span>
              Reply
                </span>
           
                </div>
       }
          </div>
      
        </div>
             {/* <button className="btn">
      reply
</button> */}
      </div>
      </div>
      {showreply ?
        <CommentBox text='reply' hidereply={setshowreply} changereply={props.changereply} replies={ comment.replies}  />
        : ''}
                          {comment.replies && comment.replies.map((com,index)=> {
                         function changereply(value) {
                            if (com.replies==undefined) com.replies=[]
                            com.replies.unshift(value)
                                     setChange(Math.random())
                         }
                            function deletecur(id) {
                              deletecurren(index)
                            }
                            return (
                        <Card key={com.id} delete={deletecur} changereply={changereply} data-reply={true} comment={com} for={comment.user.username} />
                      )
                    })
                    }
    </>


  )
}
var data
function App() {
let[change,setChange]=useState(0)
  let [ready,setReady]=useState(false)
  var db = async function () {
    if (data != undefined) return null;
    
    return (await import('../data.json').then((res) => {
      data = res;
    currentuser=res.currentUser
    }).then(() => {
      // if (data != undefined)   return
   setReady(true)
      
      console.log(data)
    }))
  }
  db()
  function addcomment(value) {
    data.comments.unshift(value)
    setChange(Math.random())
    document.querySelector('.commentholder').scrollIntoView({block:'nearest',behaviour:'smooth'})
  }
  function deletecurrent(id) {
 
    data.comments.splice(id,1)
    setChange(Math.random())
  }

    document.querySelectorAll('button').forEach(btn => {
      btn.arialButton = "true"
      btn.setAttribute('arial-button', 'true')
 
 
      
})
    

  return (
    <>
  <h1 style={{display:'none'}}>bla bla</h1>
    <div className="App">
        <div className="container">
          {ready ?
            <>
              {data.comments.map((comment ,index)=> {
                function deletecur(id){
                deletecurrent(index)
                     
                    
                }
                function changereply(value) {
                   if (comment.replies==undefined) comment.replies=[]
                   comment.replies.unshift(value)
                  setChange(Math.random())
                }
                return (
                  <>
                    <Card delete={deletecur} changereply={changereply} key={comment.id} comment={comment} />

                  </>
                 
                )
              })}
              
              <CommentBox changereply={addcomment} text='Send' />
        
            </>
            : ''}
      
         
        


    </div>
    </div>
</>
      );
}

export default App;
