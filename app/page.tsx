import { ArrowRight, Download, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";

const variants = ["solid", "outline", "subtle", "ghost", "destructive"] as const;
const sizes = ["sm", "md", "lg", "icon"] as const;

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-12 bg-neutral-950 px-6 py-16 text-neutral-50 sm:px-12">
      <section className="mx-auto flex max-w-3xl flex-col gap-6 text-center sm:text-left">
        <span className="inline-flex items-center gap-2 self-center rounded-full bg-white/10 px-4 py-1 text-sm font-medium text-white/80 sm:self-start">
          Tailwind + TypeScript
        </span>
        <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
          A reusable button component ready for your next project
        </h1>
        <p className="text-lg text-neutral-300 sm:text-xl">
          The button supports multiple variants, sizes, loading states, and can
          morph into links or custom components with a single prop.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
            Get Started
          </Button>
          <Button variant="outline" size="lg" leftIcon={<Download className="h-4 w-4" />}>
            Download
          </Button>
          <Button variant="ghost" size="lg" leftIcon={<Share2 className="h-4 w-4" />}>
            Share
          </Button>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-4xl flex-col gap-8 rounded-3xl bg-white/5 p-8 sm:p-12">
        <h2 className="text-2xl font-semibold">Usage examples</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4 rounded-2xl bg-black/40 p-6">
            <h3 className="text-lg font-medium text-white/80">Variants</h3>
            <div className="flex flex-wrap gap-3">
              {variants.map((variant) => (
                <Button key={variant} variant={variant}>
                  {variant.charAt(0).toUpperCase() + variant.slice(1)}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-4 rounded-2xl bg-black/40 p-6">
            <h3 className="text-lg font-medium text-white/80">Sizes</h3>
            <div className="flex flex-wrap items-end gap-3">
              {sizes.map((size) => (
                <Button key={size} size={size} variant="subtle">
                  {size === "icon" ? <ArrowRight className="h-4 w-4" /> : size}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-4 rounded-2xl bg-black/40 p-6">
            <h3 className="text-lg font-medium text-white/80">Loading state</h3>
            <div className="flex flex-wrap gap-3">
              <Button loading>Saving</Button>
              <Button loading variant="outline">
                Uploading
              </Button>
              <Button loading variant="ghost">
                Please wait
              </Button>
            </div>
          </div>
          <div className="space-y-4 rounded-2xl bg-black/40 p-6">
            <h3 className="text-lg font-medium text-white/80">Render as link</h3>
            <Button
              href="https://agentic-3aacc620.vercel.app/documentation"
              variant="outline"
              target="_blank"
              rel="noreferrer"
            >
              View documentation
            </Button>
            <p className="text-sm text-neutral-400">
              Pass an `href` to render the button as a link. Add `target` and
              `rel` for external destinations.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-3xl flex-col gap-4 text-neutral-300">
        <h2 className="text-xl font-semibold text-neutral-50">
          Import and configure
        </h2>
        <pre className="overflow-x-auto rounded-2xl bg-black/60 p-6 text-left text-sm leading-6 text-green-200">
          <code>{`import { Button } from "@/components/ui/button";

export default function Example() {
  return (
    <div className="flex gap-4">
      <Button>Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  );
}`}</code>
        </pre>
      </section>
    </main>
  );
}
