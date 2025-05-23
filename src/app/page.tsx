'use client';

import { trpc } from "@/src/utils/trpc";

export default function Home() {

  const users = trpc.users.get.useQuery();
  console.log(users.data);
  return (
    <div>hello world
      {JSON.stringify(users.data)}
    </div>
  );
}
