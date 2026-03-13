export const DETAIL_MODAL_STYLES = {
    // 1. 전체 오버레이 배경: 피그마처럼 아주 어둡고 불투명하게 조정
    overlayBase: "fixed inset-0 z-[100] flex items-center justify-center p-4",
    backdrop: "absolute inset-0 bg-black/65 backdrop-blur-sm", 
    
    // 2. 모달 컨텐츠 컨테이너
    contentBase: "relative bg-white w-full max-w-6xl h-[85vh] flex rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300",
    
    // 3. 왼쪽 섹션 (정보 영역): 기존 흰색 배경 유지
    sideInfo: "w-[50%] p-24 flex flex-col justify-between bg-white",
    userBar: "flex items-center gap-4 mb-20",
    userAvatar: "w-10 h-10 rounded-full object-cover",
    userName: "font-bold text-sm",
    infoGroup: "space-y-10",
    label: "font-semibold mb-3",
    value: "text-xs",
    descText: "text-xs",
    moreBtn: "flex items-center gap-2 self-end text-[12px] font-medium border rounded-xl px-5 py-2.5 w-fit hover:bg-black hover:text-white hover:border-black transition-all",
    
    // 4. 오른쪽 섹션 (이미지 영역): 피그마처럼 Deep Black 배경으로 변경
    imageStage: "flex-1 bg-black flex items-center justify-center p-24 relative", 
    closeBtn: "absolute top-8 right-8 text-white z-10",
    imageBorder: "pt-4 pl-4 pr-4 pb-14 bg-[#D9D9D9]",
    mainImg: "max-w-full max-h-full object-contain shadow-2xl shadow-black/50",
    
    // 5. 관리 버튼 바 스타일: 어두운 배경에서 잘 보이도록 조정
    adminBar: "absolute bottom-14 flex gap-20 justify-center w-full",
    editBtn: "flex items-center gap-2 text-white font-light",
    deleteBtn: "flex items-center gap-2 text-red-500 font-light",

}

export const PROFILE_STYLES = {
     // Layout
    container: "min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white",
    wrapper: "max-w-[1800px] mx-auto p-28",
    loadingState: "p-20 font-serif text-center uppercase tracking-widest text-gray-200",

    // Profile Section
    profileSection: "flex justify-between items-end mb-16 px-2 relative",
    nameWrapper: "flex flex-col items-start text-[7vw] font-serif leading-[1.1] font-medium",
    nameItem: "ml-6 block",
    infoWrapper: "max-w-lg text-right flex flex-col items-end pb-1 mr-6",
    editBtn: "flex items-center gap-2 px-4 py-1 bg-black rounded-full text-[12px] text-white mb-6 hover:bg-black/70 hover:text-white transition",
    descriptionText: "text-[12px] mb-16 text-right font-light max-w-[400px]",
    locationText: "font-serif text-[24px] mb-0 uppercase leading-none",
    emailText: "text-[12px] font-light mt-2",

    // Grid System
    gridContainer: "grid grid-cols-4 gap-4",
    gridItem: "aspect-[3/3.8] bg-gray-50 cursor-pointer overflow-hidden group relative",
    gridImage: "w-full h-full object-cover group-hover:scale-105 transition duration-[1.2s] ease-out grayscale-[0.2] group-hover:grayscale-0",
    gridOverlay: "absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
}

export const MODAL_STYLES = {
  overlay: "fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4",

  // ✅ 수정 후: 직사각형 비율 + 각진 모서리 반영
  content: "bg-white rounded-xl w-full max-w-[420px] p-10 flex flex-col items-center relative shadow-2xl transition-all duration-300", 
  // 기존: max-w-[480px] (더 넓었음), rounded-[40px] (매우 둥글었음)
  // 변경: max-w-[420px] (더 좁고 길게), rounded-3xl (각진 느낌)

  closeBtn: "absolute top-8 right-8 text-gray-400 hover:text-black transition-colors",
  profileImgWrapper: "relative mb-10",
  profileImg: "w-32 h-32 rounded-full object-cover border-4 border-white", 
  cameraBtn: "absolute bottom-1 right-1 bg-black text-white p-2 rounded-full cursor-pointer hover:scale-110 transition-all shadow-lg border-2 border-white",
  input: "w-full border border-gray-200 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-black transition-all font-medium placeholder:text-gray-300",
  textarea: "w-full border border-gray-200 rounded-xl px-5 py-4 text-sm h-32 resize-none focus:outline-none focus:border-black transition-all font-medium placeholder:text-gray-300",
  saveBtn: "bg-black text-white px-12 py-3.5 rounded-full font-bold text-[13px] hover:bg-gray-800 transition-all uppercase tracking-widest mt-8",
};