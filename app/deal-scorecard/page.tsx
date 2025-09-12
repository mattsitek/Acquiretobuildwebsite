import { Metadata } from 'next'
import DealScorecardClient from './deal-scorecard-client'

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.acquiretobuild.com/deal-scorecard",
  },
}

export default function DealScorecardPage() {
  return <DealScorecardClient />
}
