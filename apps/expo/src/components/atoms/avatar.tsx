import { Box } from "../layout";
import { Image } from "react-native";

interface AvatarProps {
  size: number;
  source: any;
}

export const Avatar: React.FC<AvatarProps> = (props) => {
  const { source = false, size } = props;
  return (
    <Box
      borderRadius={"hg"}
      width={size}
      height={size}
      overflow={"hidden"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Image
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
        source={{ uri: source }}
      />
    </Box>
  );
};
