
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
        onSnapshot(collection(db, "albums"), (snapshot)=>{
            const card = snapshot.docs.map((doc)=>{
                return {
                    id: doc.id,
                    ...doc.data()
                }
            });
            setAlbumList(card);
        });
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
                        <h3>Your Albums</h3>
                        <button onClick={()=>setAlbumForm(!showAlbumForm)} className={style.btn_grad}>{!showAlbumForm?"Create Album":"Cancel"
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