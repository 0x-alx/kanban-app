import { inject, provide, ref, type Ref } from 'vue'

/**
 * Définition du type pour les valeurs de thème
 */
type Theme = 'light' | 'dark'

/**
 * Clé symbole pour l'injection du thème
 */
const THEME_KEY = Symbol('theme')

type ThemeContext = {
    theme: Ref<Theme>
    toggleTheme: () => void
    initTheme: () => void
}

/**
 * Crée et fournit le contexte de thème à l'application
 * Doit être appelé au niveau racine de l'application
 *
 * @example
 * ```ts
 * // Dans App.vue ou main.ts
 * createTheme()
 * ```
 */
export const createTheme = () => {
    const theme = ref<Theme>('light')

    const themeContext: ThemeContext = {
        theme,
        toggleTheme: () => {
            theme.value = theme.value === 'light' ? 'dark' : 'light'
            document.documentElement.setAttribute('data-theme', theme.value)
            localStorage.setItem('theme', theme.value)
        },
        initTheme: () => {
            const savedTheme = localStorage.getItem('theme') as Theme | null
            if (savedTheme) {
                theme.value = savedTheme
                document.documentElement.setAttribute('data-theme', savedTheme)
            }
        },
    }

    provide(THEME_KEY, themeContext)
}

/**
 * Hook pour accéder au contexte de thème dans les composants
 * Doit être utilisé dans un composant qui est un enfant de createTheme
 *
 * @returns Contexte de thème contenant la valeur du thème et les méthodes de contrôle
 * @throws Erreur si utilisé en dehors du fournisseur de thème
 *
 * @example
 * ```ts
 * const { theme, toggleTheme, initTheme } = useTheme()
 * ```
 */
export const useTheme = (): ThemeContext => {
    const theme = inject(THEME_KEY)
    if (!theme) throw new Error('useTheme must be used within a theme provider')
    return theme as ThemeContext
}
