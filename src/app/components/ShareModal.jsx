import { ContextData } from "@/context/Context";
import { Modal } from "@mui/material";
import React, { useContext, useState } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import { motion } from "framer-motion";

function ShareModal({ url, quote, onClick }) {
  const { openShareModal, handleShareClose } = useContext(ContextData);

  const [isExiting, setIsExiting] = useState(false);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      handleShareClose();
      setIsExiting(false);
    }, 500);
  };

  const modalVariants = {
    hidden: { opacity: 0, x: -300 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -300 },
  };

  return (
    <Modal
      open={openShareModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableEnforceFocus
    >
      <div className="flex justify-center items-center">
        <div className="w-1/2 max-md:w-full">
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate={isExiting ? "exit" : "visible"}
            transition={{ duration: 0.5 }}
            className={`flex flex-row justify-between absolute bottom-32 left-4`}
          >
            <div className="flex space-x-2">
              <FacebookShareButton url={url} quote={quote} onClick={onClick}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TwitterShareButton url={url} title={quote} onClick={onClick}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <WhatsappShareButton url={url} title={quote} onClick={onClick}>
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
            </div>
          </motion.div>
        </div>
      </div>
    </Modal>
  );
}

export default ShareModal;
