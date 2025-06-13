
// const person = {
//   name:"Bruce Wayne",
//   age : 19,
//   location:'Lucknow'

// }
// const {name,age,location} = person;

function Search({searchTerm , setSearchTerm}) {
  
  return (
    <div className="search">
      <div>
        <img src="search.png" alt="search"/>
        <input type="text"
        placeholder="Search through thousand of movies"
        value={searchTerm}
        onChange={(e)=>setSearchTerm(e.target.value)}
         />
        
      </div>
    </div>
  )
}
export default Search