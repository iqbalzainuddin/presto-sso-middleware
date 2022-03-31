import type { NextRequest } from "next/server";
import { NextResponse } from 'next/server'
import { nanoid } from "nanoid";
import { verifyAuth } from "@lib/auth";
import { jsonResponse } from "@lib/utils";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const res = NextResponse.redirect(`${url.origin}/user`)

  if (url.searchParams.has("code")) {
    console.log("ys", url.searchParams.get("code"));
    // const resOrPayload = await verifyAuth(req);
    // return resOrPayload instanceof Response
    //   ? resOrPayload
    //   : jsonResponse(200, { nanoid: nanoid(), jwtID: resOrPayload.jti });
    const result = await fetch(
      `https://api.staging.prestocolor.online/v1/audienceAuth/presto/login?code=${url.searchParams.get("code")}&app_id=613f08152422178da57821d5`,
    )
    .then(async (response) => {
        if (!response.ok) {
            const errorMessage = await response.json();
            throw Error(errorMessage.message);
        }
        return response;
    })
    .then((response) => response.json())
    .catch((err) => console.error(err));
    res.cookie('userData', JSON.stringify(result));
    return res;
  }
}
