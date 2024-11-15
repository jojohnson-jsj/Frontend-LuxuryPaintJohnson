import React from "react";
import styled from "styled-components";
import { Typography } from "antd";

const Section = styled.section`
    padding: 20px;
    border-bottom: 1px solid #ccc;
`;

const BusinessOverview: React.FC = () => {
    return (
        <Section>
            <Typography.Title level={2}>Luxury Paint Johnson</Typography.Title>
            <Typography.Text>
                Your trusted partner for professional painting.
            </Typography.Text>
        </Section>
    );
};

export default BusinessOverview;

