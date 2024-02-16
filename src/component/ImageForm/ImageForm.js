import {useEffect, useRef} from "react";


import style from "./imageForm.module.css";

import {db} from "../../firebaseInit";
import {doc, updateDoc, arrayUnion, arrayRemove} from "firebase/firestore";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function ImageForm(props){
    console.log("props in imageform", props);
    
    const {albumId,updateImage,setUpdateImage,setShowImageForm} = props;

    const imageTitleRef = useRef();
    const imageUrlRef = useRef();

    useEffect(()=>{
        if(updateImage){
            imageTitleRef.current.value=updateImage.name;
            imageUrlRef.current.value=updateImage.link;
        }
    },[]);
    
    function clearForm(){
        imageTitleRef.current.value=null;
        imageUrlRef.current.value=null;
        imageTitleRef.current.focus();
    }

    async function handleUpdateSubmit(event){
        console.log("name is ", imageTitleRef.current.value);
        event.preventDefault();
        const prevData = {
            name:updateImage.name,
            link:updateImage.link
        };

        const new_data = {
            name:imageTitleRef.current.value,
            link:imageUrlRef.current.value
        };

        const albumRef = doc(db, 'albums', albumId);
         updateDoc(albumRef,{
            imageList:arrayUnion(new_data)
        });

        updateDoc(albumRef,{
            imageList:arrayRemove(prevData),
            
        });

        toast.success(" Image Updated !")

        setUpdateImage(null);
        
        setShowImageForm(false);

        clearForm();
    }
    
    async function handleSubmit(event){
        event.preventDefault();
        
        const data={
            name:imageTitleRef.current.value,
            link:imageUrlRef.current.value
        };

        const albumRef = doc(db, 'albums', albumId);
        console.log("album ref is ", albumRef);
        await updateDoc(albumRef,{
            imageList:arrayUnion(data)
        });

        toast.success("New Image Added to your Album!")
        
        clearForm();

    } 

    return (
        <>
            <ToastContainer />

            <div className={style.form_Container}>
                <h1 className={style.form_Heading}>{!updateImage?"Add an Image":"Update Image"}</h1>

                <form className={style.imageForm} onSubmit={updateImage?handleUpdateSubmit:handleSubmit}>
                    <input type="text" ref={imageTitleRef} className={style.input_class} required placeholder="Title"/>
                    <input type="text" ref={imageUrlRef} className={style.input_class} required placeholder="URL of image"/>

                    <button type="submit" className={style.btn_grad}>
                        {updateImage?"Update":"Add"}
                    </button>
                    <button className={style.clear_button}
                        onClick={clearForm}>Clear
                    </button>

                </form>
            </div>
        </>
    );
}