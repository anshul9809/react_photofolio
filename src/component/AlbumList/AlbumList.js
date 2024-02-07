
import { useEffect, useState } from "react";


import style from "./albumList.module.css"

import { db } from "../../firebaseInit";
import { collection, onSnapshot} from "firebase/firestore";


import ImageList from "../ImageList/ImageList";
import AlbumForm from "../AlbumForm/AlbumForm";
import Album from "../album/album";

export default function AlbumList(){
    const [albumList, setAlbumList] = useState([]);
    
    const [showAlbumForm, setAlbumForm] = useState(false);

    const [openAlbum, setOpenAlbum] = useState({albumId:"",open:false}); 

    useEffect(()=>{
        const unsub = onSnapshot(collection(db, "albums"), (snapshot)=>{
            const card = snapshot.docs.map((doc)=>{
                return {
                    id: doc.id,
                    ...doc.data()
                }
            });
            console.log("card is ", card);
            setAlbumList(card);
        });
        console.log("Unsub is ",unsub);
    }, []);


    



    return (
        <>
            <div className={style.main_container}>
                {!openAlbum.open?(
                   <>
                     <div className={style.album_form}>
                        {showAlbumForm && <AlbumForm/>}
                    </div>
                    <div className={style.header}>
                        <span>Your Albums</span>
                        <button onClick={()=>setAlbumForm(!showAlbumForm)}>{!showAlbumForm?"Create Album":"Cancel"
                            }</button>
                    </div>
                    <div className={style.album_Container}>
                        {albumList.map((album)=>{
                            return <Album key={album.id} info={album} setOpenAlbum={setOpenAlbum}/>
                        })}
                    </div>
                   </>
                ):<ImageList openAlbum={openAlbum} setOpenAlbum={setOpenAlbum} />}
            </div>
        </>
    );
}