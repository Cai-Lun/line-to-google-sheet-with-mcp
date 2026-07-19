import {
  getAccountBinding,
  insertValueIntoAccountBinding
} from "@/src/services/accountBinding"

export async function POST(request: Request) {
  const body = await request.json()
  console.log("body", JSON.stringify(body, null, 2))
  const events = body.events
  if (events[0].type === "follow") {
    const accountBinding = await getAccountBinding();
    if (accountBinding.length === 0) {
      await insertValueIntoAccountBinding("line_id", events[0].source.userId);
      return new Response('line id set successfully')
    }
  }

  return new Response("")
}
