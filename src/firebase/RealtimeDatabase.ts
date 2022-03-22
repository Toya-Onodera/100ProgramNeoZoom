import { initializeApp } from "firebase/app";
import { child, get, getDatabase, onValue, ref, set } from "firebase/database";
import { firebaseConfig } from "./index";

type RoomId = string | number;

const firebaseApp = initializeApp(firebaseConfig);
const realtimeDatabase = getDatabase(firebaseApp);

export const realtimeDatabaseOnValue = (
  roomId: RoomId,
  fn: (snapshot) => void
) => onValue(ref(realtimeDatabase, `rooms/${roomId}`), fn);

export const realtimeDatabaseGet = (roomId: RoomId) =>
  get(child(ref(realtimeDatabase), `rooms/${roomId}`));

export const realtimeDatabaseSet = (roomId: RoomId, value: any[]) =>
  set(ref(realtimeDatabase, `rooms/${roomId}`), value);

export default firebaseApp;
