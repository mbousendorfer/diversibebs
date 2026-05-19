import { Toaster as Sonner } from "sonner"

const Toaster = () => (
  <Sonner
    duration={4800}
    mobileOffset={{
      bottom: "calc(env(safe-area-inset-bottom) + 1rem)",
      left: "1rem",
      right: "1rem",
      top: "calc(env(safe-area-inset-top) + 1.25rem)",
    }}
    offset={{
      bottom: "calc(env(safe-area-inset-bottom) + 1.5rem)",
      left: "1.5rem",
      right: "1.5rem",
      top: "calc(env(safe-area-inset-top) + 1.5rem)",
    }}
    position="top-center"
    toastOptions={{
      classNames: {
        toast:
          "w-[calc(100vw-2rem)] max-w-md rounded-xl border border-foreground/20 bg-foreground px-4 py-3 text-background shadow-2xl shadow-foreground/25 dark:border-border dark:bg-card dark:text-card-foreground dark:shadow-black/45",
        title: "text-sm font-semibold leading-5",
        description: "text-sm leading-5 text-background/80 dark:text-muted-foreground",
        actionButton:
          "border border-background/25 bg-background/15 text-background hover:bg-background/25 dark:border-border dark:bg-muted dark:text-foreground dark:hover:bg-muted/80",
        cancelButton:
          "border border-background/20 bg-transparent text-background/85 hover:bg-background/15 dark:border-border dark:text-muted-foreground dark:hover:bg-muted",
        closeButton:
          "border-background/25 bg-foreground text-background hover:bg-foreground dark:border-border dark:bg-card dark:text-card-foreground",
      },
    }}
  />
)

export { Toaster }
