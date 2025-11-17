import { NextResponse } from "next/server";

export async function POST() {
  try {
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const CRON_SECRET = process.env.CRON_SECRET!;

    const response = await fetch(`${SUPABASE_URL}/functions/v1/activate`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CRON_SECRET}`,
      },
    });

    const data = await response.json();

    return NextResponse.json(
      { supabaseResponse: data },
      { status: response.status },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to call Supabase function" },
      { status: 500 },
    );
  }
}
