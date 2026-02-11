import * as migration_20260211_092324 from './20260211_092324';

export const migrations = [
  {
    up: migration_20260211_092324.up,
    down: migration_20260211_092324.down,
    name: '20260211_092324'
  },
];
