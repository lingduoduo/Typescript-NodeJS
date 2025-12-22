let x: "Hello" | "Goodby" | "Hi";

type ColumnLabel = "1" | "2" | "3";
type RowLabel = "A" | "B" | "C";

let userInput = "Hello";

function attackSquare(row: RowLabel, col: ColumnLabel) {

}

function isRowLabel(str: string): str is RowLabel {
    return ["A", "B", "C"].includes(str);
}

function isColLabel(str: string): str is ColumnLabel {
    return ["1", "2", "3"].includes(str);
}


type BattleshipMove = `${RowLabel}${ColumnLabel}`
let newMove: BattleshipMove = "A1";

function isBattelshipMove(str: string): str is BattleshipMove {
    let [row, col] = str.split("");
    return isRowLabel(row) && isColLabel(col);
}


