import Link from "next/link";

import { Container, Section } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Section>
      <Container>
        <h1 className="text-3xl font-bold text-foreground">Page not found</h1>
        <p className="mt-2 text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <Button asChild>
            <Link href="/">Go home</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
