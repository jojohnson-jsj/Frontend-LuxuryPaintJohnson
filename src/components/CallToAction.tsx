import React from "react";
import styled from "styled-components";
import { Button } from "antd";
import { Link } from "react-router-dom";

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
            <Link to="/gallery">
                <Button type="primary" size="large">
                    View Our Work
                </Button>
            </Link>
        </Section>
    );
};

export default CallToAction;
