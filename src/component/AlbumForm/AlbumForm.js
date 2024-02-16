import style from "./albumform.module.css"

import {useRef} from "react";


import {db} from "../../firebaseInit";
import {collection , addDoc} from "firebase/firestore";


import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function AlbumForm(){
    const nameRef = useRef();
    function clearForm(event){
        nameRef.current.value = "";
        nameRef.current.focus();
    }

    async function handleSubmit(event){
        event.preventDefault();

        const docRef = await addDoc(collection(db, "albums"), {
            AlbumName: nameRef.current.value,
            imageList:[]
        });
        console.log(docRef);
        toast.success("New Album Added Successfully");
        clearForm();
    }

    return <>
        <ToastContainer />

        <div className={style.form_Container}>
            <h1>Create Your album with a Keyword for specifity</h1>
            <form onSubmit={handleSubmit} className={style.albumForm}>
                <input type="text" name="Name" ref={nameRef} className={style.input_class} />
                <button type="submit" className={style.btn_grad}>Add</button>
                <button type="reset" className={style.reset_button}>Clear</button>
            </form>
        </div>
    </>
}