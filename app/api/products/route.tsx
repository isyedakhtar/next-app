import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";

export function GET(request: NextRequest) {
  console.log(request);
  return NextResponse.json([
    { id: 1, name: "Milk", price: 2.5 },
    { id: 2, name: "MilkBread", price: 3.5 },
  ]);
}

interface Product {
  name: string;
  price: number;
}
export async function POST(request: NextRequest) {
  const body: Product = await request.json();
  const validation = await schema.safeParseAsync(body);
  if (validation.success)
    return NextResponse.json(
      { id: "1", name: body.name, price: body.price },
      { status: 201 }
    );
  return NextResponse.json(validation.error.errors);
}
