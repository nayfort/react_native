import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

const connectToDB = async () => {
  const { exists, isDirectory } = await FileSystem.getInfoAsync(
      `${FileSystem.documentDirectory}SQLite`
  );

  if (!exists) {
    await FileSystem.makeDirectoryAsync(
        `${FileSystem.documentDirectory}SQLite`
    );
  } else if (!isDirectory) {
    throw new Error('SQLite dir is not a directory');
  }
  await FileSystem.downloadAsync(
      Asset.fromModule(require('./assets/mclangknoten.db')).uri,
      `${FileSystem.documentDirectory}/SQLite/mclangknoten.db`
  );
};

export default connectToDB;

/*Function processing SQL queries*/
export const executeSql = async (query, params = []) => {
  const db = SQLite.openDatabase('mclangknoten.db');

  return new Promise((resolve, reject) => {
    db.transaction(
        (tx) => {
          tx.executeSql(quey, params, (_, { rows: { _array } }) =>
              resolve(_array)
          );
        },
        (err) => reject(err)
    );
  });
};