export async function sendWeeklyEmail(
  userEmail: string,
  userName: string,
  weekNumber: number,
  insightText: string,
  pdfUrl?: string
): Promise<void> {
  const response = await fetch('https://app.loops.so/api/v1/transactional', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.LOOPS_API_KEY}`,
    },
    body: JSON.stringify({
      transactionalId: process.env.LOOPS_WEEKLY_TEMPLATE_ID,
      email: userEmail,
      dataVariables: {
        userName,
        weekNumber,
        insightText,
        pdfUrl: pdfUrl ?? '',
      },
    }),
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Loops API error ${response.status}: ${text}`)
  }
}
