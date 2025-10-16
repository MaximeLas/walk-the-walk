# Component Name

> Brief description of what this component does and when to use it.

## Usage

```tsx
import { ComponentName } from '@atoms/ComponentName'

// Basic usage
<ComponentName>Content</ComponentName>

// With props
<ComponentName variant="primary" size="lg">
  Content
</ComponentName>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline'` | `'primary'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Component size |
| `disabled` | `boolean` | `false` | Whether component is disabled |
| `className` | `string` | `''` | Additional CSS classes |
| `children` | `React.ReactNode` | - | Content to render inside |

## TypeScript Interface

```tsx
interface ComponentNameProps {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
  children: React.ReactNode
}
```

## Variants

### Primary
Default variant for primary actions.

### Secondary
For secondary or less important actions.

### Outline
For tertiary actions or subtle interactions.

## States

- **Default**: Normal resting state
- **Hover**: Mouse over the component
- **Focus**: Keyboard focus or clicked
- **Active**: Component is being pressed
- **Disabled**: Component is non-interactive

## Accessibility

- Uses semantic HTML elements
- Includes proper ARIA labels
- Keyboard navigable
- Screen reader friendly

## Design Tokens Used

- Colors: `primary-500`, `neutral-100`
- Spacing: `px-4`, `py-2`
- Border radius: `rounded-md`
- Typography: `text-base`, `font-medium`

## Example Implementation

```tsx
import React from 'react'
import clsx from 'clsx'

interface ComponentNameProps {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
  children: React.ReactNode
}

export const ComponentName: React.FC<ComponentNameProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
  children,
}) => {
  // Base classes that apply to all variants
  const baseClasses = 'font-medium rounded-md transition-colors duration-200'

  // Variant-specific classes
  const variantClasses = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600',
    secondary: 'bg-secondary-500 text-white hover:bg-secondary-600',
    outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50',
  }

  // Size-specific classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  // Disabled state classes
  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer'

  return (
    <button
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabledClasses,
        className
      )}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
```

## Notes

Any additional implementation notes, edge cases, or important details.
