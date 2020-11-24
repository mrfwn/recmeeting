import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Content } from './styles';
import { FiArrowLeft } from 'react-icons/fi';

const Profile: React.FC = () => {
  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      <Content>
        <h1 className="line-1 anim-typewriter">Em Desenvolvimento...</h1>
      </Content>
    </Container>
  );
};

export default Profile;
