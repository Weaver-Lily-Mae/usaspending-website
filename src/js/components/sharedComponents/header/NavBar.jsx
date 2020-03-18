import React from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Modal from 'react-aria-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";


import Analytics from 'helpers/analytics/Analytics';
import GlossaryButtonWrapperContainer from 'containers/glossary/GlossaryButtonWrapperContainer';
import { searchOptions, profileOptions, downloadOptions } from 'dataMapping/navigation/menuOptions';

import NavBarGlossaryLink from './NavBarGlossaryLink';
import Dropdown from './Dropdown';
import MobileNav from './mobile/MobileNav';

const clickedHeaderLink = (route) => {
    Analytics.event({
        category: 'Header - Link',
        action: route
    });
};

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showMobileNav: false,
            showStayInTouchModal: false
        };

        this.siteBody = null;

        this.toggleMobileNav = this.toggleMobileNav.bind(this);
        this.hideMobileNav = this.hideMobileNav.bind(this);
        this.handleStayInTouchClick = this.handleStayInTouchClick.bind(this);
    }

    componentDidMount() {
        this.siteBody = document.querySelector('body');
    }

    displayMobileNav() {
        // disable body scrolling
        this.siteBody.classList.add('show-mobile-nav');
        this.setState({
            showMobileNav: true
        });
    }

    hideMobileNav() {
        // re-enable body scrolling
        this.siteBody.classList.remove('show-mobile-nav');
        this.setState({
            showMobileNav: false
        });
    }

    toggleMobileNav() {
        if (this.state.showMobileNav) {
            this.hideMobileNav();
        }
        else {
            this.displayMobileNav();
        }
    }

    handleStayInTouchClick(e) {
        this.setState({ showStayInTouchModal: true });
    }

    render() {
        let mobileNav = null;
        if (this.state.showMobileNav) {
            mobileNav = (
                <MobileNav
                    hideMobileNav={this.hideMobileNav} />
            );
        }

        return (
            <nav
                className="site-navigation"
                aria-label="Site navigation">
                <Modal
                    mounted={this.state.showStayInTouchModal}
                    onExit={() => this.setState({ showStayInTouchModal: false })}
                    titleText="Stay In Touch"
                    dialogClass="stay-in-touch-modal"
                    verticallyCenter
                    escapeExits>
                    Test
                </Modal>
                <div className="site-navigation__wrapper">
                    <div className="site-navigation__logo site-logo">
                        <div className="site-logo__wrapper" id="logo">
                            <a
                                className="site-logo__link"
                                href="#/"
                                title="USAspending.gov Home"
                                aria-label="USAspending.gov Home"
                                onClick={clickedHeaderLink.bind(null, '/')}>
                                <img
                                    className="site-logo__image"
                                    src="img/logo.png"
                                    srcSet="img/logo.png 1x, img/logo@2x.png 2x"
                                    alt="USAspending.gov" />
                            </a>
                        </div>
                    </div>
                    <div className="site-navigation__mobile mobile-hamburger">
                        <div className="mobile-hamburger__wrapper">
                            <button
                                className="mobile-hamburger__button"
                                onClick={this.toggleMobileNav}>
                                <span className="mobile-hamburger__meat-buns" />
                            </button>
                        </div>
                    </div>
                    <div className="mobile-nav-animations">
                        <CSSTransitionGroup
                            transitionName="mobile-nav-slide"
                            transitionLeaveTimeout={195}
                            transitionEnterTimeout={225}
                            transitionLeave>
                            {mobileNav}
                        </CSSTransitionGroup>
                    </div>
                    <div className="site-navigation__menu full-menu">
                        <ul
                            className="full-menu__list"
                            role="menu">
                            <li
                                className="full-menu__item"
                                role="menuitem">
                                <button className="full-menu__item--button" onClick={this.handleStayInTouchClick}>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                    Stay In Touch
                                </button>
                            </li>
                            <li
                                className="full-menu__item"
                                role="menuitem">
                                <a
                                    className="full-menu__link"
                                    href="#/explorer"
                                    title="Spending Explorer: Navigate the levels of government spending from top to bottom"
                                    onClick={clickedHeaderLink.bind(null, '/explorer')}>
                                    <span>Spending Explorer</span>
                                </a>
                            </li>
                            <li
                                className="full-menu__item"
                                role="menuitem">
                                <Dropdown
                                    title="Award Search: Search through awards and discover trends and connections"
                                    label="Award Search"
                                    items={searchOptions} />
                            </li>
                            <li
                                className="full-menu__item"
                                role="menuitem">
                                <Dropdown
                                    title="Profiles: Learn more about organizations and accounts"
                                    label="Profiles"
                                    items={profileOptions} />
                            </li>
                            <li
                                className="full-menu__item"
                                role="menuitem">
                                <Dropdown
                                    title="Download Center"
                                    label="Download Center"
                                    items={downloadOptions} />
                            </li>
                            <li
                                className="full-menu__item"
                                role="menuitem">
                                <GlossaryButtonWrapperContainer child={NavBarGlossaryLink} />
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

