import Container from './components/Container';
import Messages from './components/Messages';
import MessageField from './components/MessageField';

function App() {
  return (
    <div className="App">
      <Container>
        <Messages />
        <MessageField />
      </Container>
    </div>
  );
}

export default App;
