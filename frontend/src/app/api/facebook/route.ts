import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Nom d'utilisateur requis" }, { status: 400 });
  }

  try {
    const response = await axios.get(`https://your-api-url/facebook`, {
      params: { username },
    });
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Erreur API Facebook :", error.message);
    return NextResponse.json(
      { error: "Impossible de récupérer les données Facebook" },
      { status: 500 }
    );
  }
}
