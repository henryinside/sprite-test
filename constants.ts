import { Direction } from './types';

export const SPRITE_SETS = {
  IDLE: {
    [Direction.SOUTH]: 'https://i.ibb.co.com/yct8YZKC/student-girl-red-gair-breathing-idle-south.gif',
    // Fallbacks for other directions will default to the Walk sprite if undefined
    [Direction.NORTH]: undefined,
    [Direction.WEST]: undefined,
    [Direction.EAST]: undefined,
  },
  WALK: {
    [Direction.SOUTH]: 'https://i.ibb.co.com/9HZkdgPJ/student-girl-red-gair-walk-south.gif',
    [Direction.NORTH]: 'https://i.ibb.co.com/jPjRkH2Q/student-girl-red-gair-walk-north.gif',
    [Direction.WEST]: 'https://i.ibb.co.com/m5fvrKS2/student-girl-red-gair-walk-west.gif',
    [Direction.EAST]: 'https://i.ibb.co.com/d4D2cz2w/student-girl-red-gair-walk-east.gif',
  },
  RUN: {
    [Direction.SOUTH]: 'https://i.ibb.co.com/qLG07cKc/student-girl-red-gair-running-6-frames-south.gif',
    [Direction.NORTH]: 'https://i.ibb.co.com/hFCSFQW4/student-girl-red-gair-running-6-frames-north.gif',
    [Direction.WEST]: 'https://i.ibb.co.com/gZjK1tdd/student-girl-red-gair-running-6-frames-west.gif',
    [Direction.EAST]: 'https://i.ibb.co.com/Z0630Mh/student-girl-red-gair-running-6-frames-east.gif',
  }
};

export const WALK_SPEED = 3; // Pixels per frame
export const RUN_SPEED = 6;  // Pixels per frame
export const DIAGONAL_FACTOR = 0.7071; // 1 / sqrt(2) to normalize diagonal speed

export const TILE_SIZE = 48; // Visual grid size
