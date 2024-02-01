import "./App.css";

// style={{ border: "3px solid red" }}

function App() {
  return (
    <div className="App">
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Welcome to BDO digital</h1>
          <p>This is a Demo Task Application</p>
          <p>by Nikos Mpakaris</p>
          <div className="btn-selection">
            <button className="btn btn-primary">User Management</button>
            <button className="btn btn-primary ms-3">Task Management</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
