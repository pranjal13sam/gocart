import { inngest } from "./client";
import prisma from "@/lib/prisma";

//inngest function to save user data to database

export const saveUserData = inngest.createFunction(
  { id: "save-user-data" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { data } = event;
    await prisma.user.create({
      data: {
        id: data.id,
        email: data.email_addresses[0].email_address,
        name: `${data.first_name} ${data.last_name}`,
        image: data.image_url,
      },
    });
  }
);

//inngest function to update user data in database

export const updateUserData = inngest.createFunction(
  { id: "update-user-data" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { data } = event;
    await prisma.user.update({
      where: { id: data.id },
      data: {
        email: data.email_addresses[0].email_address,
        name: `${data.first_name} ${data.last_name}`,
        image: data.image_url,
      },
    });
  }
);

//inngest function to delete user data from database:

export const deleteUserData = inngest.createFunction(
  { id: "delete-user-data" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { data } = event;
    await prisma.user.delete({
      where: { id: data.id },
    });
  }
);


