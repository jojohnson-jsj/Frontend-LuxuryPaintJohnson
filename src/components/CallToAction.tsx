import React from "react";
import styled from "styled-components";
import { Button } from "antd";

const Section = styled.section`
    padding: 20px;
    text-align: center;
`;

const CallToAction: React.FC = () => {
    return (
        <Section>
          <Button
            type="primary"
            size="large"
            onClick={() => alert("Request a Quote Appointment feature coming soon!")}>
                Request a Quote Appointment
            </Button>
        </Section>
    );
};

export default CallToAction;
