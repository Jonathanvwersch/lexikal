import { LucideIcon, MessageSquareQuote, Plus, Zap } from "lucide-react";

type Submenu = {
  label: string;
  icon?: LucideIcon;
};

type Menu = {
  href: string;
  label: string;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = Menu[];

export const menuItems: Group = [
  {
    href: "/sources",
    label: "Sources",
    icon: MessageSquareQuote,
    submenus: [
      {
        icon: Plus,
        label: "Add a source",
      },
    ],
  },
  {
    href: "/flashcards",
    label: "Flashcards",
    icon: Zap,
    submenus: [
      {
        icon: Plus,
        label: "Create flashcard deck",
      },
    ],
  },
];
