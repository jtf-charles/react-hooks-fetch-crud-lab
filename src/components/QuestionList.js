import {React,useState,useEffect} from "react";
import QuestionItem from "./QuestionItem"

function QuestionList() {
    const [items,setItems]=useState([]);

useEffect(()=>{
  fetch("http://localhost:4000/questions")
  .then((res)=>res.json())
  .then((data)=> {
  //console.log(data);
  setItems(data);
  //Setisloaded(true)
})
},[])


 function handleDelete(id){
  //console.log(id);
  fetch(`http://localhost:4000/questions/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erreur lors de la suppression");
          }
          // Mets à jour le state local
          const newList=items.filter(item => { return item.id !==id})
          setItems(newList)
        })
        .catch((error) => {
          console.error("Erreur:", error);
        });
    }
 //console.log("after delete")
 //console.log(items);
  return (
    <section>
      <h1>Quiz Questions</h1>
     <ul>
        {items.map(item => {
          return <QuestionItem key={item.id} question={item} deleteItem={handleDelete}/>
        })}
      </ul>
    </section>
  );
}

export default QuestionList;
