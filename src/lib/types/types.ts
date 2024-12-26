export type CellPosition = { row: number; col: number };

export enum GameStatus {
    "PAUSED" = 0,
    "RUNNING" = 1,
    "WON" = 2,
    "LOST" = 3,
}