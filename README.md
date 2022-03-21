# Expo + Next.js Translation Using i18n-js

Universal localization for native platforms such as mobile (expo) and web (Next.js). This library was built on top of next-translate for Next.js & expo-localization for Expo. A Monorepo example is linked [here](https://github.com/hari1602/expo-next-translation-monorepo).

## Install
`yarn add expo-next-translation`

## Setup

**Install next with expo:**

- Init: `expo init` (or `npx create-next-app`)

- Install: `yarn add @expo/next-adapter`

- Install next: `yarn add next`

- Configure: `yarn next-expo`

- Start: `yarn next dev`


**Step 1. Edit/create next.config.js**

```bash
yarn add next-translate next-compose-plugins next-fonts next-images next-transpile-modules
```

**Step 2: edit `next.config.js` to look something like this:**

```es6
const { withExpo } = require('@expo/next-adapter')
const withFonts = require('next-fonts')
const withImages = require('next-images')
const nextTranslate = require('next-translate')
const withPlugins = require('next-compose-plugins')
const withTM = require('next-transpile-modules')([
  'expo-next-translation',
  // you can add other modules that need traspiling here
])
module.exports = withPlugins(
  [withTM, nextTranslate, withFonts, withImages, [withExpo, { projectRoot: __dirname }]],
  {
    // ...
  }
)
```
**Step 3. Setup the localization setting for Next.js & Expo**
- Set the localization setting file in the root directory of the web project. For more information refer to the [documentation](https://github.com/vinissimus/next-translate#add-i18njs-config-file). Simple example as below:
    ```es6
    module.exports = {
    locales: ["en", "ta"],
    defaultLocale: "en",
    pages: {
        "*": ["common", "screen"]
    },
    loadLocaleFrom: (lang, ns) =>
        import(`${lang}/${ns}.json`).then((m) => m.default)
    };
    ```

- Same as the web localization setting file, we have to setup for the mobile directory as well. `i18n-js` & `expo-localization` will be used to setup for mobile
    ```es6
    import * as Localization from "expo-localization";
    import i18n from "i18n-js";

    i18n.fallbacks = true;
    i18n.translations = {
    ta: {
        common: require("ta/common.json"),
        screen: require("ta/screen.json")
    },
    en: {
        common: require("en/common.json"),
        screen: require("en/screen.json")
    }
    };
    i18n.locale = Localization.locale || "en";
    ```

**Perfect! The setup for both web and mobile is completed**
## API
### `useTranslation()`
React hook that wraps useTranslation (from next-translate/useTranslation) hook and t (from i18n).

```es6
import { useTranslation } from 'expo-next-translation'

export default function App() {
    const { lang, setLanguage, t } = useTranslation()
}
```

#### `lang`
- returns the current language as string 
- Example ( 'en', 'ta' )

#### `setLanguage`
- A React hook to set a new language. Wraps with useRouter from Next.js & i18n.locale for Expo 

```es6
import { useTranslation } from 'expo-next-translation'

export default function App() {
    const { setLanguage } = useTranslation()

    const onPress = (selectedLang: string) => {
        setLanguage({ lang: selectedLang, url: '/', as: '/' })
    }
}
```

- `lang`
  
  - Argument to be passed to update the screen language 
  - string & required
- `url`

    - This will be required for web to set the URL. For more information do refer to the Next.js [Docs](https://nextjs.org/docs/advanced-features/i18n-routing#transition-between-locales). By default is set to root path.
    - string, optional, default = '/'
- `as`

    - This will be required for web to set the URL to be shown in the URL bar. By default is set to root path.
    - string, optional, default = '/'
  
#### `t()`
A React hook used to used to translate value using its key. **Note: Should provide the translation folder name either passing through `useTranslation()` or `t()`. The example folder used below is `common`.**

```es6
import { useTranslation } from 'expo-next-translation'

export default function App() {
    const { t } = useTranslation('common')

    return (
        <View>
            <Text>
                {t('greetings')}
            </Text>
        </View>
    )
}
```

OR

```es6
import { useTranslation } from 'expo-next-translation'

export default function App() {
    const { t } = useTranslation()

    return (
        <View>
            <Text>
                {t('common:greetings')}
            </Text>
        </View>
    )
}
```

The json file `en/common.json` should be as below
```json
{
  "greetings": "Hey, Welcome",
  "greetingsRole": "Hey, Welcome {{role}}"
}
```

Dynamic variable can also be used for Next.js and Expo as shown below using the `greetingsRole` key

```es6
import { useTranslation } from 'expo-next-translation'

export default function App() {
    const { t } = useTranslation()

    return (
        <View>
            <Text>
                {t('common.greetings', {role: 'Admin'})}
            </Text>
        </View>
    )
}
```

This should render as
```bash 
Hey, Welcome Admin
```

# Follow

Follow me [on Twitter](https://twitter.com/haridasan167)
