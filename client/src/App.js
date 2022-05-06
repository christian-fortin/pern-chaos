import './App.css';
//components
import InputChaos from './components/InputChaos';
import ListChaos from './components/ListChaos';


function App() {
  return (
    <div className="App">
      <img src="https://media0.giphy.com/media/K0BdoHFYz2tU7kynzV/giphy.webp?cid=ecf05e473cqvz8vc63tl4ybdo9ldv60c8vrkc53a6icjcri7&rid=giphy.webp&ct=g" alt="" id='background-img'/>
      <div>
        <InputChaos />
        <ListChaos />
      </div>
    </div>
  );
}

export default App;
