import { type Translation } from "@/composables/localization"

import en from "./en"

type ComponentTranslation = typeof en

const translations: Translation<ComponentTranslation> = {
  en
}

export default translations
