import { Cell } from "$lib";
import { adjacentCellsDirections } from "./adjacentCellsDirections";

export const generateBoard = (size: number, mines: number): Cell[][] => {
    const draftBoard: boolean[][] = Array.from({ length: size }, () => Array(size).fill(0));
    let placedMines = 0;

    while (placedMines < mines) {
        const row = Math.floor(Math.random() * size);
        const col = Math.floor(Math.random() * size);

        if (!draftBoard[row][col]) {
            draftBoard[row][col] = true
            placedMines++;
        }
    }

    const finalBoard = draftBoard.map((cells, row) => cells.map((isMine, col) => {
        const adjacentMinesCount = countMines(row, col, draftBoard);
        const position = { row, col };
        return new Cell(!!isMine, position, adjacentMinesCount)
    }));

    return finalBoard;
}


function countMines(row: number, col: number, board: boolean[][]): number {
    return adjacentCellsDirections.reduce((count, [dx, dy]) => {
        const newRow = row + dx;
        const newCol = col + dy;
        if (newRow >= 0 && newRow < board.length && newCol >= 0 && newCol < board[0].length) {
            count += board[newRow][newCol] ? 1 : 0;
        }
        return count;
    }, 0);
}