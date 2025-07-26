// src/app/api/login/route.ts
import { NextResponse } from "next/server";
import { serviceDataGET, serviceLogin } from "@/modules/login/services";
import { loginSchema } from "@/modules/login/schemas";

export async function GET() {
  try {
    const dados = await serviceDataGET();
    return NextResponse.json({ dados });
  } catch (erro) {
    console.error("Erro na rota:", erro);
    return NextResponse.json(
      { erro: "Erro ao acessar a planilha" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Dados inválidos", issues: result.error.message },
        { status: 400 }
      );
    }

    const { email, password } = result.data;

    const user = await serviceLogin(email, password);

    if (!user) {
      return NextResponse.json(
        { error: "Credenciais inválidas" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Login bem-sucedido", user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro na rota:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
