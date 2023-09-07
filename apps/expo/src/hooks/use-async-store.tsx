import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
  key?: string;
  initialValue: unknown;
};

export const useAsyncStorage = () => {
  const [data, setData] = useState("");
};
