import { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.acquiretobuild.com/am-i-ready",
  },
}
import AmIReadyClient from './am-i-ready-client'

export default function AmIReadyPage() {
  return <AmIReadyClient />
}
