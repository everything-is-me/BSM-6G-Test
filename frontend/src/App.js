import "./App.css";
import DataDisplay from "./components/DataDisplay";
import Header from "./components/Header";
import SmartContract from "./components/SmartContract";

function App() {
  return (
    <div className="App">
      <Header />
      <DataDisplay />
      <SmartContract />
    </div>
  );
}

export default App;
