import { useState, useCallback } from 'react';

// Interface định nghĩa trạng thái của VideoModal
interface VideoModalState {
  isOpen: boolean;
  videoUrl: string;
  title: string;
}

// Interface định nghĩa các action có thể thực hiện với VideoModal
interface VideoModalActions {
  openModal: (videoUrl: string, title?: string) => void;
  closeModal: () => void;
}

// Hook quản lý trạng thái VideoModal theo kiến trúc MVVM
export const useVideoModal = (defaultTitle = "Video"): VideoModalState & VideoModalActions => {
  // State quản lý trạng thái modal
  const [modalState, setModalState] = useState<VideoModalState>({
    isOpen: false,
    videoUrl: "",
    title: defaultTitle
  });

  // Action mở modal với video URL và title
  const openModal = useCallback((videoUrl: string, title?: string) => {
    setModalState({
      isOpen: true,
      videoUrl,
      title: title || defaultTitle
    });
  }, [defaultTitle]);

  // Action đóng modal và reset state
  const closeModal = useCallback(() => {
    setModalState({
      isOpen: false,
      videoUrl: "",
      title: defaultTitle
    });
  }, [defaultTitle]);

  return {
    ...modalState,
    openModal,
    closeModal
  };
};
