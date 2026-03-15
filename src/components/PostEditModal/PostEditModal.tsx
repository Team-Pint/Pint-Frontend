import React, { useState } from "react";
import { updatePostApi } from "../../api/postApi";
import InfoInputStep from "../PostUploadModal/InfoInputStep";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    postId: number;
    initialData: {
        description: string;
        location: string;
        camera: string;
        previewImage: string;
    };
    onUpdateSuccess: () => void;
}

const PostEditModal: React.FC<Props> = ({ isOpen, onClose, postId, initialData, onUpdateSuccess }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        ...initialData,
        filter: null as File | null,
        image: null
    });

    if (!isOpen) return null;

    // 게시글 수정 API
    const handleUpdate = async () => {
        setIsLoading(true);
        try {
            const result = await updatePostApi(postId, {
                description: data.description,
                location: data.location,
                camera: data.camera,
                filter: data.filter
            });

            if (result.code === 200 || result.code === 201) {
                alert("게시글이 수정되었습니다.");
                onUpdateSuccess();
                onClose();
            }
        } catch (error) {
            console.error("수정 실패", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-4xl overflow-hidden rounded-xl bg-white shadow-2xl">
                <button className="absolute right-8 top-8 z-10" onClick={onClose}>
                    <img src="/images/ic_close.svg" alt="닫기" className="w-6 h-6" />
                </button>
                <div className="flex min-h-[550px] w-full">
                    <InfoInputStep
                        data={data as any}
                        setData={setData as any}
                        isLoading={isLoading}
                        handleUpload={handleUpdate}
                        mode="edit"
                    />
                </div>
            </div>
        </div>
    );
};

export default PostEditModal;