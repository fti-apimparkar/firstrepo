import React, { useState, useCallback, useEffect } from 'react';
import styled, { css } from 'styled-components';

import NavigationItem from './atoms/NavigationItem';
import ContextItem from './atoms/ContextItem';

import {ReactComponent as SvgLogoMark} from '../svg/LogoMark.svg';
import {ReactComponent as SvgLogoText} from '../svg/LogoText.svg';

const Logo = styled.a`
  height: 50px;
  margin: 0 20px 40px 15px;
  display: flex;
`
const LogoMark = styled.div`
  height: 50px;
  flex: 0 0 50px;
  margin-right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;

`
const LogoType = styled.div`
  opacity: 0;
  flex: 1;

  height: 50px;
  display: flex;
  justify-content: left;
  align-items: center;


`

const NavigationContainer = styled.div``

const MenuFooter = styled.div`
  ${({theme}) => theme && css`
    ${theme.colors.global.mainMenu.footerBackground}
  `};
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  width: inherit;

`

const FooterItemContainer = styled.div`
  min-height: 70px;
`

const Container = styled.div<{ open : boolean }>`

  ${({theme, open}) => theme && css`
    ${theme.colors.global.mainMenu.background}
    border-right: 1px solid ${theme.colors.global.mainMenu.lines.backgroundColor};
    transition: width ${theme.animation.speed.normal} ${theme.animation.easing.primary.easeOut};
    width: ${open ? theme.dimensions.global.mainMenu.width.open : theme.dimensions.global.mainMenu.width.closed };

    ${LogoType}{
      transition: opacity ${theme.animation.speed.normal} ${theme.animation.easing.primary.easeInOut};
      opacity: ${open ? 1 : 0};
    }
  `}

  box-sizing: border-box;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  padding: 20px 0;
  overflow: hidden;
`

const ContainerInner = styled.div`
  width: ${({theme}) => theme.dimensions.global.mainMenu.width.open };
`

const MainMenu : React.FC<IMenu> = ({ content, home="/", openWidth }) => {

  const [isMenuOpen, setMenuOpen] = useState<boolean>(true);
  const [isMenuPinned, setMenuPinned] = useState<boolean>(true);
  const [activeContext, setActiveContext] = useState<number>(-1);
  const [focusedContext, setFocusedContext] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  let checkedInItems : number = 0;

  // Set the active context on load.
  console.log("TODO: Get the current URI, match it to a menu item and set it's index to setActiveContext", activeContext);
  useEffect(() => {
    // Unsure of URL structures at this point so can't set this initialisation up yet.
    setActiveContext(0);
  }, [setActiveContext]);

  /* Handling of menu open, closing and pinning. */
  const autoMenuOpen = useCallback((e: any) => {
    if(e.pointerType === 'touch'){ return; }
    setMenuOpen(true);
  }, [setMenuOpen]);

  const autoMenuClose = useCallback(() => {
    // TODO: Move the focused back to the active view so it re-opens on current context.
    if(!isMenuPinned){
      setMenuOpen(false);
    }
  }, [setMenuOpen, isMenuPinned]);

  const toggleMenuPin = useCallback((e: any) => {
    if(e.pointerType === 'touch'){ return; }
    setMenuOpen(!isMenuOpen);
    setMenuPinned(!isMenuPinned);
  }, [isMenuPinned, setMenuPinned, isMenuOpen, setMenuOpen])


  /** Manage which context is open. */
  const setFocusedContextCb = useCallback(contextKey => {
    setFocusedContext(focusedContext !== contextKey ? contextKey : -1);
  }, [setFocusedContext, focusedContext])


  /** Manage the loading cycle. */
  const readyCallback = useCallback(contextKey => {
    // Basic count of menu items (that need to measure height) that have checked in.
    checkedInItems++;
    if(checkedInItems === content.items.length){
      setLoading(false);
    }
  }, [checkedInItems, content])


  return <Container open={isMenuOpen} onPointerEnter={ autoMenuOpen } onTouchStart={ () => console.log('toch')} onMouseLeave={ autoMenuClose }>
    <ContainerInner>
      <Logo href={ home }>
        <LogoMark><SvgLogoMark /></LogoMark>
        <LogoType><SvgLogoText /></LogoType>
      </Logo>

      <NavigationContainer>
        { content.items.map((item, key) => {
          return <NavigationItem key={key} contextKey={key} menuOpen={isMenuOpen} submenuOpen={ key === focusedContext && isMenuOpen} onClickCallback={ setFocusedContextCb } {...{item, loading, focusedContext, readyCallback}} />
        })}
      </NavigationContainer>

      <MenuFooter>

        <FooterItemContainer>
          <ContextItem icon={'Question'} title={'Help & Support'} href={'#'} menuOpen={isMenuOpen} />
        </FooterItemContainer>

        <FooterItemContainer>
          <ContextItem icon={ isMenuOpen && isMenuPinned ? 'CloseCompact' : 'Menu' } title={isMenuPinned ? 'Keep Open' : 'Auto-Hide'} compact={ true } onClickCallback={toggleMenuPin} menuOpen={isMenuOpen} />
        </FooterItemContainer>

      </MenuFooter>
    </ContainerInner>
  </Container>
}

export default MainMenu;