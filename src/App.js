import "./App.css";
import { useState } from "react";

const startUpInfo = {
  title: "Breathing Visualizations",
  updated: "March 15, 2024"
};

function Header() {
  return <h1 className="title-grow">{startUpInfo.title}</h1>;
}

const types = [
  {
    item: "Balloon",
    clickName: "balloon",
    id: 1,
    text: "Breathe in as the balloon gets bigger. Breathe out as the balloon gets smaller."
  },
  {
    item: "Box",
    clickName: "box",
    id: 3,
    text: `Breathe in for four seconds. Hold for four seconds. Breathe out for four seconds. Hold for four seconds.`
  },
  {
    item: "Waves",
    clickName: "water",
    id: 2,
    text: "Breathe in as the waves move upward.  Breathe out as the waves recede."
  }
];

function Options({ clicked, setClicked }) {
  const handleClick = event => {
    console.log(clicked);
    setClicked(event.currentTarget.innerText);
  };
  const buttonList = types.map(types => (
    <button key={types.id} className={`Active`} onClick={handleClick}>
      {types.item}
    </button>
  ));
  return <nav className="row">{buttonList}</nav>;
}

function Section({ clicked }) {
  const visualization = () => {
    if (clicked === "Balloon") {
      return <Balloon />;
    } else if (clicked === "Waves") {
      return <Waves />;
    }
    return <Box />;
  };
  return (
    <div>
      <p>
        Click the{" "}
        {clicked === "Balloon"
          ? types[0].clickName
          : clicked === "Box"
          ? types[1].clickName
          : types[2].clickName}{" "}
        to start breathing.
      </p>
      <p>
        {clicked === "Balloon"
          ? types[0].text
          : clicked === "Box"
          ? types[1].text
          : types[2].text}
      </p>
      {visualization("Balloon")}
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      This site was updated {startUpInfo.updated}.
    </footer>
  );
}

function Balloon() {
  const [click, setClickedState] = useState(false);
  const toggleBreathing = () => {
    setClickedState(!click);
  };
  return (
    <div>
      <img
        className={`balloon ${click ? "balloon-breathe" : ""}`}
        alt="red balloon that gets bigger and smaller in time"
        src="https://upload.wikimedia.org/wikipedia/commons/d/d3/Red_Balloon_%28Vector%29.svg"
        onClick={toggleBreathing}
      ></img>
    </div>
  );
}

function Waves() {
  const [click, setClickedState] = useState(false);
  const toggleWaves = () => {
    setClickedState(!click);
  };
  return (
    <div>
      <svg width="500" height="500">
        <defs>
          <linearGradient id="gradient" gradientTransform="rotate(90)">
            <stop offset="0" stop-color="white" stop-opacity="1" />
            <stop offset="1" stop-color="white" stop-opacity="0.25" />
          </linearGradient>

          <mask id="gradient-mask">
            <rect x="0" y="0" width="500" height="500" fill="url(#gradient)" />
          </mask>
        </defs>
        <rect width="500" height="500" style={{ fill: "tan" }}></rect>
        <rect
          width="500"
          height="400"
          mask="url(#gradient-mask)"
          style={{ fill: "rgb(0,127,175)" }}
          className={`waves ${click ? "waves-breathe" : ""}`}
          onClick={toggleWaves}
        ></rect>
      </svg>
    </div>
  );
}
function Box() {
  const [click, setClickedState] = useState(0);
  const toggleBreathing = () => {
    setClickedState(!click);
    console.log(click);
  };
  return (
    <div onClick={toggleBreathing}>
      <svg width="350" height="350">
        <rect
          width="350"
          height="350"
          style={{ fill: "white", stroke: "black" }}
        ></rect>
        <rect
          width="50"
          height="50"
          className={`box ${click ? "box-breathe" : ""}`}
        ></rect>
      </svg>
    </div>
  );
}

function App() {
  const [clicked, setClicked] = useState("");
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <Options setClicked={setClicked} clicked={clicked} />
      <main className="main-content">
        <Section clicked={clicked} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
