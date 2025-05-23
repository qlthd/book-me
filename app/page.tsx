'use client';

import { trpc } from "../utils/trpc";

import "react-day-picker/style.css";
import { CustomDayPicker } from "./components/CustomDayPicker/CustomDayPicker";

export default function Home() {

  const users = trpc.users.get.useQuery();
  console.log(users.data);
  return (
    <div>
      {/*{JSON.stringify(users.data)}*/}
      <CustomDayPicker />
    </div>
  );
}
