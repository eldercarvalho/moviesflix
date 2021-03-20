import Logo from '../Logo';

import { Container } from './styles';

const Footer: React.FC = () => {
  return (
    <Container className="main-footer">
      <Logo />

      <p>Copyright © Elder Carvalho</p>

      <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">
        powered by
        <img src="/img/tmdb-logo.svg" alt="The Movies DB" />
      </a>
    </Container>
  );
};

export default Footer;
