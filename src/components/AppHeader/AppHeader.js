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
import { useChatHistory } from '../../hooks/useChatHistory';

//this whole component is such a fat mess
const AppHeader = () => {
    const { isLoggedIn, logout } = useAuth();
    const [isSideNavExpanded, setIsSideNavExpanded] = useState(false);
    /* Sets the chat history's initial state to an empty array
       and a function that updates the state */
    // const [chatHistories, setChatHistories] = useState([]);
    const pathname = usePathname();
    const hasSideNav = pathname === '/chat' || pathname === '/settings' || pathname === '/about' || pathname === '/announcement' || pathname === '/contact' || pathname === '/resource';
    const { chatHistories, getHistories } = useChatHistory();

    useEffect(() => {
        const mq = window.matchMedia('(min-width: 1024px)');
        setIsSideNavExpanded(mq.matches);

        const handleMediaChange = (e) => {
          setIsSideNavExpanded(e.matches);
        };

        const pagesToCloseNavOn = ['/settings', '/about', '/announcement', '/contact', '/resource']; //10x developer
        
        if (pagesToCloseNavOn.includes(pathname)) {
            setIsSideNavExpanded(false);
        }

        mq.addEventListener('change', handleMediaChange);
        return () => {
          mq.removeEventListener('change', handleMediaChange);
        };
    }, [pathname]);

    // Fetching the localStorage chat histories
    useEffect(()  => {
        getHistories();
    }, chatHistories);

    return (
        <HeaderContainer
            render={() => (
                <Header aria-label="Team 32 Header">
                    <SkipToContent />

                    <Link href="/" passHref legacyBehavior>
                        <HeaderName prefix="IBM">AI For New Students</HeaderName>
                    </Link>

                    <HeaderGlobalBar>
                        {isLoggedIn && hasSideNav && (
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

                    {hasSideNav && (
                        <HeaderPanel expanded={isSideNavExpanded}>

                            <SideNavItems className="side-nav-items">
                                <div className="side-nav-pages" >
                                    <SideNavLink href="/chat">Chat</SideNavLink>
                                    <SideNavLink href="/settings">Settings</SideNavLink>
                                    <SideNavLink href="/about">About</SideNavLink>
                                    <SideNavLink href="/announcement">Announcements</SideNavLink>
                                    <SideNavLink href="/contact">Contact Us</SideNavLink>
                                    <SideNavLink href="/resource">Resources</SideNavLink>
                                    <SideNavMenu title="History" defaultExpanded={true}>
                                        {/* If there are chat histories present, display their ids
                                            Otherwise, say there are none */}
                                        <div className="history-scroll">
                                            { chatHistories.length > 0 ? (
                                                chatHistories.map((history) => (
                                                    <SideNavLink
                                                        /* This is just place holder, I don't know how to
                                                        dynamically generate links for this, also might
                                                        be a security risk using sessionID */
                                                        href={`/chat/${encodeURIComponent(history.key)}`}>
                                                            {history.id}
                                                    </SideNavLink>
                                                ))
                                            ) : (
                                                <SideNavLink disabled>No chat history</SideNavLink>
                                            )}
                                        </div>
                                    </SideNavMenu>
                                </div>
                                <SideNavLink href="/" onClick={logout} className="logout">Logout</SideNavLink>
                            </SideNavItems>

                        </HeaderPanel>
                    )}
                </Header>
            )}
        />
    );
};

export default AppHeader;