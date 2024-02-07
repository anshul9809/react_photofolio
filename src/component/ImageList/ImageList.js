import { useEffect, useState } from "react";

import { db } from "../../firebaseInit";
import { doc, updateDoc,arrayRemove, onSnapshot} from "firebase/firestore";

import ImageForm from "../ImageForm/ImageForm";
import Image from "../Image/Image";

import style from "./imageList.module.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function ImageList(props){
    const {openAlbum, setOpenAlbum} = props;
    
    const [showImageForm,setShowImageForm]=useState(false);
    
    const [imageList,setImageList]=useState([]);
    
    const [updateImage,setUpdateImage]=useState(null);
    
    const [search,setSearch]=useState('');
    
    const [isOpen, setIsOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    function handleBackClick(event){
        event.preventDefault();
        setOpenAlbum({albumId: "", show:false});
    }

    useEffect(()=>{
        onSnapshot(doc(db, "albums", openAlbum.albumId), (doc)=>{
            const data= doc.data().imageList;
            setImageList(data);
        })
    }, []);


    async function deleteImage(image){
        const albumRef = doc(db, 'albums', openAlbum.albumId);
        await updateDoc(albumRef,{
            imageList:arrayRemove(image)
        });
        toast.success("Image Successfully Deleted from your Album!");
    }

    function handleImageEdit(image){
        setUpdateImage(image);
        setShowImageForm(true);
    }

    function openLightbox(index){
        setCurrentImageIndex(index);
        setIsOpen(true);
    };
    
    function closeLightbox(){
        setIsOpen(false);
    };



    return (<>
        <ToastContainer />

        <div className={style.btn_container}>
            <button onClick={handleBackClick}>Back to main</button>

            <input type="text" placeholder="Search Image...." onChange={(e)=>setSearch(e.target.value)}/>

            <button onClick={()=>setShowImageForm(!showImageForm)}>{!showImageForm?"Add Image":"Cancel"}</button>
        </div>

        <div>
        {showImageForm && <ImageForm albumId={openAlbum.albumId} 
                                            updateImage={updateImage}
                                            setUpdateImage={setUpdateImage}
                                            setShowImageForm={setShowImageForm} />}

        </div>
        <div className={style.imageList}>
        {imageList.filter((image) => {
                    return search.toLocaleLowerCase() === ''
                    ? image
                    :image.name.toLocaleLowerCase().includes(search);
                    // map function to map over each image and show them inside a card
                }).map((image,i) => <Image image={image} 
                                                key={i}
                                                index={i}
                                                handleImageEdit={handleImageEdit} 
                                                handleImageDelete={deleteImage} 
                                                openLightbox={openLightbox}
                                                />)}
        </div>
        {isOpen && (
                // main container
                <div className={style.lightbox_overlay} onClick={closeLightbox}>
                    <div className={style.lightbox_container}>
                        {/* close button to close the light box */}
                        <button className={style.close_button} onClick={closeLightbox}>
                            Close
                        </button>
                        {/* image of the lightbox */}
                        <img
                            className={style.lightbox_image}
                            src={imageList[currentImageIndex].link}
                            alt={`Image ${currentImageIndex}`}
                        />
                    </div>
                </div>
            )}

    </>);
}