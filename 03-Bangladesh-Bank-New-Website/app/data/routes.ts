import type { InnerPageKey } from '~/i18n/types'

// Maps each logical view in the original SPA to a real Nuxt route.
// `home` is the index; the four inner views each get their own page.
export const VIEW_ROUTES: Record<'home' | InnerPageKey, string> = {
  home: '/',
  mp: '/monetary-policy',
  fin: '/financial-system',
  pub: '/publications',
  svc: '/services',
}
