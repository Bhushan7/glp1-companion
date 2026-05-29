export const dynamic = 'force-dynamic'

export async function POST() {
  return Response.json({ message: 'OK' }, { status: 200 })
}
