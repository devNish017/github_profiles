import { useEffect, useState } from "react";

function Body(){
    const [profile,setprofile]=useState([]);
    const [userInput, setUserInput] = useState(''); 
    const [user,setuser]=useState(null);
    const [error, setError] = useState('');


    async function generateprofile(count){
      let ran=Math.floor(1+Math.random()*1000)
      try{
    const response= await fetch(`https://api.github.com/users?since=${ran}&per_page=${count}`);
    const data= await response.json();
    setprofile(data);
    setuser(null);
      }
      catch(e){
        alert("sorry there is a problem in fetching the data....");
      }
    

    }
    useEffect(()=>{
  generateprofile(10);
  
    },[])

    async function particularuser(user){

      if (!user) { // Input validation: empty input should not trigger the API call
        setError('Please enter a username.');
        return;
    }
      try{
      const response2= await fetch(`https://api.github.com/users/${user}`);
      if(!response2.ok){
        throw new Error("user not found...");
        
      }
      const data2=await response2.json();
      setuser(data2);
      setprofile([]);
      setError(''); 
    }
   catch (e) {
        setuser(null);
        setError('User not found'); // Show error if user doesn't exist
    }

    

  }

    const [count,setcount]=useState('');

return(
   <>
   <div className="search">
    <input type="text" placeholder=" search here" value={count} onChange={(e)=>{setcount(e.target.value)}}></input>
    <button onClick={()=>generateprofile(Number(count))}>Search Profile</button>

    <input type="text" placeholder=" search here for selective profile" value={userInput} onChange={(e)=>{setUserInput(e.target.value)}}></input>
    <button onClick={()=>particularuser(userInput)}>Search Profile</button>
    {error && <div style={{ color: 'red' }}>{error}</div>}
   </div>
   <div className="profile">{
    profile.map((value)=>{
     return( <div key={value.id} className="cards">
        <img src={value.avatar_url}></img>  
        <h2> {value.login}</h2> 
       
        <a href={value.html_url} target="blank">Profile</a>


        </div>)
    })
}
{  user && (
  <div className="username">
  <img src={user.avatar_url} alt="user-avatar"></img>
  <h2> {user.login}</h2> 
       
       <a href={user.html_url} target="blank">Profile</a>


  </div>
)


}
   </div>

  </>
)

}

export default Body;