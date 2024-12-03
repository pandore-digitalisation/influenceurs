import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const profileUrl = searchParams.get("profile_url");

  if (!profileUrl) {
    return NextResponse.json({ error: "URL de profil requise" }, { status: 400 });
  }

  try {
    const response = await axios.get(`https://your-api-url/tiktok`, {
      params: { profile_url: profileUrl },
    });
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Erreur API TikTok :", error.message);
    return NextResponse.json(
      { error: "Impossible de récupérer les données TikTok" },
      { status: 500 }
    );
  }
}
