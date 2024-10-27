import Link from "next/link";
import { Button } from "../ui/button";

export function Hero() {
  return (
    <div className="flex flex-col items-center justify-center w-full mt-20">
      <div className="flex flex-col items-center justify-center gap-6">
        <h1 className="text-4xl sm:text-7xl font-bold text-center max-w-screen-sm">
          Your AI-Powered Knowledge Hub
        </h1>
        <p className="text-lg max-w-screen-sm text-center">
          Upload documents, ask questions, and convert notes into flashcards and
          quizzes for an immersive learning experience
        </p>
      </div>
      <Button size="lg" className="text-lg mt-8" asChild>
        <Link href="/sign-up">
          Start creating
          <span className="text-xs ml-2 mb-0.5"> - it's free</span>
        </Link>
      </Button>
      <div className="flex items-center justify-center mt-8"></div>
    </div>
  );
}
