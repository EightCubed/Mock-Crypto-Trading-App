import { Route, Routes } from "react-router-dom"
import CoinDetails from "./Components/CoinDetails"
import CoinsList from "./Components/CoinsList"
import EntryPage from "./Components/EntryPage"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<EntryPage />} />
        <Route path="/coins" element={<CoinsList />} />
        <Route path="/coins/:id" element={<CoinDetails />} />
      </Routes>
    </>
  )
}

export default App;