import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const noteVariants = cva(
    'p-3 my-4 rounded-lg border-l-4',
    {
        variants: {
            variant: {
                note: 'bg-slate-300/40 border-slate-400/40 dark:bg-slate-600/40 dark:border-slate-500',
                warning: 'bg-yellow-400/40 border-yellow-400 dark:bg-yellow-600/40 dark:border-yellow-500 ',
                danger: 'bg-red-400/40 border-red-400 dark:bg-red-600/40 dark:border-red-500',
                success: 'bg-emerald-400/40 border-emerald-400 dark:bg-emerald-600/40 dark:border-emerald-500',
            }
        },
        defaultVariants: {
            variant: 'note'
        }
    }
);

export interface NoteProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof noteVariants> {
}

const Note: React.ForwardRefRenderFunction<HTMLDivElement, NoteProps> = ({className, variant, children, ...props}, ref) => {
    return (
        <div className={cn(noteVariants({variant}), className)} ref={ref} {...props}>
            <h3 className="not-prose text-lg font-bold capitalize">{variant}</h3>
            <div className="text-foreground">{children}</div>
        </div>
    );
};

Note.displayName = 'Note';
export { Note, noteVariants };