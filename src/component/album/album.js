export default function Album(props){
    let {info, setOpenAlbum} = props;

    function handleClick(){
        setOpenAlbum({albumId:info.id,open:true});
    }
    return (
        <>
            album working
        </>
    );
}