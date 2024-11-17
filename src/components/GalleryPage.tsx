import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Typography, Row, Col, Card, Spin, Alert, Pagination } from "antd";
import { fetchProjects, fetchPhotosForProject } from "../services/projectServices";
import SpotlightCarousel from "./SpotlightCarousel";
import ProjectCard from "./ProjectCard";

const { Title } = Typography;

const Section = styled.section`
    padding: 40px;
`;

interface Photo {
    id: number;
    title: string;
    url: string;
    description: string;
    createdAt: string;
    projectId: number;
}

interface Project {
    id: number;
    title: string;
    createdAt: string;
    photos: Photo[];
}


const GalleryPage: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalProjects, setTotalProjects] = useState(0);
    const [selectedProjectPhotos, setSelectedProjectPhotos] = useState([]);
    const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);

    const loadProjects = async (page: number, pageSize: number) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetchProjects(page, pageSize);
            console.log("API Response:", response.data);
            setProjects(response.data);
            setTotalProjects(response.totalCount);
        } catch (err: any) {
            setError(err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProjects(currentPage, pageSize);
    }, [currentPage, pageSize]);

    const openSpotlight = async (projectId: number) => {
        try {
            const photos = await fetchPhotosForProject(projectId);
            setSelectedProjectPhotos(photos);
            setIsSpotlightOpen(true);
        } catch (err: any) {
            console.error("Failed to fetch photos for project:", err.message);
        }
    };

    const closeSpotlight = () => {
        setIsSpotlightOpen(false);
        setSelectedProjectPhotos([]);
    }

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
                Previous Work
            </Title>
            <Row gutter={[16, 16]} align="top" justify="start">
                {projects && projects.length > 0 ? (
                    projects.map((project) => (
                        <Col xs={24} sm={12} md={8} lg={6} key={project.id}>
                            <ProjectCard
                                project={project}
                                onClick={() => openSpotlight(project.id)}
                            />
                        </Col>
                    ))
                ) : (
                    <p>No projects found.</p>
                )}
            </Row>
            <Pagination
                style={{ marginTop: "20px", textAlign: "center" }}
                current={currentPage}
                pageSize={pageSize}
                total={totalProjects}
                showSizeChanger
                onChange={(page, pageSize) => {
                    setCurrentPage(page);
                    setPageSize(pageSize);
                  }}
            />
            {isSpotlightOpen && (
                <SpotlightCarousel
                    photos={selectedProjectPhotos}
                    onClose={closeSpotlight}
                />
            )}
        </Section>
    );
};

export default GalleryPage;