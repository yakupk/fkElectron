import cn from "classnames";
import "./keyboard.css";
const explode = (arr, size) =>
  arr.reduce(
    (acc, e, i) => (
      i % size ? acc[acc.length - 1].push(e) : acc.push([e]), acc
    ),
    []
  );

function Keyboard({ setFunc, left = true, right = true }) {
  const alfabe = explode([..."ABCDEFGHIJKLMNOPRSTUVYZ"], 8);
  const nums = explode(
    Array(9)
      .fill()
      .map((_, i) => i + 1)
      .concat(0, "C"),
    3
  );

  return (
    <>
      <div className={cn("keyboard", !left && "disabled")}>
        {alfabe.map((data, rowIndex) => (
          <div key={rowIndex} className="keyboard-row">
            {data.map((character) => (
              <button
                key={character}
                id={"character" + character}
                type="button"
                className={cn("keyboard-button", character)}
                onClick={() => setFunc(character)}
              >
                {character}
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className={cn("keyboard", "nums", !right && "disabled")}>
        {nums.map((data, rowIndex) => (
          <div key={rowIndex} className="keyboard-row">
            {data.map((num) => (
              <button
                key={num}
                id={"num" + num}
                type="button"
                className={cn("keyboard-button", num)}
                onClick={(e) => setFunc(e.target.id === "numC" ? "reset" : num)}
              >
                {num}
              </button>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default Keyboard;
