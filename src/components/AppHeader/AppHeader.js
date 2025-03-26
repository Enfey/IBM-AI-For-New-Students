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
    /* Sets the chat history's initial state to an empty array
       and a function that updates the state */
    const [chatHistories, setChatHistories] = useState([]);
    const pathname = usePathname();
    const hasSideNav = pathname === '/chat' || pathname === '/settings' || pathname === '/about' || pathname === '/announcement' || pathname === '/contact' || pathname === '/resource';

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

    /*
    This hook loads the chat histories from local storage, (by seeing if each
    item in localStorage starts with "chatHistory") and then sets the
    `chatHistories` state defined above to the loaded chat histories

    The histories constant is an array of objects following the format:
        - The previous fields from `chatHistoryData`
        - key: The key (sessionID) of the chat history in localStorage
        - id: The numeric index of the chat history

    IMPORTANT IMPORTANT IMPORTANT IMPORTANT IMPORTANT IMPORTANT IMPORTANT
    localStorage doesn't actually have an order, so I'm not sure how to
    order the chats in the menu sidebar when loading them
    */
    useEffect(() => {
        const histories = [];
        let chatHistoriesCount = 0;

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);

            if(key.startsWith("chatHistory")) {
                chatHistoriesCount++;

                const chatHistoryData = JSON.parse(localStorage.getItem(key));
                histories.push({
                    ...chatHistoryData,
                    key: key,
                    id: chatHistoriesCount
                });
            }
        }

        setChatHistories(histories);
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
                                        { chatHistories.length > 0 ? (
                                            chatHistories.map((history) => (
                                                <SideNavLink
                                                    key={history.key}
                                                    /* When this link element is clicked, it redirects
                                                    the user to a new page where all the messages from
                                                    a previous conversation are stored */
                                                    href={`/chat/${encodeURIComponent(history.key)}`}>
                                                    Chat history {history.id}
                                                </SideNavLink>
                                            ))
                                        ) : (
                                            <SideNavLink disabled>No chat history</SideNavLink>
                                        )}
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