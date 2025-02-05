import { ref } from 'vue'

type Theme = 'light' | 'dark'

export const useTheme = () => {
    const theme = ref<Theme>('light')

    const toggleTheme = () => {
        theme.value = theme.value === 'light' ? 'dark' : 'light'
        document.documentElement.setAttribute('data-theme', theme.value)
        localStorage.setItem('theme', theme.value)
    }

    const initTheme = () => {
        const savedTheme = localStorage.getItem('theme') as Theme | null
        if (savedTheme) {
            theme.value = savedTheme
            document.documentElement.setAttribute('data-theme', savedTheme)
        }
    }

    return {
        theme,
        toggleTheme,
        initTheme,
    }
}
