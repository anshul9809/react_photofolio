import style from "./navbar.module.css"
import logo from "../../static/images/logo_2.png"
export default function Navbar(){
    return (
        <>
            <header className={`${style.flex} ${style.header}`}>
                <div className={style.header_container}>
                    <a href="/"><img src={logo} alt="logo" className={style.logo}/></a>
                    <h2><a href="/">Photofolio</a></h2>
                </div>
            </header>
        </>
    )
} 