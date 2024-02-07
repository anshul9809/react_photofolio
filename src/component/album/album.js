import style from "./album.module.css"

export default function Album(props){
    let {info, setOpenAlbum} = props;

    function handleClick(){
        setOpenAlbum({albumId:info.id,open:true});
    }
    return (
        <>
            <div className={style.album_card_container}>
                <div className={style.card_image} onClick={handleClick}></div>
                <div className={style.card_name}>
                    {info.AlbumName}
                </div>
            </div>
        </>
    );
}