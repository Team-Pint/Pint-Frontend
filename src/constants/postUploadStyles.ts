export const PHOTO_SELECT_STEP = {
    // 사진 선택 전
    container: "flex flex-1 items-center justify-center p-12",
    beforeSection: "flex w-full max-w-md flex-col items-center justify-center rounded-xl border-1 border-black py-20 group cursor-pointer",
    fileInput: "hidden",
    label: "cursor-pointer flex flex-col items-center w-full",
    iconSection: "mb-5 flex flex-col items-center",
    icon: "w-8 h-8 mb-3",
    iconText: "text-xs tracking-tighter",
    chooseBtn: "rounded-full bg-black px-8 py-2.5 text-sm text-white",

    // 사진 선택 후
    afterSection: "flex flex-col items-center w-full max-w-lg",
    previewSection: "mb-3 overflow-hidden",
    preview: "w-full object-contain max-h-[400px]",
    changeBtn: "flex items-center text-xs text-gray-400 mb-8 cursor-pointer",
    nextBtn: "rounded-full bg-black px-14 py-2 text-sm text-white cursor-pointer"
};

export const INFO_INPUT_STEP = {
    container: "flex flex-1 px-10 items-center justify-center",
    leftSection: "flex w-1/2 items-center justify-center p-12",
    imageSection: "w-full max-h-[450px] flex items-center justify-center overflow-hidden",
    image: "w-full h-full object-contain",
    rightSection: "flex w-1/2 flex-col justify-center px-8 py-10 space-y-6",
    inputSection: "space-y-2",
    label: "text-sm",
    textInput: "mt-2 rounded-lg w-full border border-black p-4 text-xs outline-none",
    fileUploadSection: "mt-2 flex items-center w-full px-4 py-3 rounded-lg border border-black",
    uploadIcon: "w-5 h-5 mr-3 flex-shrink-0",
    fileName: "text-xs flex-grow truncate",
    removeBtn: "p-1 cursor-pointer",
    removeIcon: "w-4 h-4",
    textArea: "mt-1 w-full flex-grow rounded-lg border border-black p-4 text-xs outline-none resize-none h-32",
    submitBtn: "self-end rounded-full bg-black py-2 px-11 text-sm text-white disabled:bg-gray-200 disabled:text-white"
}