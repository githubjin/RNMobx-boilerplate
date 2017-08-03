/**
 * @flow
 */
export type MenuType = {
  name: string,
  icon: string,
  endpoint: string,
  url: string,
  permission_code: string,
  route: string
};
export const menus = {
  site_name: "门店后台主页",
  site_menu: [
    {
      name: "主页",
      route: "Home",
      icon: "speedometer",
      //   icon: "icon-speedometer",
      endpoint: "index",
      url: "/",
      permission_code: ""
    },
    {
      name: "客户",
      route: "Borrower",
      icon: "user",
      //   icon: "icon-user",
      endpoint: "borrowers",
      url: "/borrowers",
      permission_code: "BORROWER_READ"
    },
    {
      name: "资产",
      route: "Capital",
      icon: "grid",
      //   icon: "icon-grid",
      endpoint: "vehicles",
      url: "/vehicles",
      permission_code: "VEHICLE_READ"
    },
    {
      name: "业务",
      route: "Business",
      icon: "trophy",
      //   icon: "icon-trophy",
      endpoint: "borrowings",
      url: "/borrowings",
      permission_code: "BORROWER_READ"
    },
    {
      name: "预约",
      route: "Appointment",
      icon: "call-in",
      //   icon: "icon-call-in",
      endpoint: "appointments",
      url: "/appointments",
      permission_code: "APPOINTMENT_MANAGE"
    },
    {
      name: "员工",
      route: "Users",
      icon: "users",
      //   icon: "icon-users",
      endpoint: "system",
      url: "/system",
      permission_code: "STUFF_MANAGE"
    },
    {
      name: "账户",
      route: "Account",
      icon: "glyphicon glyphicon-credit-card",
      //   icon: "glyphicon glyphicon-credit-card",
      endpoint: "account",
      url: "/account",
      permission_code: "ACCOUNT_MANAGE"
    },
    {
      name: "权限管理",
      route: "PermissonManager",
      icon: "settings",
      //   icon: "icon-settings",
      endpoint: "role_permission",
      url: "/admin/auth/role-permission",
      permission_code: "SUPER_ADMIN"
    },
    {
      name: "门店管理",
      route: "ShopManager",
      icon: "home",
      //   icon: "icon-home",
      endpoint: "shop_manage",
      url: "/admin/shops",
      permission_code: "SUPER_ADMIN"
    }
  ]
};
// 超级管理员
export const ROLE_SUPER_ADMIN = "SUPER_ADMIN";

// 检查是否存在permisson 对用的菜单
export function checkValidMenu(permissionCode: string): boolean {
  return menus.site_menu.some(menu => menu.permission_code === permissionCode);
}
// 根据 permission_code 查找菜单项
export function findMenuBy(permission: string): MenuType {
  let filtedMenus = menus.site_menu.filter(
    menu => menu.permission_code === permission
  );
  if (filtedMenus && filtedMenus.length > 0) {
    return filtedMenus[0];
  }
  return null;
}
