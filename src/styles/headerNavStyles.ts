// src/constants/HeaderNavStyles.ts

export const Header_NAV_STYLES = {
  container: "relative",
  avatarBtn: "cursor-pointer overflow-hidden bg-gray-100 flex items-center justify-center transition-opacity hover:opacity-80",
  avatarImg: "w-full h-full object-cover",
  dropdownCard: "absolute right-0 mt-3 w-48 bg-white rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 py-2 z-50 animate-in fade-in zoom-in duration-200",
  menuList: "flex flex-col text-[15px] font-medium text-slate-600",
  menuItem: "flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50 cursor-pointer transition-colors",
  menuDivider: "h-[1px] bg-slate-100 my-1 mx-3",
  logoutText: "text-slate-900",
  iconDefault: "text-slate-400",
  avatarPlaceholder: "text-gray-400"
} as const; // 속성값들이 변경되지 않도록 Readonly로 설정