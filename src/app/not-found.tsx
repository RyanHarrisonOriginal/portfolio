import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <main className="section-padding container-max text-center">
        <h1 className="text-4xl font-display mb-4">404</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Page not found
        </p>
        <Link 
          href="/" 
          className="text-accent hover:underline font-medium"
        >
          Return home
        </Link>
      </main>
    </div>
  );
}

