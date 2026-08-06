-- AlterTable
ALTER TABLE "user_roles" ALTER COLUMN "church_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "church_id" DROP NOT NULL;
