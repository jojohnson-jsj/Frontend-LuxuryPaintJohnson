import React from "react";
import styled from "styled-components";
import { Card } from "antd";

const StyledCard = styled(Card)`
    .ant-card-body {
        display: none;
    }

    .ant-card-cover {
        height: 100%;
        overflow: hidden;
    }

    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
`;

const ProjectCard = ({ project, onClick }: { project: any; onClick: () => void }) => {
    return (
        <StyledCard
            hoverable
            style={{
                overflow: "hidden",
                borderRadius: "8px",
            }}
            cover={
                <img
                    alt={project.title} 
                    src={project.photos[0]?.url}
                    style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                    }} 
                />
            }
            onClick={onClick}
        />
    );
};

export default ProjectCard;