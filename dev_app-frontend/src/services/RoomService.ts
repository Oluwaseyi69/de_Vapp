// src/services/RoomService.ts

import axios from "axios";

const BASE_URL = "http://localhost:5050/api/v1";

// Type for the form input (you can import this from a `dto` file if desired)
export interface CreateRoomPayload {
  title: string;
  description: string;
  options: string[];
  deadline: string;
}

// Create a decision room
export const createRoom = async (roomData: CreateRoomPayload) => {
  const token = localStorage.getItem("token");

  console.log("Token: ", token);
  const response = await axios.post(`${BASE_URL}/create`, roomData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("Response from room service; ", response);

  return response.data;
};

export const castVote = async ({
  roomCode,
  selectedOption,
}: {
  roomCode: string;
  selectedOption: string;
}) => {
  const token = localStorage.getItem("token");
  const guestId =
    localStorage.getItem("guestId") || `guest:${crypto.randomUUID()}`;
  localStorage.setItem("guestId", guestId); // persist guest

  const headers: any = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  else headers["x-guest-id"] = guestId;

  const response = await axios.post(
    `${BASE_URL}/${roomCode}/vote`,
    { selectedOption },
    { headers }
  );
  console.log("Response from voting", response);

  return response.data;
};
