import React from 'react'

export default function ContentContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full rounded-3xl bg-white px-9 py-7 shadow-[rgba(226,236,249,_0.5)_0px_0px_16px] dark:bg-neutral-900 dark:shadow-neutral-800">
      {children}
    </div>
  )
}
