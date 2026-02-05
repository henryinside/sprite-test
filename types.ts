export enum Direction {
  SOUTH = 'SOUTH',
  NORTH = 'NORTH',
  WEST = 'WEST',
  EAST = 'EAST',
}

export interface Coordinates {
  x: number;
  y: number;
}

export interface GameState {
  position: Coordinates;
  direction: Direction;
  isMoving: boolean;
}
