interface HtmlContentProps {
  html: string
  className?: string
}

export function HtmlContent({ html, className }: HtmlContentProps) {
  return (
    <div dangerouslySetInnerHTML={{ __html: html }} className={className} />
  )
}
