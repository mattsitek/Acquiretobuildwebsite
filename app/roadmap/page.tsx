import { Metadata } from 'next'
import RoadmapClient from './roadmap-client'

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.acquiretobuild.com/roadmap",
  },
}

export default function RoadmapPage() {
  return <RoadmapClient />
}
