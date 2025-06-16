import { Search } from 'lucide-react';
// const person = {
//   name:"Bruce Wayne",
//   age : 19,
//   location:'Lucknow'


// }
// const {name,age,location} = person;

function SearchBox({searchTerm , setSearchTerm}) {
  
  return (
    <div className="search">
      <div>
        {/* <img src="/search.svg" alt="search"/> */}
        <Search className="absolute left-2 h-5 w-5 text-gray-200" />
        <input type="text"
        placeholder="Search through thousand of movies"
        value={searchTerm}
        onChange={(e)=>setSearchTerm(e.target.value)}
         />
        
      </div>
    </div>
  )
}
export default SearchBox