import React from "react";
import { Modal, Carousel } from "antd";

interface SpotlightCarouselProps {
    photos: { id: number; url: string; title: string; description: string }[];
    onClose: () => void;
}

const SpotlightCarousel: React.FC<SpotlightCarouselProps> = ({ photos, onClose }) => {
    return (
        <Modal
            visible
            onCancel={onClose}
            footer={null}
            centered
            width="100%"
            bodyStyle={{ padding: 0 }}
        >
            <Carousel
                arrows
                infinite={false}
            >
                {photos.map((photos) => (
                    <div key={photos.id} style={{ textAlign: "center" }}>
                        <img
                            src={photos.url}
                            alt={photos.title}
                            style={{
                                maxHeight: "90vh",
                                maxWidth: "100%",
                                margin: "auto",
                                objectFit: "contain",
                            }}
                        />
                    </div>
                ))}
            </Carousel>
        </Modal>
    );
};

export default SpotlightCarousel;