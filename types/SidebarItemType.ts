export interface SidebarItemType {
  label: string;
  image?: React.ReactNode;
  route?: string;
  message?: string;
  pro?: boolean;
  children?: SidebarItemType[];
}
