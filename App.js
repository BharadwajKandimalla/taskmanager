import './App.css';
import store from './redux/store';
import { Provider } from 'react-redux';
import TaskManager from './TaskManager';
store.subscribe(() => console.log(store.getState()));
function App() {
  return (
    <Provider store={store}>
    <div className="App" data-testid="app">
     <TaskManager/>
    </div>
    </Provider>
  );
}

export default App;
