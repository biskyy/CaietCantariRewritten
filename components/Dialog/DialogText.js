import { Text } from "react-native";

import { useThemeStyle } from "@/hooks/useThemeStyle";

const DialogText = (props) => {
  const themeStyle = useThemeStyle();

  return (
    <Text style={[themeStyle.txtColor, themeStyle.text, { marginVertical: 5 }]}>
      {props.children}
    </Text>
  );
};

export default DialogText;
