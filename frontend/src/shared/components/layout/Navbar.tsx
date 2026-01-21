import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { Logo } from "@/shared/ui/logo";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Product
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Solutions
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Resources
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            asChild
            className="hidden sm:flex text-muted-foreground hover:text-white hover:bg-white/5"
          >
            <Link href="/login">Log In</Link>
          </Button>
          <Button
            asChild
            className="bg-primary text-primary-foreground shadow-[0_0_15px_rgba(16,183,127,0.4)] hover:bg-primary-dark"
          >
            <Link href="/register">Start Free Trial</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
