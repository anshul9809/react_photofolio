import './App.css';
import {db} from "./firebaseInit";
import Navbar from './component/Navbar/Navbar';

function App() {
  return (
    <>
    <Navbar />
    <h2>Working with valu as </h2></>
  );
}

console.log(db);
export default App;
