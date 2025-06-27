import { Text } from "react-native";

import { useThemeStyle } from "@/hooks/useThemeStyle";

const DialogSubtitle = (props) => {
  const themeStyle = useThemeStyle();

  return (
    <Text
      style={[themeStyle.txtColor, themeStyle.subtitle, { marginVertical: 5 }]}
    >
      {props.children}
    </Text>
  );
};

export default DialogSubtitle;
