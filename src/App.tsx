import HeaderBar from './conponents/HeaderBar';
import ShowNftList from './conponents/ShowNftList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SepoliaContainer from './conponents/sepolia/SepoliaContainer';

export default function App() {
  return (
    <div className="App h-screen w-screen bg-light-gray">
      <BrowserRouter>
        <HeaderBar />
        <Routes>
          <Route path="/" element={<ShowNftList />} />
          <Route path="/sepolia" element={<SepoliaContainer />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
};
