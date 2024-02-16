import style from "./image.module.css"

export default function Image(props){
    const {image,index,handleImageEdit,handleImageDelete,openLightbox} = props;

    return (
        <div className={style.image_container}>
            <div className={style.image}>
                <img src={image.link} alt="link" onClick={()=>openLightbox(index)}/>
            </div>
            <div className={style.image_Info}>
                <p>{image.name}</p>
                <div className={style.buttons_div}>
                    <button onClick={()=>handleImageEdit(image)} className={style.btn_grad}>Edit</button>
                    <button onClick={()=>handleImageDelete(image)} className={style.delete_button}>Delete</button>
                </div>
            </div>
        </div>
    )
}