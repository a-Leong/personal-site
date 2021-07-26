import { Ref, ref, readonly } from 'vue'

const debug = false

type DisplayMode = 'light' | 'dark' | 'auto'
type DisplayTheme = 'light' | 'dark'

const currentDisplayMode: Ref<DisplayMode> = ref('auto')
const currentDisplayTheme: Ref<DisplayTheme> = ref('light')

const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)')

function setDisplayMode(setting: DisplayMode) {
  if (debug) console.log('systemToggleDarkTheme triggered', setting)
  currentDisplayMode.value = setting
  switch (setting) {
    case 'auto': {
      currentDisplayTheme.value = systemPrefersDark.matches ? 'dark' : 'light'
      document.body.classList.toggle('dark', systemPrefersDark.matches)
      break
    }
    case 'dark': {
      currentDisplayTheme.value = setting
      document.body.classList.toggle('dark', true)
      break
    }
    case 'light': {
      currentDisplayTheme.value = setting
      document.body.classList.toggle('dark', false)
      break
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function systemDisplaySettingChanged() {
  if (debug) console.log('systemDisplaySettingChanged triggered')
  if (currentDisplayMode.value === 'auto') {
    setDisplayMode('auto')
  }
}

// TODO: Add styles for dynamic display theming
// // Listen for changes to the prefers-color-scheme media query
// systemPrefersDark.addListener(() => systemDisplaySettingChanged())
// setDisplayMode(currentDisplayMode.value)

export default function() {
  return {
    displayMode: readonly(currentDisplayMode),
    displayTheme: readonly(currentDisplayTheme),
    setDisplayMode,
  }
}
