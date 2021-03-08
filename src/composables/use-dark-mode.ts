import { Ref, ref, readonly } from 'vue'

const debug = false

type DisplayMode = 'Dark' | 'Light' | 'Auto'

const currentDisplayMode: Ref<DisplayMode> = ref('Auto')

const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)')

function setDisplayMode(setting: DisplayMode) {
  if (debug) console.log('systemToggleDarkTheme triggered', setting)
  currentDisplayMode.value = setting
  switch (setting) {
    case 'Auto': {
      document.body.classList.toggle('dark', systemPrefersDark.matches)
      break
    }
    case 'Dark': {
      document.body.classList.toggle('dark', true)
      break
    }
    case 'Light': {
      document.body.classList.toggle('dark', false)
      break
    }
  }
}
setDisplayMode(currentDisplayMode.value)

function systemDisplaySettingChanged() {
  if (debug) console.log('systemDisplaySettingChanged triggered')
  if (currentDisplayMode.value === 'Auto') {
    setDisplayMode('Auto')
  }
}

// Listen for changes to the prefers-color-scheme media query
systemPrefersDark.addListener(() => systemDisplaySettingChanged())

export default function() {
  return {
    displayMode: readonly(currentDisplayMode),
    setDisplayMode,
  }
}
