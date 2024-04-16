import Header from "./Components/Header"
import Content from "./Components/Content";
import Footer from "./Components/Footer";


function App() {

  
const title = "My todo list"

  return (
    <div >
      <Header title={title} />
      
      <Content />
      <Footer/>
      
    </div>
  );
}

export default App;
