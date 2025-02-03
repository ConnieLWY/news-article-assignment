// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateUpdate from './scenes/CreateUpdate';
import Display from './scenes/Display';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Display title="Articles" />} />
        <Route path="/display" element={<Display title="Articles" />} />
        <Route path="/create" element={<CreateUpdate title="Create New Article" />} />
        <Route path="/edit/:id" element={<CreateUpdate title="Edit Article" />} />
      </Routes>
    </Router>
  );
};

export default App;