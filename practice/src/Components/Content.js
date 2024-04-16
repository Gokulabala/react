import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";

const Content = () => {
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

  const inputRef = useRef();

  const handleChange = (id) => {
    const itemList = items.map((item) => {
      return item.id === id ? { ...item, checked: !item.checked } : item;
    });
    setItems(itemList);
    localStorage.setItem("todo_list", JSON.stringify(itemList));
  };

  const handleClick = (id) => {
    const deleteItem = items.filter((item) => {
      return item.id !== id;
    });
    setItems(deleteItem);
    localStorage.setItem("todo_list", JSON.stringify(deleteItem));
  };

  const [newItem, setNewItem] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newItem);
    addItem(newItem);
    setNewItem("");
    // localStorage.setItem("todo_list", JSON.stringify(newItem))
  };

  const addItem = (task) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    console.log(id);
    const addNewItem = { id, checked: false, task };
    const listItems = [...items, addNewItem];
    console.log(listItems);
    setItems(listItems);
    localStorage.setItem("todo_list", JSON.stringify(listItems));
  };

  const [search, setSearch] = useState("");


  //useEffect
  useEffect(()=>{
    JSON.parse(localStorage.getItem("todo_list"))
  },[items])


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
      {items.length ? (
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
      ) : (
        <p> Your list is empty</p>
      )}
    </main>
  );
};

export default Content;
