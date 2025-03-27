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
    title: "Dashboard",
    icon: LayoutDashboard, // Replace with your actual icon component
    isActive: true,
    items: [
      { title: "Overview", url: "/dashboard/overview" },
      { title: "Analytics", url: "/dashboard/analytics" },
    ],
  },
  {
    title: "Users",
    icon: UsersRound, // Replace with your actual icon component
    isActive: false,
    items: [
      { title: "Profile", url: "/settings/profile" },
      { title: "Billing", url: "/settings/billing" },
    ],
  },
  {
    title: "Agile",
    icon: ChartNoAxesColumn , // Replace with your actual icon component
    isActive: false,
    items: [
      { title: "Add Epic", url: "/settings/profile" },
      { title: "Add Task", url: "/settings/billing" },
      { title: "Add Story", url: "/settings/billing" },
    ],
  },
  {
    title: "Simple Tasks",
    icon: CircleCheckBig, // Replace with your actual icon component
    isActive: false,
    items: [
      { title: "Add Epic", url: "/settings/profile" },
      { title: "Add Task", url: "/settings/billing" },
      { title: "Add Story", url: "/settings/billing" },
    ],
  },
];

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
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
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <a href={subItem.url}>
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
