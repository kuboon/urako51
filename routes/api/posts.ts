import { Handlers } from "$fresh/server.ts";

const kv = await Deno.openKv();
export const handler: Handlers = {
  async POST(req) {
    const json = await req.json();
    console.log(json)
    const key = ["posts", json.email];
    await kv.set(key, json);
    return new Response(null, { status: 204 });
  },
};
