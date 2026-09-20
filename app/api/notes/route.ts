import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const view = searchParams.get("view") || "active";

  let notes;

  if (view === "trash") {
    notes = await prisma.note.findMany({
      where: {
        deletedAt: {
          not: null,
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  } else if (view === "favorites") {
    notes = await prisma.note.findMany({
      where: {
        isFavorite: true,
        deletedAt: null,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  } else {
    notes = await prisma.note.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return NextResponse.json(notes);
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.title?.trim() || !body.content?.trim()) {
    return NextResponse.json(
      { message: "Title and content are required" },
      { status: 400 }
    );
  }

  const newNote = await prisma.note.create({
    data: {
      title: body.title.trim(),
      content: body.content.trim(),
    },
  });

  return NextResponse.json(newNote, { status: 201 });
}

export async function PUT(request: Request) {
  const body = await request.json();

  if (!body.id) {
    return NextResponse.json(
      { message: "Note id is required" },
      { status: 400 }
    );
  }

  const existingNote = await prisma.note.findUnique({
    where: {
      id: Number(body.id),
    },
  });

  if (!existingNote) {
    return NextResponse.json(
      { message: "Note not found" },
      { status: 404 }
    );
  }

  const updatedNote = await prisma.note.update({
    where: {
      id: Number(body.id),
    },
    data: {
      ...(body.title !== undefined && {
        title: body.title.trim(),
      }),

      ...(body.content !== undefined && {
        content: body.content.trim(),
      }),

      ...(body.isFavorite !== undefined && {
        isFavorite: Boolean(body.isFavorite),
      }),
    },
  });

  return NextResponse.json(updatedNote);
}

export async function DELETE(request: Request) {
  const body = await request.json();

  if (!body.id) {
    return NextResponse.json(
      { message: "Note id is required" },
      { status: 400 }
    );
  }

  const existingNote = await prisma.note.findUnique({
    where: {
      id: Number(body.id),
    },
  });

  if (!existingNote) {
    return NextResponse.json(
      { message: "Note not found" },
      { status: 404 }
    );
  }

  const deletedNote = await prisma.note.update({
    where: {
      id: Number(body.id),
    },
    data: {
      deletedAt: new Date(),
    },
  });

  return NextResponse.json(deletedNote);
}

export async function PATCH(request: Request) {
  const body = await request.json();

  if (!body.id) {
    return NextResponse.json(
      { message: "Note id is required" },
      { status: 400 }
    );
  }

  const existingNote = await prisma.note.findUnique({
    where: {
      id: Number(body.id),
    },
  });

  if (!existingNote) {
    return NextResponse.json(
      { message: "Note not found" },
      { status: 404 }
    );
  }

  const updatedNote = await prisma.note.update({
    where: {
      id: Number(body.id),
    },
    data: {
      deletedAt: null,
    },
  });

  return NextResponse.json(updatedNote);
}