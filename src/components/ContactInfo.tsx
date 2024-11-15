import React from "react"
import styled from "styled-components";
import { Typography, Space } from "antd";

const Section = styled.section`
    padding: 20px;
    border-bottom: 1px solid #ccc;
`;

const ContactInfo: React.FC = () => {
    return (
        <Section>
            <Typography.Title level={3}>Contact Us</Typography.Title>
            <Space direction="vertical">
              <Typography.Text>Phone: (407) 470-9370</Typography.Text>
              <Typography.Text>Email: contact@luxurypaintjohnson.com</Typography.Text>
            </Space>
        </Section>
    );
};

export default ContactInfo;
