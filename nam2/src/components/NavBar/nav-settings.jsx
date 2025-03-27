"use client"

import { ChevronRight ,LayoutDashboard ,UsersRound ,ChartNoAxesColumn,CircleCheckBig  } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton, 
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

const items = [
  {
    title: "Settings",
    icon: LayoutDashboard, // Replace with your actual icon component
    isActive: true,
  },
  {
    title: "Support",
    icon: UsersRound, // Replace with your actual icon component
    isActive: false,
  
  },

];

export function NavSettings() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Support</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </CollapsibleTrigger>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
