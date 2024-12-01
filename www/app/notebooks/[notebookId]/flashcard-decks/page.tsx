import NotebookLayout from "../components/notebook-layout";
import FlashcardDecksGrid from "./components/flashcard-decks-grid";

type Props = Readonly<{
  params: Promise<{ notebookId: string }>;
}>;

export default async function FlashcardDecksPage({ params }: Props) {
  return (
    <NotebookLayout params={params}>
      <FlashcardDecksGrid>Flashcard Decks</FlashcardDecksGrid>
    </NotebookLayout>
  );
}
