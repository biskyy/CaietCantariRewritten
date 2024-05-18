// import { withAndroidStyles, XML } from "@expo/config-plugins";
const expo = require("@expo/config-plugins");

const withFullScreenDialogStyles = (config) => {
  return expo.withAndroidStyles(config, async (config) => {
    config.modResults = await configureFullScreenDialog(config.modResults);
    return config;
  });
};

async function configureFullScreenDialog(styles) {
  // Remove existing theme
  styles.resources.style = styles.resources.style.filter(
    (style) => style.$.name !== "Theme.FullScreenDialog"
  );

  // 1A. You can build the XML object using the JS API
  // const res = AndroidConfig.Resources.buildResourceGroup({
  //   parent: 'AppTheme',
  //   name: 'Theme.FullScreenDialog',
  //   items: [
  //     AndroidConfig.Resources.buildResourceItem({
  //       name: 'android:windowNoTitle',
  //       value: 'true'
  //     })
  //   ]
  // })

  // 1B. You could build the XML object using the parser API
  const res = (
    await expo.XML
      .parseXMLAsync(`<style name="Theme.FullScreenDialog" parent="AppTheme">
  <item name="android:windowNoTitle">true</item>
  <item name="android:windowIsFloating">false</item>
  <item name="android:windowBackground">@android:color/transparent</item>
  <item name="android:statusBarColor">@android:color/transparent</item>
  <item name="android:navigationBarColor">@android:color/transparent</item>
</style>`)
  ).style;

  // 2. Add the resource object to the styles to be written
  styles.resources.style.push(res);
  return styles;
}

module.exports = withFullScreenDialogStyles;
