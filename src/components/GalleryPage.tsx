import React from "react";
import styled from "styled-components";
import { Typography, Row, Col, Card } from "antd";

const { Title } = Typography;

const Section = styled.section`
    padding: 40px;
`;

const GalleryPage: React.FC = () => {
    const placeholderPhotos = [
        { id: 1, title: "Job 1", imageUrl: "https://via.placeholder.com/300" },
        { id: 2, title: "Job 2", imageUrl: "https://via.placeholder.com/300" },
        { id: 3, title: "Job 3", imageUrl: "https://via.placeholder.com/300" },
        { id: 4, title: "Job 4", imageUrl: "https://via.placeholder.com/300" },
    ];

    return (
        <Section>
            <Title level={2} style={{ textAlign: "center", marginBottom: "40px" }}>
                Completed Projects
            </Title>
            <Row gutter={[16, 16]} justify="center">
                {placeholderPhotos.map((photo) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={photo.id}>
                        <Card
                            hoverable
                            cover={<img alt={photo.title} src={photo.imageUrl} />}
                        >
                            <Card.Meta title={photo.title} />
                        </Card>
                    </Col>
                ))}
            </Row>
        </Section>
    );
};

export default GalleryPage;