import { Ref, ref, readonly } from 'vue'

const debug = false

type DisplayTheme = 'Dark' | 'Light' | 'Auto'

const currentDisplayTheme: Ref<DisplayTheme> = ref('Auto')

const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)')

function setDisplayTheme(setting: DisplayTheme) {
  if (debug) console.log('systemToggleDarkTheme triggered', setting)
  currentDisplayTheme.value = setting
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
setDisplayTheme(currentDisplayTheme.value)

function systemDisplaySettingChanged() {
  if (debug) console.log('systemDisplaySettingChanged triggered')
  if (currentDisplayTheme.value === 'Auto') {
    setDisplayTheme('Auto')
  }
}

// Listen for changes to the prefers-color-scheme media query
systemPrefersDark.addListener(() => systemDisplaySettingChanged())

export default function() {
  return {
    displayTheme: readonly(currentDisplayTheme),
    setDisplayTheme,
  }
}
