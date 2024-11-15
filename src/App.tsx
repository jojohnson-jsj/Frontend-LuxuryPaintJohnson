import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BusinessOverview from './components/BusinessOverview';
import ContactInfo from './components/ContactInfo';
import CallToAction from './components/CallToAction';
import { Layout } from "antd";

const { Header, Footer, Content } = Layout;

const App: React.FC = () => {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Header style={{ color: "white", textAlign: "center" }}>Luxury Paint Johnson</Header>
        <Content style={{ padding: "20px" }}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <BusinessOverview />
                  <ContactInfo />
                  <CallToAction />
                </>
              }
            />
            <Route path="/admin" element={<h1>Admin Login</h1>} />
          </Routes>
        </Content>
        <Footer style={{ textAlign: "center" }}>© 2024 Luxury Paint Johnson</Footer>
      </Layout>
    </Router>
  );
};

export default App;
