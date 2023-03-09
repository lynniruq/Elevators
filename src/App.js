import logo from './logo.svg';
import './App.css';
import ElevatorView from "./view/ElevatorView";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <label className={'elevator-title'}>Elevator Exercise</label>
          <ElevatorView/>
      </header>
    </div>
  );
}

export default App;
