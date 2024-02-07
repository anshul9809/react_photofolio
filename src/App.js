import './App.css';
import {db} from "./firebaseInit";
import Navbar from './component/Navbar/Navbar';
import AlbumList from "./component/AlbumList/AlbumList"

function App() {
  return (
    <>
    <Navbar />
    
    <AlbumList />
    </>
  );
}

console.log(db);
export default App;
