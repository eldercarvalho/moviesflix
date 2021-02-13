import { useCallback, useEffect, useState } from 'react';
import { NavLink, useHistory, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { FiHeart, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { searchMovies, requestToken, Store, signOut } from '../../../store';

import Button from '../../shared/Button';
import Logo from '../Logo';
import SignInForm from '../SignInForm';
import Search from '../Search';

import { debounce } from '../../../utils/debounce';

import { Container, MenuWrapper, Menu, MenuButton, ModalContent } from './styles';
import { useModal } from '../../shared/Modal';

const MainHeader: React.FC = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isDarken, setIsDarken] = useState(false);
  const history = useHistory();
  const match = useRouteMatch('/search');
  const { RenderModal, show, hide } = useModal();
  const {
    RenderModal: SigInModal,
    show: showSigInModal,
    hide: hideSigInModal,
  } = useModal();
  const dispatch = useDispatch();
  const request_token = useSelector((store: Store) => store.auth.request_token);

  const handleSearch = (query: string) => {
    if (!match?.isExact) history.push('/search');

    if (query) window.history.replaceState({}, 'query', `?query=${query}`);
    if (!query) history.goBack();

    dispatch(searchMovies(query));
  };

  const handleSignInClick = useCallback(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('request_token');

    if (token) {
      showSigInModal();
      return;
    }

    show();
  }, [show, showSigInModal]);

  const handleSignOutClick = () => {
    dispatch(signOut());
  };

  const handleAuthenticationClick = useCallback(() => {
    dispatch(requestToken());
    hide();
  }, [dispatch, hide]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('request_token');

    if (token && urlParams.get('approved') && !request_token) {
      showSigInModal();
    }

    const handleWindowScroll = () => {
      if (window.scrollY > 50) {
        setIsDarken(true);
        return;
      }

      setIsDarken(false);
    };

    window.addEventListener('scroll', handleWindowScroll);

    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (request_token) {
      hideSigInModal();
    }
  }, [hideSigInModal, request_token]);

  return (
    <Container isDarken={isDarken}>
      <Logo />

      <Search onSearchChange={debounce(handleSearch, 500)} />

      <MenuWrapper isMenuOpened={isMenuOpened}>
        <Menu>
          <NavLink to="/" exact activeClassName="--active">
            Home
          </NavLink>
          <NavLink to="/top-rated" activeClassName="--active">
            Top Rated
          </NavLink>
          <NavLink to="/genres" activeClassName="--active">
            Genres
          </NavLink>
          {request_token && (
            <NavLink to="/trending" activeClassName="--active">
              <FiHeart size={22} />
            </NavLink>
          )}
        </Menu>

        {request_token ? (
          <Button textOnly iconOnly onClick={handleSignOutClick}>
            <FiLogOut size={22} />
          </Button>
        ) : (
          <Button onClick={handleSignInClick}>Sign in</Button>
        )}
      </MenuWrapper>

      <MenuButton
        iconOnly
        textOnly
        onClick={() => setIsMenuOpened((oldValue) => !oldValue)}
      >
        {isMenuOpened ? <FiX size={30} /> : <FiMenu size={30} />}
      </MenuButton>

      <RenderModal width={450} showClose={false}>
        <ModalContent>
          <h2>Permission Required</h2>
          <p>
            You will need to grant permission to access your TMDb information. Click on
            the continue button to be redirected to the TMDb website.
          </p>
          <p>
            If you don't have a TMDb account, create one to enjoy all the features of
            MovyFlix.
          </p>

          <Button full className="mt-3" onClick={handleAuthenticationClick}>
            Continue
          </Button>

          <Button textOnly full small light className="mt-1" onClick={() => hide()}>
            Cancel
          </Button>
        </ModalContent>
      </RenderModal>

      <SigInModal width={350} showClose={false}>
        <ModalContent>
          <h2>Sign In</h2>
          <SignInForm />

          <Button
            textOnly
            light
            small
            full
            className="mt-1"
            onClick={() => hideSigInModal()}
          >
            Cancel
          </Button>
        </ModalContent>
      </SigInModal>
    </Container>
  );
};

export default MainHeader;
