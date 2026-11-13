// All facts come from veon/client.json (W-F002…W-F011) and decisions.md. Nothing here is invented.
// Prices: only items with explicit «грн» on the client's site (W-F005); implants have no currency there, so no figures.

export const clinic = {
  name: "МедГарант",
  phone: { display: "+380 95 802 92 85", href: "tel:+380958029285", e164: "+380958029285" },
  email: "olargarapteka@gmail.com",
  address: {
    street: "вул. Собранецька, 160",
    city: "Ужгород",
    region: "Закарпатська обл.",
    postal: "88000",
    full: "вул. Собранецька, 160, Ужгород, 88000",
  },
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=%D0%B2%D1%83%D0%BB.%20%D0%A1%D0%BE%D0%B1%D1%80%D0%B0%D0%BD%D0%B5%D1%86%D1%8C%D0%BA%D0%B0%2C%20160%2C%20%D0%A3%D0%B6%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%2C%2088000",
  hours: [
    { days: "Пн–Пт", time: "09:00–19:00", label: "Понеділок – п'ятниця" },
    { days: "Сб", time: "09:00–15:00", label: "Субота" },
    { days: "Нд", time: "вихідний", label: "Неділя" },
  ],
  socials: [
    { name: "Instagram", handle: "medgarant062", url: "https://www.instagram.com/medgarant062/" },
    { name: "Facebook", handle: "MedGarant", url: "https://www.facebook.com/people/MedGarant/61573031257961/" },
  ],
} as const;

export type DoctorId = "piddubnyi" | "piddubna" | "knysh" | "zerov" | "povaha";
export type ServiceId =
  | "therapy"
  | "endo"
  | "hygiene"
  | "whitening"
  | "restoration"
  | "extraction"
  | "implants"
  | "prosthetics"
  | "ortho";

export interface Doctor {
  id: DoctorId;
  name: string;
  /** Full name as on the client's site (C-021). */
  full: string;
  /** Specialisations as on the client's site (W-F004); `service` links back to the treatment map row. */
  specs: { label: string; service?: ServiceId }[];
}

export const doctors: Doctor[] = [
  {
    id: "piddubnyi",
    name: "Піддубний А. А.", full: "Піддубний Альберт Артурович",
    specs: [
      { label: "терапевт", service: "therapy" },
      { label: "гігієніст", service: "hygiene" },
      { label: "хірург", service: "extraction" },
    ],
  },
  { id: "piddubna", name: "Піддубна О. В.", full: "Піддубна Ольга Володимирівна", specs: [{ label: "терапевт", service: "therapy" }] },
  {
    id: "knysh",
    name: "Книш Д. М.", full: "Книш Дмитро Миколайович",
    specs: [
      { label: "хірург", service: "extraction" },
      { label: "імплантолог", service: "implants" },
    ],
  },
  {
    id: "zerov",
    name: "Зеров О. В.", full: "Зеров Олександр Валерійович",
    specs: [
      { label: "терапевт", service: "therapy" },
      { label: "ендодонтист", service: "endo" },
      { label: "ортопед", service: "prosthetics" },
      { label: "хірург", service: "extraction" },
    ],
  },
  {
    id: "povaha",
    name: "Повага В. С.", full: "Повага Віталій Сергійович",
    specs: [{ label: "ортодонт", service: "ortho" }, { label: "гнатолог" }],
  },
];

export interface Service {
  id: ServiceId;
  name: string;
  note?: string;
  doctors: DoctorId[];
  /** «від … грн» from W-F005, or null when the site shows no price with a currency. */
  from: string | null;
  fromLabel?: string;
  priceAnchor: string;
  priceLink: string;
}

export const services: Service[] = [
  { id: "therapy", name: "Терапія", doctors: ["piddubnyi", "piddubna", "zerov"], from: "400 грн", fromLabel: "контрольний огляд", priceAnchor: "price-therapy", priceLink: "Ціни на огляд" },
  { id: "endo", name: "Ендодонтія", note: "лікування каналів", doctors: ["zerov"], from: "2 500 грн", fromLabel: "від", priceAnchor: "price-endo", priceLink: "Ціни на ендодонтію" },
  { id: "hygiene", name: "Професійна гігієна", doctors: ["piddubnyi"], from: "1 500 грн", fromLabel: "від", priceAnchor: "price-hygiene", priceLink: "Ціни на гігієну" },
  { id: "whitening", name: "Відбілювання Flash", doctors: [], from: "4 500 грн", fromLabel: "від", priceAnchor: "price-whitening", priceLink: "Ціни на відбілювання" },
  { id: "restoration", name: "Естетична реставрація", doctors: [], from: "1 500 грн", fromLabel: "від", priceAnchor: "price-restoration", priceLink: "Ціни на реставрацію" },
  { id: "extraction", name: "Видалення", note: "будь-якої складності", doctors: ["piddubnyi", "knysh", "zerov"], from: "1 000 грн", fromLabel: "від", priceAnchor: "price-extraction", priceLink: "Ціни на видалення" },
  { id: "implants", name: "Імплантація", note: "імпланти MIS і Straumann", doctors: ["knysh"], from: null, priceAnchor: "price-implants", priceLink: "Про імпланти" },
  { id: "prosthetics", name: "Протезування", note: "усі види", doctors: ["zerov"], from: "4 500 грн", fromLabel: "від", priceAnchor: "price-prosthetics", priceLink: "Ціни на коронки" },
  { id: "ortho", name: "Ортодонтія", doctors: ["povaha"], from: null, priceAnchor: "price-start", priceLink: "З чого почати" },
];

export interface PriceItem { name: string; price: string | null; }
export interface PriceSet { id: string; title: string; items: PriceItem[]; }

export const startPrices: PriceItem[] = [
  { name: "Консультація", price: "300" },
  { name: "Діагностика і планування лікування", price: "500" },
];

export const priceSets: PriceSet[] = [
  { id: "price-therapy", title: "Терапія", items: [{ name: "Контрольний огляд", price: "400 грн" }] },
  {
    id: "price-hygiene",
    title: "Професійна гігієна",
    items: [
      { name: "Професійна гігієна, 1 ступінь", price: "1 500 грн" },
      { name: "Професійна гігієна, 2 ступінь", price: "1 800 грн" },
    ],
  },
  {
    id: "price-whitening",
    title: "Відбілювання Flash",
    items: [
      { name: "Одна щелепа", price: "4 500 грн" },
      { name: "Дві щелепи", price: "8 500 грн" },
    ],
  },
  { id: "price-restoration", title: "Естетична реставрація", items: [{ name: "Фотополімерна реставрація, 1 поверхня", price: "1 500 грн" }] },
  { id: "price-endo", title: "Ендодонтія", items: [{ name: "Лікування 1-кореневого зуба", price: "2 500 грн" }] },
  {
    id: "price-extraction",
    title: "Видалення",
    items: [
      { name: "Просте видалення", price: "1 000 грн" },
      { name: "Складне видалення", price: "2 500 грн" },
    ],
  },
  {
    id: "price-prosthetics",
    title: "Протезування",
    items: [
      { name: "Коронка металокерамічна", price: "4 500 грн" },
      { name: "Коронка цирконієва", price: "8 500 грн" },
    ],
  },
  {
    id: "price-implants",
    title: "Імплантація",
    items: [
      { name: "Імплант MIS (Ізраїль)", price: null },
      { name: "Імплант Straumann", price: null },
    ],
  },
];

export const principles = [
  "Якість — пріоритет",
  "Індивідуальний підхід",
  "Комфорт і безпека, сертифіковані матеріали",
] as const;
