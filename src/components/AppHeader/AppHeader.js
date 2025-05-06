import { useState, useEffect } from "react";
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
} from "@carbon/react";
import { Menu } from "@carbon/icons-react";
import Link from "next/link";
import { useAuth } from "../../hooks/useAuth";
import { usePathname } from "next/navigation";
import { useChatHistory } from "../../hooks/useChatHistory";

// this whole component is such a fat mess https://tenor.com/view/ulrik-dum-dum-gif-8139603776302963066
const AppHeader = () => {
    const { isLoggedIn, logout } = useAuth();
    const [isSideNavExpanded, setIsSideNavExpanded] = useState(false);
    const pathname = usePathname();
    // There has to be a cleaner way to do this
    const hasSideNav =
        pathname.includes("/chat") ||
        pathname === "/settings" ||
        pathname === "/about" ||
        pathname === "/announcement" ||
        pathname === "/contact" ||
        pathname === "/resource";
    const { chatHistories, getHistories } = useChatHistory();

    useEffect(() => {
        const mq = window.matchMedia("(min-width: 1024px)");
        setIsSideNavExpanded(mq.matches);

        const handleMediaChange = (e) => {
            setIsSideNavExpanded(e.matches);
        };

        const pagesToCloseNavOn = [
            "/settings",
            "/about",
            "/announcement",
            "/contact",
            "/resource",
        ]; //10x developer

        if (pagesToCloseNavOn.includes(pathname)) {
            setIsSideNavExpanded(false);
        }

        mq.addEventListener("change", handleMediaChange);
        return () => {
            mq.removeEventListener("change", handleMediaChange);
        };
    }, [pathname]);

    // Fetching the localStorage chat histories
    useEffect(() => {
        getHistories();
    }, chatHistories);

    return (
        <HeaderContainer
            render={() => (
                <Header aria-label="Team 32 Header">
                    <SkipToContent />

                    <Link href="/" passHref legacyBehavior>
                        <HeaderName prefix="IBM">
                            AI For New Students
                        </HeaderName>
                    </Link>

                    <HeaderGlobalBar>
                        {isLoggedIn && hasSideNav && (
                            <HeaderGlobalAction
                                aria-label={
                                    isSideNavExpanded
                                        ? "Close menu"
                                        : "Open menu"
                                }
                                aria-expanded={isSideNavExpanded}
                                isActive={isSideNavExpanded}
                                onClick={() =>
                                    setIsSideNavExpanded(!isSideNavExpanded)
                                }
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
                                <div className="side-nav-pages">
                                    <SideNavLink href="/chat">Chat</SideNavLink>
                                    <SideNavLink href="/settings">
                                        Settings
                                    </SideNavLink>
                                    <SideNavLink href="/about">
                                        About
                                    </SideNavLink>
                                    <SideNavLink href="/announcement">
                                        Announcements
                                    </SideNavLink>
                                    <SideNavLink href="/contact">
                                        Contact Us
                                    </SideNavLink>
                                    <SideNavLink href="/resource">
                                        Resources
                                    </SideNavLink>
                                    <SideNavMenu
                                        title="History"
                                        defaultExpanded={true}
                                    >
                                        {/* If there are chat histories present, display their ids */}
                                        <div className="history-scroll">
                                            {chatHistories.length > 0
                                                ? chatHistories.map(
                                                      (history) => (
                                                          <SideNavLink
                                                              /* Uses the `localStorage` chat history key (UUID i think)
                                                           to use as part of the dynamic route's link so it can be
                                                           fetched later */
                                                              href={`/chat/${encodeURIComponent(
                                                                  history.key
                                                              )}`}
                                                          >
                                                              {history.id}
                                                          </SideNavLink>
                                                      )
                                                  )
                                                : ({
                                                      /* Otherwise, say there are none */
                                                  },
                                                  (
                                                      <SideNavLink disabled>
                                                          No chat history
                                                      </SideNavLink>
                                                  ))}
                                        </div>
                                    </SideNavMenu>
                                </div>
                                <SideNavLink
                                    href="/"
                                    onClick={logout}
                                    className="logout"
                                >
                                    Logout
                                </SideNavLink>
                            </SideNavItems>
                        </HeaderPanel>
                    )}
                </Header>
            )}
        />
    );
};

export default AppHeader;
