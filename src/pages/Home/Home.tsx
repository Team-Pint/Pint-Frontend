import { useState } from "react";
import PostUploadModal from "../../components/PostUploadModal/PostUploadModal";

const Home = () => {

    const [isPostUploadModalOpen, setIsPostUploadModalOpen] = useState(false);

    return (
        <div>
            <button onClick={() => setIsPostUploadModalOpen(true)}>
                새 포스트 작성
            </button>

            {isPostUploadModalOpen && (
                <PostUploadModal
                    isOpen={isPostUploadModalOpen}
                    onClose={() => setIsPostUploadModalOpen(false)}
                />
            )}
        </div>
    );
}

export default Home;