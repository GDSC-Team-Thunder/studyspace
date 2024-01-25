import Timer from './components/timer.tsx'
import Left from './components/left.tsx'
import Right from './components/right.tsx'
import './css/App.css';

function App() {
  return (
    <div className = "App">
      {/* <div className = "header">
        <Header />
      </div> */}
      <div className="container">
          <Left />
          <Timer />
          <Right />
      </div>
    </div>
  );
}

export default App
