// The Living Sketchbook homepage manages its own navigation (SketchNav)
// and footer (SketchFooter) via StoryLayout.
// Other public pages still receive the header/footer through their own layouts.

export default function PublicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
