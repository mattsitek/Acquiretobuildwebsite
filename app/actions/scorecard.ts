"use server"

import { subscribeToNewsletter } from "./newsletter"

export async function subscribeToScorecard(formData: FormData) {
  return subscribeToNewsletter(formData)
}
