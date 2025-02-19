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

const AppHeader = () => {
    const { isLoggedIn, logout } = useAuth();
    const [isSideNavExpanded, setIsSideNavExpanded] = useState(false);

    // Listen for window resize and toggle side nav accordingly
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1024) {
                setIsSideNavExpanded(true);  // open on desktop
            } else {
                setIsSideNavExpanded(false); // close on mobile
            }
        };

        handleResize(); // initial call
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
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
                        {isLoggedIn && (
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

                    {isLoggedIn && (
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

