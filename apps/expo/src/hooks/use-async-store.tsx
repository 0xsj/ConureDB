import AsyncStorage, {
  AsyncStorageStatic,
} from "@react-native-async-storage/async-storage";
import React from "react";

type UseAsyncStorageProps = {
  key?: string;
  initialValue?: unknown;
};

export const useAsyncStorage = ({
  key,
  initialValue,
}: UseAsyncStorageProps) => {
  const [data, setData] = React.useState(initialValue);
  const [retrievedFromStorage, setRetreivedFromStorage] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await AsyncStorage.getItem(key as string);
        if (!value) {
          return;
        }
        setData(JSON.parse(value) || initialValue);
        setRetreivedFromStorage(true);
      } catch (error) {
        console.error(`fetchData ${key} error: `, error);
      }
    };
    fetchData();
  }, [key, initialValue]);

  const setNewData = async (value: unknown) => {
    try {
      await AsyncStorage.setItem(key as string, JSON.stringify(value));
      setData(value);
    } catch (error) {
      console.error(`setNewData ${key} error: `, error);
    }
  };
  const removeData = async () => {
    try {
      await AsyncStorage.removeItem(key as string);
    } catch (error) {
      console.error(`removeData ${key} error: `, error);
    }
  };
  const clearData = async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error(`clear error:`, error);
    }
  };

  /**
   * clear will remove everything, libraries. etc. per docs recommendation
   * 1. get all keys
   * 2. multiRemove said all keys
   */
  const clearAppData = async () => {
    try {
      const keys: readonly string[] = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.error("error clearing app data");
    }
  };

  if (key !== undefined && initialValue !== undefined) {
    return [
      data,
      setNewData,
      retrievedFromStorage,
      removeData,
      clearData,
      clearAppData,
    ];
  }
};
