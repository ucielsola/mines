import { GameStatus, generateBoard, type Cell, type CellPosition } from "$lib";
import { adjacentCellsDirections } from "$lib/utils/adjacentCellsDirections";

export class Game {
    private static DEFAULT_SIZE = 10;
    private static DEFAULT_MINES = 25;

    private _board: Cell[][] = $state([])
    private _size: number;
    private _mines: number;
    private _revealedCells: number = $state(0);
    private _flaggedCells: number = $state(0);
    private _status: GameStatus = $state(GameStatus.PAUSED);
    private _isFirstClick: boolean = true;

    constructor(size: number = Game.DEFAULT_SIZE, mines: number = Game.DEFAULT_MINES) {
        this._size = size;
        this._mines = mines;

        this._board = generateBoard(this._size, this._mines);
    }

    get board(): Cell[][] {
        return this._board;
    }

    get size(): number {
        return this._size;
    }

    get mines(): number {
        return this._mines;
    }

    get revealedCells(): number {
        return this._revealedCells;
    }

    get flaggedCells(): number {
        return this._flaggedCells;
    }

    get status(): GameStatus {
        return this._status;
    }

    public revealCell(cell: Cell, userTriggered: boolean): void {
        if (this._status === GameStatus.PAUSED) {
            this._status = GameStatus.RUNNING;
        }

        if (cell.flagged) {
            return;
        }

        if (cell.revealed) {
            return;
        }

        if (cell.isMine) {
            if (!this._isFirstClick) {
                this._status = GameStatus.LOST;
            } else {
                this._isFirstClick = false;
                cell.updateMineState(false);

                const adjacentCells = this.getAdjacentCells(cell.position);
                const mines = adjacentCells.filter(c => c.isMine).length;

                cell.updateAdjacentMineCount(mines)

                this.moveMine();
            }
        }

        cell.reveal();

        this._revealedCells++;


        if (userTriggered || cell.adjacentMines === 0 || this._status === GameStatus.LOST) {
            this.revealAdjacentCells(cell.position, userTriggered)
        }

        if (this._revealedCells + this._mines === Math.pow(this._size, 2)) {
            this._status = GameStatus.WON;
        }
    }

    public toggleFlagCell(cell: Cell): void {
        if (cell.revealed) return;

        if (cell.flagged) {
            this._flaggedCells--;
        } else {
            this._flaggedCells++;
        }

        cell.toggleFlag();
    }

    public revealAdjacentCells(position: CellPosition, forceReveal: boolean = false): void {
        const adjacentCells = this.getAdjacentCells(position);
        const allAdjacentMinesAreFlagged = adjacentCells.every(c => !c.isMine || c.flagged);

        const flaggedCells = adjacentCells.filter(c => c.flagged).length;
        const mineCells = adjacentCells.filter(c => c.isMine).length;

        const flaggedWrong = flaggedCells > 0 && flaggedCells === mineCells &&
            adjacentCells.some(c => c.flagged && !c.isMine);

        if (flaggedWrong) {
            this._status = GameStatus.LOST;
        }

        const gameLost = this._status === GameStatus.LOST;

        if (allAdjacentMinesAreFlagged || forceReveal || gameLost) {
            adjacentCells.forEach(cell => {
                if (!cell.revealed && (!cell.isMine || cell.flagged || gameLost)) {
                    this.revealCell(cell, false);
                }
            });
        }
    }

    private getAdjacentCells(position: CellPosition): Cell[] {
        return adjacentCellsDirections.reduce((adjacent, [dx, dy]) => {
            const row = position.row + dx;
            const col = position.col + dy;
            if (row >= 0 && row < this._size && col >= 0 && col < this._size) {
                adjacent.push(this._board[row][col]);
            }
            return adjacent;
        }, [] as Cell[]);
    }

    private moveMine() {
        const firstFreeCell = this._board.flat().find(cell => !cell.isMine);
        if (firstFreeCell) {
            firstFreeCell.updateMineState(true)
        }
    }
}