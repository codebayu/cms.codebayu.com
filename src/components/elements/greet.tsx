'use client'
export default function Greet() {
  const author = process.env.NEXT_PUBLIC_AUTHOR
  return <div>Hello {author}</div>
}
