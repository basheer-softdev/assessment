import { NextResponse } from "next/server";
import dbConnect from "../config/dbConnect";
import UserModel from "@/server/models/userModel";

export async function createUser(request) {
  try {
    await dbConnect();

    const { userDetail } = await request.json();

    console.log(userDetail);

    if (!userDetail) {
      return NextResponse.json(
        { message: "Please provide user details" },
        { status: 400 }
      );
    }

    const newUser = new UserModel({
      firstName: userDetail.firstName,
      lastName: userDetail.lastName,
      email: userDetail.email,
      phone: userDetail.phone,
      street: userDetail.street,
      city: userDetail.city,
      state: userDetail.state,
      code: userDetail.code,
    });

    await newUser.save();

    return NextResponse.json(
      { message: "Successfully created!", newUser },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating user", error: error.message },
      { status: 500 }
    );
  }
}

export async function getUsers(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    const search = searchParams.get("search") || "";
    const sortField = searchParams.get("sortField") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") === "asc" ? 1 : -1;
    const city = searchParams.get("city") || null;
    const state = searchParams.get("state") || null;

    // Build query object
    const query = {};

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }
    if (city) {
      query.city = city;
    }
    if (state) {
      query.state = state;
    }

    const total = await UserModel.countDocuments(query);
    const users = await UserModel.find(query)
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      success: true,
      message: "Users fetched successfully",
      data: users,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching users", error: error.message },
      { status: 500 }
    );
  }
}

export async function updateUser(request) {
  await dbConnect();

  try {
    const { userDetail } = await request.json();

    if (!userDetail || !userDetail._id) {
      return NextResponse.json(
        { message: "User ID and details are required" },
        { status: 400 }
      );
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userDetail._id,
      {
        firstName: userDetail.firstName,
        lastName: userDetail.lastName,
        email: userDetail.email,
        phone: userDetail.phone,
        street: userDetail.street,
        city: userDetail.city,
        state: userDetail.state,
        code: userDetail.code,
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating user", error: error.message },
      { status: 500 }
    );
  }
}

export async function deleteUser(request) {
  await dbConnect();

  try {
    const { id } = await request.json();

    console.log("id for delete:", id);

    if (!id) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const deletedUser = await UserModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Successfully deleted!", deletedUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating user", error },
      { status: 500 }
    );
  }
}
