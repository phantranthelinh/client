import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/api/useAuth";
import { Link } from "@tanstack/react-router";
import { Box, DollarSign, Home, ShoppingCart, Table2 } from "lucide-react";

const items = [
  {
    title: "Trang chủ",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Đơn hàng",
    url: "/dashboard/orders",
    icon: ShoppingCart,
  },

  {
    title: "Doanh thu",
    url: "/dashboard/revenue",
    icon: DollarSign,
  },
  {
    title: "Sản Phẩm",
    url: "/dashboard/products",
    icon: Box,
  },
  {
    title: "Danh mục sản phẩm",
    url: "/dashboard/product-categories",
    icon: Table2,
  },
  {
    title: "Khách hàng",
    url: "/dashboard/customers",
    icon: ShoppingCart,
  },
];
export function AppSidebar() {
  const { logout } = useAuth();
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <Button onClick={() => logout()}>Đăng xuất</Button>
      </SidebarFooter>
    </Sidebar>
  );
}
