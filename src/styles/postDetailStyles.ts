export const POST_DETAIL_STYLES = {
  // Layout
  container: "min-h-screen bg-white text-black",
  wrapper: "max-w-7xl mx-auto px-16 py-12",
  loadingState: "min-h-screen flex items-center justify-center font-serif text-center uppercase tracking-widest text-gray-300",

  // Back button
  backBtn: "flex items-center gap-2 text-sm text-gray-400 hover:text-black transition-colors mb-10 cursor-pointer",

  // Main content
  contentGrid: "flex gap-16",

  // Image section (right/main)
  imageSection: "flex-1 bg-black flex items-center justify-center p-16 rounded-xl min-h-[70vh]",
  imageBorder: "pt-4 pl-4 pr-4 pb-14 bg-[#D9D9D9]",
  mainImg: "max-w-full max-h-[60vh] object-contain shadow-2xl shadow-black/50",

  // Info section (left)
  infoSection: "w-[340px] shrink-0 flex flex-col justify-between",

  // User bar
  userBar: "flex items-center justify-between mb-12",
  userAvatar: "w-10 h-10 rounded-full object-cover bg-gray-200",
  userName: "font-bold text-sm",

  // Info fields
  infoGroup: "space-y-8 mb-12",
  label: "font-semibold text-xs uppercase tracking-wider text-gray-400 mb-2",
  value: "text-sm",
  descText: "text-sm leading-relaxed",

  // Like
  likeBtn: "p-2 rounded-full transition-colors hover:bg-gray-100 cursor-pointer",
  likeCount: "text-sm text-gray-500",

  // More Info & action buttons
  moreBtn: "flex items-center gap-2 text-[12px] font-medium border rounded-xl px-5 py-2.5 w-fit hover:bg-black hover:text-white hover:border-black transition-all cursor-pointer",
  moreBtnDanger: "flex items-center gap-2 text-[12px] font-medium border border-red-300 text-red-500 rounded-xl px-5 py-2.5 w-fit hover:bg-red-500 hover:text-white hover:border-red-500 transition-all cursor-pointer",

  // Date
  dateText: "text-xs text-gray-300 mt-4",
};
