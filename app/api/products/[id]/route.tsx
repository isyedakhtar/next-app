import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import { number } from "zod";
export function GET(request: NextRequest, params: { id: number }) {
  return NextResponse.json({
    name: "MilkAndBreads",
    id: 3,
    price: 3.5,
  });
}

interface Product {
  name: string;
  price: number;
}
export async function PUT(request: NextRequest, params: { id: number }) {
  const body: Product = await request.json();
  const validation = await schema.safeParseAsync(body);
  if (validation.success)
    return NextResponse.json({ id: "9", name: body.name, price: body.price });
  return NextResponse.json(validation.error.errors);
}

export async function DELETE(request: NextRequest, params: { id: number }) {
  return NextResponse.json({ message: "Deleted" });
}
