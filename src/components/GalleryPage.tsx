import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Typography, Row, Col, Card, Spin, Alert, Pagination, Modal, Carousel } from "antd";
import { fetchPhotos } from "../services/photoServices";

const { Title } = Typography;

const Section = styled.section`
    padding: 40px;
`;

interface Photo {
    id: number;
    title: string;
    url: string;
    description: string;
}

const GalleryModal: React.FC<{
    visible: boolean;
    onClose: () => void;
    images: Photo[];
}> = ({ visible, onClose, images }) => {
    return (
        <Modal
            visible={visible}
            onCancel={onClose}
            footer={null}
            centered
            width="100%"
            bodyStyle={{ padding: 0 }}
        >
            <Carousel
                arrows
                dotPosition="bottom"
                style={{ height: "90vh", backgroundColor: "black" }}
            >
                {images.map((image) => (
                    <div key={image.id} style={{ textAlign: "center" }}>
                        <img
                            src={image.url}
                            alt={image.title}
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

const GalleryPage: React.FC = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPhotos, setTotalPhotos] = useState(0);
    
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [currentProjectId, setCurrentProjectId] = useState<number | null>(null);

    const openGallery = (projectId: number) => {
        setIsGalleryOpen(true);
        setCurrentProjectId(projectId);
    };

    const closerGallery = () => {
        setIsGalleryOpen(false);
        setCurrentProjectId(null);
    };

    const loadPhotos = async (page: number, pageSize: number) => {
        setLoading(true);
        setError(null);

        try {
            const { photos, totalCount } = await fetchPhotos(page, pageSize);
            setPhotos(photos);
            setTotalPhotos(totalCount);
        } catch (err: any) {
            setError(err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPhotos(currentPage, pageSize);
    }, [currentPage, pageSize]);

    const handlePageChange = (page: number, pageSize?: number) => {
        setCurrentPage(page);
        
        if (pageSize) setPageSize(pageSize);
    };

    const selectedProjectImages = photos.filter((photo) => photo.id === currentProjectId);

    if (loading) {
        return (
            <Section>
                <Spin size="large" tip="Loading photos...">
                    <div style={{ height: "100px" }} />
                </Spin>
            </Section>
        );
    }

    if (error) {
        return (
            <Section>
                <Alert message="Error" description={error} type="error" showIcon />
            </Section>
        );
    }

    return (
        <Section>
            <Title level={2} style={{ textAlign: "center", marginBottom: "40px" }}>
                Completed Projects
            </Title>
            <Row gutter={[16, 16]} align="top" justify="start">
                {(photos || []).map((photo) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={photo.id}>
                        <Card
                            hoverable
                            style={{
                                overflow: "hidden",
                                borderRadius: "8px",
                            }}
                            cover={
                                <img
                                    alt={photo.title}
                                    src={photo.url}
                                    style={{
                                        width: "100%",
                                        height: "200px",
                                        objectFit: "cover",
                                    }}
                                />
                            }
                            onClick={() => openGallery(photo.id)}
                        />
                    </Col>
                ))}
            </Row>
            <Pagination
                style={{ marginTop: "20px", textAlign: "center" }}
                current={currentPage}
                pageSize={pageSize}
                total={totalPhotos}
                showSizeChanger
                onChange={handlePageChange}
            />
            <GalleryModal visible={isGalleryOpen} onClose={closerGallery} images={selectedProjectImages} />
        </Section>
    )
};

export default GalleryPage;