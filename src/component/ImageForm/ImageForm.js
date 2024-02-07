import {useEffect, useRef} from "react";


import style from "./imageForm.module.css";

import {db} from "../../firebaseInit";
import {doc, updateDoc, arrayUnion, arrayRemove} from "firebase/firestore";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function ImageForm(props){
    
    const {albumId,updateImage,setUpdateImage,setShowImageForm} = props;

    const imageTitleRef = useRef();
    const imageUrlRef = useRef();

    useEffect(()=>{
        if(updateImage){
            imageNameRef.current.value=updateImage.name;
            imageUrlRef.current.value=updateImage.link;
        }
    },[]);
    
    function clearForm(){
        imageNameRef.current.value=null;
        imageUrlRef.current.value=null;
        imageNameRef.current.focus();
    }

    async function handleUpdateSubmit(event){
        event.preventDefault();
        const prevData = {
            name:updateImage.name,
            link:updateImage.link
        };

        const  new_data = {
            name:imageNameRef.current.value,
            link:imageUrlRef.current.value
        };

        const albumRef = doc(db, 'album', albumId);
         updateDoc(albumRef,{
            imageList:arrayUnion(newData)
        });

        updateDoc(albumRef,{
            imageList:arrayRemove(oldData),
            
        });

        toast.success(" Image Updated !")

        setUpdateImage(null);
        
        setShowImageForm(false);

        clearForm();
    }
    
    async function handleSubmit(event){
        event.preventDefault();
        
        const data={
            name:imageNameRef.current.value,
            link:imageUrlRef.current.value
        };

        const albumRef = doc(db, 'album', albumId);
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

                <form onSubmit={updateImage?handleSubmit:handleUpdateSubmit}>
                    <input type="text" name="title" ref={imageTitleRef} required/>
                    <input type="text" name="image_url" ref={imageUrlRef} required/>

                    <button 
                        onClick={clearForm}>Clear
                    </button>

                    <button type="submit">
                        {updateImage?"Update":"Add"}
                    </button>
                </form>
            </div>
        </>
    );
}