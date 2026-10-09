import { Container, ButtonLink } from "@/components/ui/primitives";
import { T } from "@/components/ui/T";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="text-6xl">🧭</p>
      <h1 className="mt-4 text-2xl font-extrabold text-ink">
        <T k="notFound.title" />
      </h1>
      <p className="mt-2 text-sm text-ink-soft">
        <T k="notFound.text" />
      </p>
      <ButtonLink href="/" className="mt-6">
        <T k="notFound.home" />
      </ButtonLink>
    </Container>
  );
}
