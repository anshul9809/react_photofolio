import style from "./image.module.css"

export default function Image(props){
    const {image,index,handleImageEdit,handleImageDelete,openLightbox} = props;

    return (
        <div className={style.image_container}>
            <div className={style.image}>
                <img src={image.link} alt="image" onClick={()=>openLightbox(index)}/>
            </div>
            <div className={style.image_Info}>
                <p>{image.name}</p>
                <button onClick={()=>handleImageEdit(image)} className={image_button}>Edit</button>
                <button onClick={()=>handleImageDelete(image)}>Delete</button>
            </div>
        </div>
    )
}