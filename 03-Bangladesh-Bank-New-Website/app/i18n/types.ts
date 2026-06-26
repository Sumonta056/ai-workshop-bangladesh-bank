// Shape of one locale's content. `en` and `bn` must both satisfy this, so the
// two languages can never drift in structure. Values are transcribed verbatim
// from the `T` dictionary in the source design HTML.

export interface NavLabels {
  home: string
  about: string
  mp: string
  fin: string
  fx: string
  gsec: string
  pay: string
  pub: string
}

export interface NewsItem {
  text: string
  isNew: boolean
}

export interface MarketCard {
  label: string
  date: string
  link: string
  single?: boolean
  value?: string
  dual?: boolean
  aLabel?: string
  aVal?: string
  bLabel?: string
  bVal?: string
}

export interface PolicyRate {
  label: string
  val: string
}

export interface Reserve {
  seg: string
  slr: string
  crr: string
}

export interface Auction {
  type: string
  day: string
  month: string
}

export interface ModuleCard {
  title: string
  links: string[]
}

export interface ServiceCard {
  title: string
  desc: string
}

export interface Hotline {
  num: string
  label: string
}

export interface Highlight {
  tag: string
  title: string
  desc: string
  primary: string
  secondary: string
}

export interface LinkGroup {
  title: string
  items: string[]
}

export interface DataTable {
  title: string
  note: string
  head: { seg: string; vals: string[] }
  rows: { seg: string; vals: string[] }[]
}

export interface InnerPageContent {
  eyebrow: string
  title: string
  lead: string
  hasHighlight: boolean
  highlight: Highlight
  groups: LinkGroup[]
  tables: DataTable[]
  related: string[]
}

export type InnerPageKey = 'mp' | 'fin' | 'pub' | 'svc'

export interface LocaleContent {
  utilGov: string
  utilRti: string
  utilSitemap: string
  utilFeedback: string
  bankName: string
  centralBank: string
  searchPh: string
  nav: NavLabels
  noticeTag: string
  notice: string
  viewAll: string
  newBadge: string
  newsTitle: string
  news: NewsItem[]
  marketCards: MarketCard[]
  policyRatesTitle: string
  policyRates: PolicyRate[]
  reserveTitle: string
  category: string
  reserves: Reserve[]
  auctionTitle: string
  auctionCal: string
  lastUpd: string
  auctionNote: string
  auctions: Auction[]
  exploreEyebrow: string
  exploreTitle: string
  moreLabel: string
  moreLinks: string[]
  modules: ModuleCard[]
  svcEyebrow: string
  svcTitle: string
  cipcTitle: string
  cipcSub: string
  cipcLine: string
  cipcBtn: string
  services: ServiceCard[]
  govEyebrow: string
  govMsg: string
  govName: string
  govRole: string
  govPhoto: string
  govBtn: string
  hotlineEyebrow: string
  hotlines: Hotline[]
  footerContact: string
  footerLinks: string
  footerAbout: string
  footerHotline: string
  address: string
  phone: string
  email: string
  usefulLinks: string[]
  aboutLinks: string[]
  copy: string
  fHome: string
  fSitemap: string
  fFeedback: string
  disclaimerLabel: string
  disclaimer: string
  crumbHome: string
  sideRatesTitle: string
  relatedTitle: string
  indLabels: string[]
  pages: Record<InnerPageKey, InnerPageContent>
}

export type LangCode = 'en' | 'bn'
