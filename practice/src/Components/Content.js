import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import apiRequest from "../apiRequest/apiRequest";

const Content = () => {

    const API_URL = `http://localhost:3500/items`

  const [items, setItems] = useState([]
    //     [{
    //     id:1,
    //     checked: true,
    //     task:'Practice Coding'
    //     },
    //     {
    //     id:2,
    //     checked: false,
    //     task:'Play Football'
    //     },
    //     {
    //     id:3,
    //     checked: false,
    //     task:'Take rest'
    //     }
    //    ]
  );

  const [fetchError, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const inputRef = useRef();

  const handleChange = async(id) => {
    const itemList = items.map((item) => {
      return item.id === id ? { ...item, checked: !item.checked } : item;
    });
    setItems(itemList);
    // localStorage.setItem("todo_list", JSON.stringify(itemList));
    

    const myItem = itemList.filter((item) => item.id===id)
    const updateOptions = {
      method : 'PATCH',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({checked:myItem[0].checked}) 
    }
 
    const result  = await apiRequest(`${API_URL}/${id}`, updateOptions )
    if(result) setFetchError(result)
  
  };

  const handleClick = (id) => {
    const deleteItem = items.filter((item) => {
      return item.id !== id;
    });
    setItems(deleteItem);
    // localStorage.setItem("todo_list", JSON.stringify(deleteItem));
  };

  const [newItem, setNewItem] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newItem);
    addItem(newItem);
    setNewItem("");
    // localStorage.setItem("todo_list", JSON.stringify(newItem))
  };

  const addItem = async (task) => {
    // console.log(items.length)
    // const id = items.length ? items[items.length - 1].id + 1 : 1;
    // console.log(id);
    const addNewItem = {id: `${items.length + 1}`, checked: false, task };
    const listItems = [...items, addNewItem];
    console.log(listItems);
    setItems(listItems);
    // localStorage.setItem("todo_list", JSON.stringify(listItems));
    
    const postOptions = {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(addNewItem)
    }

    const result = await apiRequest(API_URL, postOptions)
    console.log(result)
    if(result) setFetchError(result)
  };

  const [search, setSearch] = useState("");


  //useEffect
  useEffect(()=>{
    //fetching data from Api
    const fetchItems = async()=>{
        try {
            const response = await fetch(API_URL)
            if(!response.ok) throw Error("Date not fetched") 
            const listItems = await response.json()
            setItems(listItems)
            setFetchError(null)
        } catch (error) {
            setFetchError(error.message)
        } finally{
          setIsLoading(false)
        }
    }
    //calling the fetchItems function
    setTimeout(()=>{
      (async()=>  await fetchItems())()
    },2000)  
    
  
  },[])

  


  return (
    <main>
       
      <form className="addForm" onSubmit={handleSubmit}>
        <label htmlFor="addItem"> Add Item</label>
        <input
            autoFocus
            ref={inputRef}
          required
          onChange={(e) => setNewItem(e.target.value)}
          type="text"
          id="addItem"
          placeholder="Add item"
          value={newItem}
        />
        <button 
        type="submit" 
        onClick={()=>inputRef.current.focus()}
        >
          <FaPlus  />
        </button>
      </form>
      {/* search Item */}
      <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search">Search</label>
        <input
        
          type="text"
          placeholder="search Item"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
      </form>
      {isLoading && <p>Loading data...</p>}
      {fetchError && <p>{`Error:${fetchError}`}</p> } 
      {!isLoading && !fetchError &&  items.length>0 && (
        <ul>
          {items
            .filter((item) =>
              item.task.toLowerCase().includes(search.toLowerCase())
            )
            .map((item) => (
              <li key={item.id}>
                <input
                  onChange={() => handleChange(item.id)}
                  type="checkbox"
                  checked={item.checked}
                />
                <label
                  style={
                    item.checked ? { textDecoration: "line-through" } : null
                  }
                  onDoubleClick={() => handleChange(item.id)}
                >
                  {item.task}
                </label>
                <FaTrashCan
                  role="button"
                  tabIndex="0"
                  onClick={() => handleClick(item.id)}
                />
              </li>
            ))}
        </ul>
      )}
       {!isLoading && !fetchError && items.length===0 && <p> Your list is empty</p>
      }
     
    </main>
  );
};

export default Content;
