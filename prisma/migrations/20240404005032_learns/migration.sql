-- CreateTable
CREATE TABLE "Learn" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "isNew" BOOLEAN NOT NULL,
    "isShow" BOOLEAN NOT NULL,

    CONSTRAINT "Learn_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Learn_id_key" ON "Learn"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Learn_slug_key" ON "Learn"("slug");
