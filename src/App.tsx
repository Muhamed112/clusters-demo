import { Map } from "./components/map";
import { markers } from "./constans";

function App() {
  return (
    <div style={{ height: "100vh" }}>
      <Map markers={markers} />
    </div>
  );
}

export default App;
