export const dynamic = 'force-dynamic'

export async function POST() {
  return Response.json({ message: 'Payment coming soon' }, { status: 200 })
}
