import type { CellPosition } from "$lib/types";

export class Cell {
    private _isMine: boolean;
    private _revealed: boolean = $state(false);
    private _flagged: boolean = $state(false);
    private _adjacentMines: number = $state(0)
    private _position: CellPosition;

    constructor(isMine: boolean, position: CellPosition, adjacentMines: number = 0) {
        this._isMine = isMine;
        this._position = position;
        this._adjacentMines = adjacentMines;
    }

    get isMine(): boolean {
        return this._isMine;
    }

    get position(): CellPosition {
        return this._position;
    }

    get revealed(): boolean {
        return this._revealed;
    }

    get flagged(): boolean {
        return this._flagged;
    }

    get adjacentMines(): number {
        return this._adjacentMines;
    }

    public toggleFlag(): void {
        this._flagged = !this._flagged;
    }

    public reveal(): void {
        this._revealed = true;
    }

    public getHTMLContent = (): string => {
        const containerClasses: string[] = ['flex items-center justify-center w-full h-full shadow-inner']
        const textClasses: string[] = ['text-3xl'];

        let text: string;

        if (this.flagged) {
            text = "🚩";
            containerClasses.push('bg-cell')
        } else if (!this.revealed) {
            text = " ";

            containerClasses.push('bg-cell')
        } else if (this.isMine) {
            text = "💣";
            containerClasses.push('bg-cell-revealed-mine')
        } else {
            text = `${this.adjacentMines || ""}`
            textClasses.push(adjacentTextColorClasses[this.adjacentMines])
            containerClasses.push('bg-cell-revealed')
        }


        return `
    <div class="${containerClasses.join(" ")}">
        <span class="${textClasses.join(" ")}">${text}</span>
    </div>
    `
    };
}

const adjacentTextColorClasses: Record<number, string> = {
    1: 'text-adjacent-1',
    2: 'text-adjacent-2',
    3: 'text-adjacent-3',
    4: 'text-adjacent-4',
    5: 'text-adjacent-5',
    6: 'text-adjacent-6',
    7: 'text-adjacent-7',
    8: 'text-adjacent-8',
}
