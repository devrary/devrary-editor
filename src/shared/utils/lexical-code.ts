import {
  LexicalCodeExtension,
  LexicalCodeName,
} from "@/shared/constants/lexical";

export function getLangByName(name: string): keyof typeof LexicalCodeName {
  return LexicalCodeName[name] || "Plain-Text";
}

export function getLangByExtension(
  extension: string
): keyof typeof LexicalCodeExtension {
  return LexicalCodeExtension[extension] || "Plain-Text";
}

export function getDefaultLang(): keyof typeof LexicalCodeName {
  return "Plain-Text";
}

export function getCodeLangOptions(): [string, string][] {
  const options: [string, string][] = [];
  for (const [name, lang] of Object.entries(LexicalCodeName)) {
    options.push([name, lang]);
  }

  return options;
}
