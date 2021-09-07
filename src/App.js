import { useEffect, useState } from "react";


export default function App() {
  const [data, setData] = useState()
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSort, setSelectedSort] = useState();
  const tree = {}

  useEffect(()=>
    fetch("https://recruting-test-api.herokuapp.com/api/v1/brands")
      .then(res=> res.json())
      .then(result=>setData(result))
  ,[]) // Получаем данные с сервера

  const searchResult = data && data.filter(i => i.title.toLowerCase().includes(searchQuery.toLowerCase())); // Поиск данных через input

  searchResult && searchResult.forEach(el => 
    tree[el.title[0].toLowerCase()] ? tree[el.title[0].toLowerCase()].push(el) : tree[el.title[0].toLowerCase()] = [el] // Сортируем обьект массива по буквам
  );
  const sortdeArray = Object.keys(tree)  // Получаем ключи обьекта массива

  selectedSort ? sortdeArray.sort((a,b) => b.localeCompare(a)): sortdeArray.sort((a,b) => a.localeCompare(b));  // Сортируем A-Z || Z-A

  const Result = ({item}) => { 
    const [showResults, setShowResults] = useState(); 
    useEffect(()=>{
      if(searchQuery.length >= 1){
        setShowResults(true)
      }
    },[])
    const ShowMainTrue = ()=>{
        return(
          tree[item].map(el => el.main === true) ?  
          tree[item].filter(el => el.main === true).map(item =>  // Если в item флаг main = true, то вывовид его в двух экземплярах 
            <li key={item._id}>
              {item.title} (main: true)
            </li>
          ).slice(0,2) : 
          tree[item].every(el => el.main === true) && tree.slice(0,4).map(item =>  // Если в item флаг main = false, то вывовид его в 5 экземплярах 
            <li key={item._id}>
              {item.title} (main: false)
            </li>
          )
        )
      }
    const ShowAll = ()=>{
        return(
          tree[item].sort().map(item=> // Выводит весь массив данных
            <li key={item._id}>
              {item.title} (main: {item.main ? "true":"false"}) 
            </li>
            )
        )
      }
    return (
       tree[item].length >= 1 ?  
          <ul>
            {showResults ? <ShowAll/> : <ShowMainTrue/> }
            {tree[item].length > 1  ? 
              <div className="ResultMoreBtn" onClick={()=> setShowResults(!showResults)}>...</div> 
            : null}
          </ul> : null
      )
  }

  return (
    <div className="App">
      <div className="Wrapper">
        <input type="text" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}/> 
        <button onClick={()=>setSelectedSort(!true)}>(A-Z)</button>  
        <button onClick={()=>setSelectedSort(!false)}>(Z-A)</button>
          {sortdeArray.map(el=> 
            <div key={el}>
              <b>{el.toUpperCase()}: ({tree[el].length}) </b>
              <div className="Result">
                <Result item={el}/>
              </div>
          </div>
          )}
      </div>
    </div>
  );
}