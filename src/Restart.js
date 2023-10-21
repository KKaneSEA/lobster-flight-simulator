import "./App.css";

export default function Restart(props) {
  function playAgain() {
    props.setPanCount(0);
  }
  return (
    <>
      <div className="gameOver-Container">
        <p className="gameOver-Title">GAME OVER!</p>
        <button className="gameOver-Button" onClick={playAgain}>
          PLAY AGAIN
        </button>
      </div>
    </>
  );
}
