import NextTopLoader from 'nextjs-toploader'

export default function TopLoader() {
  return (
    <NextTopLoader
      color="#05b6d3"
      initialPosition={0.08}
      crawlSpeed={200}
      height={3}
      crawl={true}
      showSpinner={true}
      easing="ease"
      speed={200}
      shadow="0 0 10px #05b6d3,0 0 5px #45c6c0"
    />
  )
}
