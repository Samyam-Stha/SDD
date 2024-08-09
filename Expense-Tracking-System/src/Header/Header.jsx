
import './Header.css'

function Header() {
  return (
    <div className="App">
        <header className="App-header">
          <div className="Nav-bar">
            <div className="Logo-bar">
              <button className="Logo">Logo</button>
            </div>
           
            <div className="Nav">
            <button className="home">Expense</button>
            <button className="home">Statistics</button>
            <button className="home">About </button>
            <button className="home">Sign in</button>
            </div>
          </div>
        </header>
    </div>
  );
}

export default Header
