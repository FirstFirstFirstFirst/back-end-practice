import { db } from './firebase';
// import type { NextApiRequest, NextApiResponse } from 'next'
import { collection, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const addTodo = async ({ userId, title, description, status }: any) => {
 try {
   await addDoc(collection(db, "todo"), {
     user: userId,
     title: title,
     description: description,
     status: status,
     createdAt: new Date().getTime(),
   });
 } catch (err) { 
  toast.error("Error add Todo")
  console.log(err); 
}
};


const toggleTodoStatus = async ({ docId, status }: any) => {
 try {
   const todoRef = doc(db, "todo", docId);
   await updateDoc(todoRef, {
     status,
   });
 } catch (err) {
   console.log(err);
 }
};


const deleteTodo = async (docId: string) => {
    try {
    const todoRef = doc(db, "todo", docId);
    await deleteDoc(todoRef);
    } catch (err) {
        console.log(err);
    }
    };
 
 
export { addTodo, toggleTodoStatus, deleteTodo };