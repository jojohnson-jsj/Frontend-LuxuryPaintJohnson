import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Typography, Row, Col, Card, Spin, Alert } from "antd";
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

const GalleryPage: React.FC = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadPhotos = async () => {
            try {
                const data = await fetchPhotos();
                setPhotos(data);
            } catch (err: any) {
                setError(err.message || "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        loadPhotos();
    }, []);

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
            <Row gutter={[16, 16]} justify="center">
                {photos.map((photo) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={photo.id}>
                        <Card
                            hoverable
                            cover={<img alt={photo.title} src={photo.url} />}
                        >
                            <Card.Meta title={photo.title} description={photo.description} />
                        </Card>
                    </Col>
                ))}
            </Row>
        </Section>
    )
};

export default GalleryPage;