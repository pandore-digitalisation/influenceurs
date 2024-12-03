import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Nom d'utilisateur requis" }, { status: 400 });
  }

  try {
    const response = await axios.get(`http://localhost:5000/facebook`, {
      params: { username },
    });
    return NextResponse.json(response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Erreur API Facebook :", error.message);
    } else {
      console.error("Erreur inconnue :", error);
    }
    return NextResponse.json(
      { error: "Impossible de récupérer les données Facebook" },
      { status: 500 }
    );
  }
}
