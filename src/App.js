    import './App.css';
    import useActivity from './hooks/useActivity';
    import useChuckNorrisFacts from './hooks/useChuckNorrisFacts';

    function App() {
      const { activity } = useActivity();
      const { chuckNorrisFact } = useChuckNorrisFacts(activity);
      return (
        <div className="App">
          <header className="App-header">
            <p>
              How about you {activity}?
            </p>
            <p>
              BTW, {chuckNorrisFact}
            </p>
          </header>
        </div>
      );
    }

    export default App;
