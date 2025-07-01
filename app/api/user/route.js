import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "@/server/controllers/userController";

export async function GET(request) {
  return await getUsers(request);
}

export async function DELETE(request) {
  return await deleteUser(request);
}

export async function PUT(request) {
  return await updateUser(request);
}

export async function POST(request) {
  return await createUser(request);
}
