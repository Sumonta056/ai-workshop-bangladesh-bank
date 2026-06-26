import { VIEW_ROUTES } from '~/data/routes'
import type { NavLabels } from '~/i18n/types'

type NavKey = keyof NavLabels

// Order + routing of the primary nav, matching the source `navDef`.
// `to: null` reproduces the original `noop` links (about / fx / gsec / pay) —
// they render but do not navigate. `svc` is intentionally absent (reached via
// the service cards), and the original highlights nothing for the svc view.
const NAV_DEF: { key: NavKey; to: string | null }[] = [
  { key: 'home', to: VIEW_ROUTES.home },
  { key: 'about', to: null },
  { key: 'mp', to: VIEW_ROUTES.mp },
  { key: 'fin', to: VIEW_ROUTES.fin },
  { key: 'fx', to: null },
  { key: 'gsec', to: null },
  { key: 'pay', to: null },
  { key: 'pub', to: VIEW_ROUTES.pub },
]

export interface NavItem {
  key: NavKey
  label: string
  to: string | null
  active: boolean
}

/**
 * Builds the primary-nav items with labels from the current locale and the
 * active flag derived from the current route (replacing the original's
 * view-state comparison).
 */
export function useNav() {
  const { L } = useLocale()
  const route = useRoute()

  const items = computed<NavItem[]>(() =>
    NAV_DEF.map(({ key, to }) => ({
      key,
      label: L.value.nav[key],
      to,
      active: to !== null && route.path === to,
    })),
  )

  return { items }
}
