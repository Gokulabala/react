import React from 'react'
import { useState } from 'react'
import { FaTrashCan } from "react-icons/fa6";

const Content = ()=>{

    const [items, setItems] = useState([{
        id:1,
        checked: true,
        task:'Practice Coding'
    },
    {
        id:2,
        checked: false,
        task:'Play Football'
    },
    {
        id:3,
        checked: false,
        task:'Take rest'
    }
])

const handleChange = (id)=>{
    const itemList = items.map((item)=>{
       return item.id===id? {...item, checked:!item.checked} : item
    })
    setItems(itemList)
}

const handleClick = (id)=>{
    const deleteItem = items.filter((item)=>{
        return item.id!==id
    })
    setItems(deleteItem)
    localStorage.setItem("todo_list", JSON.stringify(deleteItem))
}

    return(
        <main>
            {
                items.length?(
            
                    <ul>
                        {items.map((item)=>(
                            <li key ={item.id}>
                            <input onChange={()=>handleChange(item.id)} type='checkbox' checked={item.checked}/>
                            <label style={(item.checked)? {textDecoration:"line-through"} : null} onDoubleClick={()=>handleChange(item.id)}>{item.task}</label>
                            <FaTrashCan role='button' tabIndex='0' onClick={()=>handleClick(item.id)} />
                        </li>
                        ))}    
                    </ul> 
                     ) :
                    <p> Your list is empty</p>
            }    
        </main>

    )
}

export default Content