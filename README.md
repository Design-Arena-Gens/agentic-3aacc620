## Reusable Button Component

This project showcases a reusable button built with Next.js, TypeScript, and Tailwind CSS. It supports multiple variants, sizes, loading states, icons, and renders as any element via the `asChild` prop.

### Local development

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the demo.

### Usage

```tsx
import { Button } from "@/components/ui/button";

export function Example() {
  return (
    <div className="flex gap-4">
      <Button>Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost" loading>
        Saving
      </Button>
    </div>
  );
}
```

### Custom props

- `variant`: `solid` | `outline` | `subtle` | `ghost` | `destructive`
- `size`: `sm` | `md` | `lg` | `icon`
- `loading`: Toggle a built-in spinner and disable the control.
- `leftIcon` / `rightIcon`: Add icons without extra markup.
- `href`: Render the button as a Next.js link while keeping button styling.
