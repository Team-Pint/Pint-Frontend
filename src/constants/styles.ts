export const DETAIL_MODAL_STYLES = {
    // 1. 전체 오버레이 배경: 피그마처럼 아주 어둡고 불투명하게 조정
    overlayBase: "fixed inset-0 z-[100] flex items-center justify-center p-4",
    backdrop: "absolute inset-0 bg-black/65 backdrop-blur-sm", 
    
    // 2. 모달 컨텐츠 컨테이너
    contentBase: "relative bg-white w-full max-w-6xl h-[85vh] flex rounded-sm shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300",
    
    // 3. 왼쪽 섹션 (정보 영역): 기존 흰색 배경 유지
    sideInfo: "w-[38%] p-14 flex flex-col justify-between bg-white border-r border-gray-100",
    userBar: "flex items-center gap-4 mb-14",
    userAvatar: "w-10 h-10 rounded-full object-cover",
    userName: "font-bold text-sm tracking-tight uppercase",
    infoGroup: "space-y-8",
    label: "text-[10px] font-bold uppercase text-gray-400 mb-2 tracking-[0.2em]",
    value: "text-sm text-gray-900 font-medium",
    descText: "text-sm text-gray-600 leading-relaxed font-light",
    moreBtn: "flex items-center gap-2 text-[10px] text-gray-400 border border-gray-200 rounded-full px-5 py-2.5 w-fit hover:bg-black hover:text-white hover:border-black transition-all uppercase tracking-widest",
    
    // 4. 오른쪽 섹션 (이미지 영역): 피그마처럼 Deep Black 배경으로 변경
    imageStage: "flex-1 bg-[#EFEFEE] flex items-center justify-center p-12 relative", 
    closeBtn: "absolute top-8 right-8 text-black/50 hover:text-white transition-colors z-10",
    mainImg: "max-w-full max-h-full object-contain shadow-2xl shadow-black/50",
    
    // 5. 관리 버튼 바 스타일: 어두운 배경에서 잘 보이도록 조정
    adminBar: "absolute bottom-4 flex gap-8 justify-center w-full",
    editBtn: "flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-600 hover:text-black transition",
    deleteBtn: "flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-red-500/50 hover:text-red-500 transition",

}

export const PROFILE_STYLES = {
     // Layout
    container: "min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white",
    wrapper: "max-w-[1800px] mx-auto px-10 py-2",
    loadingState: "p-20 font-serif text-center uppercase tracking-widest text-gray-200",

    // Header
    headerRoot: "flex justify-between items-center mb-10",
    logo: "text-[24px] font-black font-serif italic tracking-tighter",
    searchWrapper: "border-b border-black/10 pb-1 flex items-center gap-3 w-[300px] focus-within:border-black transition-all",
    searchInput: "outline-none text-xs placeholder:text-gray-300 w-full font-light bg-transparent",
    btnGroup: "flex items-center gap-6",
    uploadBtn: "bg-black text-white px-6 py-2 rounded-full text-[11px] font-bold hover:bg-gray-800 transition-all flex items-center gap-2",
    avatar: "w-9 h-9 rounded-full object-cover",

    // Profile Section
    profileSection: "flex justify-between items-end mb-8 px-2 relative",
    nameWrapper: "flex flex-col items-start text-[7vw] font-serif leading-[0.8] uppercase tracking-[-0.05em] font-medium",
    nameItem: "ml-[-0.3vw] block",
    infoWrapper: "max-w-lg text-right flex flex-col items-end pb-1",
    editBtn: "flex items-center gap-2 border border-black/20 px-3 py-1 rounded-full text-[9px] font-bold uppercase mb-6 hover:bg-black hover:text-white transition",
    descriptionText: "text-[11px] text-gray-400 mb-8 leading-relaxed text-right font-light max-w-[260px] uppercase tracking-tight",
    locationText: "font-serif text-[32px] mb-0 uppercase tracking-tighter leading-none",
    emailText: "text-[11px] text-gray-400 font-light mt-1",

    // Grid System
    gridContainer: "grid grid-cols-4 gap-4",
    gridItem: "aspect-[3/3.8] bg-gray-50 cursor-pointer overflow-hidden group relative",
    gridImage: "w-full h-full object-cover group-hover:scale-105 transition duration-[1.2s] ease-out grayscale-[0.2] group-hover:grayscale-0",
    gridOverlay: "absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
}