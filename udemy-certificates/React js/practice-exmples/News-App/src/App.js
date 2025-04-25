
import './App.css';
import ThemeChange from './Components/themeChange/ThemeChange';
import AppRouter from './routes/AppRouter';
function App() {
  return (
    <div className="App">
    <AppRouter/>
    <ThemeChange/>
    </div>
  );
}

export default App;
