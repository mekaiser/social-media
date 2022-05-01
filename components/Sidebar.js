import {
  ChevronDownIcon,
  ShoppingBagIcon,
  UserGroupIcon
} from "@heroicons/react/outline";
import {
  CalendarIcon,
  ClockIcon,
  DesktopComputerIcon,
  UsersIcon
} from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import React from "react";
import SidebarRow from "./SidebarRow";

export default function Sidebar() {
  const { data: session, loading } = useSession();
  return (
    <div className="p-2 mt-5 max-w-[600px] xl:min-w-[300px]">
      <SidebarRow
        src={
          session
            ? session.user.image
            : "https://images.unsplash.com/photo-1600352712371-15fd49ca42b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80"
        }
        title={session ? session.user.name : "John"}
      />
      <SidebarRow Icon={UsersIcon} title="Friends" />
      <SidebarRow Icon={UserGroupIcon} title="Groups" />
      <SidebarRow Icon={ShoppingBagIcon} title="Marketplace" />
      <SidebarRow Icon={DesktopComputerIcon} title="Watch" />
      <SidebarRow Icon={CalendarIcon} title="Events" />
      <SidebarRow Icon={ClockIcon} title="Memories" />
      <SidebarRow Icon={ChevronDownIcon} title="See More" />
    </div>
  );
}
