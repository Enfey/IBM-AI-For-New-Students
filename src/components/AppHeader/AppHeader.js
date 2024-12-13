import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  SideNavMenu,
  SideNavItems,
  SideNavLink,
  HeaderPanel,
} from '@carbon/react';
import { Menu, RightPanelOpen } from '@carbon/icons-react';
import Link from 'next/link';

// AppHeader component
/**
 * AppHeader component
 * 
 * This component renders the application header via Carbon Components for React.
 * Contains a Hambuger menu icon that expands the side navigation menu which links to various pages.
 * 
 * @returns {JSX.Element} The application header component
 */
const AppHeader = () => (
  <HeaderContainer
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <Header aria-label="Team 32 Header">
        <SkipToContent />

        <Link href="/" passHref legacyBehavior>
          <HeaderName prefix="IBM">AI For New Students</HeaderName>
        </Link>

        <HeaderGlobalBar>
          <HeaderGlobalAction
            aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'} aria-expanded={isSideNavExpanded} isActive= {isSideNavExpanded} onClick={onClickSideNavExpand}
            tooltipAlignment="end"
            className="action-icons"
          >
            <Menu size={20} />
          </HeaderGlobalAction>
        </HeaderGlobalBar>
        <HeaderPanel expanded={isSideNavExpanded} onHeaderPanelFocus={onClickSideNavExpand}>
          <SideNavMenu title="Menu">
            <SideNavItems>
              <SideNavLink href="/chat">Chat</SideNavLink>
              <SideNavLink href="/settings">Settings</SideNavLink>
              <SideNavLink href="/about">About</SideNavLink>
            </SideNavItems>
          </SideNavMenu>
        </HeaderPanel>
      </Header>
    )}
  /> 
);

export default AppHeader;
