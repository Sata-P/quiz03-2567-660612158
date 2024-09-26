import { Database, DB, readDB, writeDB } from "@lib/DB";
import { checkToken } from "@lib/checkToken";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request:NextRequest) => {
 
  readDB();


  return NextResponse.json({
    ok: true,
      rooms:  (<Database>DB).rooms, 
      totalRooms: (<Database>DB).rooms.length
  });
};


export const POST = async (request: NextRequest) => {

  const payload = checkToken();
  
    if(!payload){

     return NextResponse.json(
      {
        ok: false,
         message: "Invalid token",
       },
       { status: 401 }
     );
    }

  readDB();

  const { roomsName } = await request.json();
  const foundRoomName = (<Database>DB).rooms.find(
  (x)=> x.roomId === roomId && x.roomName == x.roomName
  );

    if(foundRoomName) {
   return NextResponse.json(
     {
       ok: false,
       message: `Room ${roomsName} already exists`,
     },
     { status: 400 }
   );

  }

  const { roomName } = await request.json();
  const roomId = nanoid();

  (<Database>DB).rooms.push({ roomId, roomName });
  //call writeDB after modifying Database
  writeDB();

  return NextResponse.json({
    ok: true,
    roomId,
    message: `Room ${roomName} has been created`,
  });
};
