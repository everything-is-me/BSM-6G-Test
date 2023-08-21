import "./App.css";
import DataDisplay from "./DataDisplay";

function App() {
  return (
    <div className="App">
      <DataDisplay />
      <h4 style={{ marginTop: 40, marginBottom: 5 }}>Bournemouth University</h4>
      <h5 style={{ marginTop: 0, marginBottom: 5 }}>
        Individual Master Project
      </h5>
      <h5 style={{ marginTop: 0, marginBottom: 5 }}>
        MSc. Data Science and Artificial Intelligence
      </h5>
      <h5 style={{ marginTop: 0, marginBottom: 5 }}>
        David Felipe Cuellar Diaz
      </h5>
      <h5 style={{ marginTop: 0, marginBottom: 5 }}>August 2023</h5>
    </div>
  );
}

export default App;
