import { define } from "../../define.ts";

const kv = await Deno.openKv();
export const handler = define.handlers({
  async POST(ctx) {
    const req = ctx.req;
    const json = await req.json();
    console.log(json);
    const key = ["posts", json.email];
    await kv.set(key, json);
    return new Response(null, { status: 204 });
  },
});
