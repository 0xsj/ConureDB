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
        console.error(`${key} error: `, error);
      }
    };
    fetchData();
  }, [key, initialValue]);
};
