import { useState, useEffect } from 'react';
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
import { Menu } from '@carbon/icons-react';
import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';
import { usePathname } from 'next/navigation';

const AppHeader = () => {
    const { isLoggedIn, logout } = useAuth();
    const [isSideNavExpanded, setIsSideNavExpanded] = useState(false);
    const pathname = usePathname();
    const isChatPage = pathname === '/chat';

    useEffect(() => {
        const mq = window.matchMedia('(min-width: 1024px)');
        setIsSideNavExpanded(mq.matches);

        const handleMediaChange = (e) => {
          setIsSideNavExpanded(e.matches);
        };

        mq.addEventListener('change', handleMediaChange);
        return () => {
          mq.removeEventListener('change', handleMediaChange);
        };
    }, []);

    return (
        <HeaderContainer
            render={() => (
                <Header aria-label="Team 32 Header">
                    <SkipToContent />

                    <Link href="/" passHref legacyBehavior>
                        <HeaderName prefix="IBM">AI For New Students</HeaderName>
                    </Link>

                    <HeaderGlobalBar>
                        {isLoggedIn && isChatPage && (
                            <HeaderGlobalAction
                                aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'}
                                aria-expanded={isSideNavExpanded}
                                isActive={isSideNavExpanded}
                                onClick={() => setIsSideNavExpanded(!isSideNavExpanded)}
                                tooltipAlignment="end"
                                className="action-icons"
                            >
                                <Menu size={20} />
                            </HeaderGlobalAction>
                        )}
                    </HeaderGlobalBar>

                    {isLoggedIn && isChatPage && (
                        <HeaderPanel expanded={isSideNavExpanded}>
                            <SideNavMenu title="Menu">
                                <SideNavItems>
                                    <SideNavLink href="/chat">Chat</SideNavLink>
                                    <SideNavLink href="/settings">Settings</SideNavLink>
                                    <SideNavLink href="/about">About</SideNavLink>
                                    <SideNavLink href="/" onClick={logout}>Logout</SideNavLink>
                                </SideNavItems>
                            </SideNavMenu>
                        </HeaderPanel>
                    )}
                </Header>
            )}
        />
    );
};

export default AppHeader;

