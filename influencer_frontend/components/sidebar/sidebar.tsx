"use client";

import * as React from "react";
import { useState } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  navMain: [
    // {
    //   title: "Tableau de board d'admin",
    //   items: [
    //     {
    //       title: "Statistiques admin",
    //       key: "statAdmin",
    //     },
    //     {
    //       title: "Gestion des données",
    //       key: "adminManage",
    //     },
    //   ],
    // },
    {
      title: "Tableau de board",
      items: [
        {
          title: "Recherche",
          key: "search",
        },
        {
          title: "Statistiques",
          key: "statistics",
        },
      ],
    },
    {
      title: "Mes influenceurs",
      items: [
        {
          title: "Mes listes",
          key: "list"
        },
        {
          title: "Mes profiles",
          key: "profiles",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [activeKey, setActiveKey] = useState("search");

  const handleMenuClick = (key: string) => {
    setActiveKey(key);
    window.dispatchEvent(new CustomEvent("menuSelection", { detail: key }));
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-bold">Aquizition</span>
                  {/* <span className="">v0.1.4-beta</span> */}
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item, index) => (
              <SidebarMenuItem key={`main-${index}`}>
                <SidebarMenuButton asChild>
                  <a  className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((subItem, subIdex) => (
                      <SidebarMenuSubItem key={`sub-${index}-${subIdex}`}>
                        <SidebarMenuSubButton asChild onClick={() => handleMenuClick(subItem.key)} isActive={activeKey === subItem.key}
                        >
                          <a style={{cursor: "pointer"}} className={
                              activeKey === subItem.key ? "text-blue-600" : ""
                            }>{subItem.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}


