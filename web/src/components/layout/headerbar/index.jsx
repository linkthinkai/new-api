/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useHeaderBar } from '../../../hooks/common/useHeaderBar';
import { useNotifications } from '../../../hooks/common/useNotifications';
import { useNavigation } from '../../../hooks/common/useNavigation';
import NoticeModal from '../NoticeModal';
import MobileMenuButton from './MobileMenuButton';
import HeaderLogo from './HeaderLogo';
import Navigation from './Navigation';
import ActionButtons from './ActionButtons';

const HeaderBar = ({ onMobileMenuToggle, drawerOpen }) => {
  const reduceMotion = useReducedMotion();
  const {
    userState,
    statusState,
    isMobile,
    collapsed,
    logoLoaded,
    currentLang,
    isLoading,
    systemName,
    logo,
    isNewYear,
    isSelfUseMode,
    docsLink,
    isDemoSiteMode,
    isConsoleRoute,
    theme,
    headerNavModules,
    pricingRequireAuth,
    logout,
    handleLanguageChange,
    handleThemeToggle,
    handleMobileMenuToggle,
    navigate,
    t,
  } = useHeaderBar({ onMobileMenuToggle, drawerOpen });

  const {
    noticeVisible,
    unreadCount,
    handleNoticeOpen,
    handleNoticeClose,
    getUnreadKeys,
  } = useNotifications(statusState);

  const { mainNavLinks } = useNavigation(t, docsLink, headerNavModules);

  return (
    <motion.header
      className='neo-top-bar text-semi-color-text-0 sticky top-0 z-50 relative overflow-x-clip overflow-y-visible'
      initial={reduceMotion ? false : { y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.38, ease: [0.22, 1, 0.36, 1] }
      }
    >
      <NoticeModal
        visible={noticeVisible}
        onClose={handleNoticeClose}
        isMobile={isMobile}
        defaultTab={unreadCount > 0 ? 'system' : 'inApp'}
        unreadKeys={getUnreadKeys()}
      />

      <div className='neo-top-bar-inner mx-auto flex w-full max-w-[min(100%,1440px)] items-center gap-3 px-3 sm:gap-4 sm:px-5 lg:px-8'>
        <div className='flex min-w-0 shrink-0 items-center gap-1 sm:gap-2'>
          <MobileMenuButton
            isConsoleRoute={isConsoleRoute}
            isMobile={isMobile}
            drawerOpen={drawerOpen}
            collapsed={collapsed}
            onToggle={handleMobileMenuToggle}
            t={t}
          />

          <HeaderLogo
            isMobile={isMobile}
            isConsoleRoute={isConsoleRoute}
            logo={logo}
            logoLoaded={logoLoaded}
            isLoading={isLoading}
            systemName={systemName}
            isSelfUseMode={isSelfUseMode}
            isDemoSiteMode={isDemoSiteMode}
            t={t}
          />
        </div>

        <Navigation
          mainNavLinks={mainNavLinks}
          isMobile={isMobile}
          isLoading={isLoading}
          userState={userState}
          pricingRequireAuth={pricingRequireAuth}
        />

        <div className='flex shrink-0 items-center justify-end'>
          <ActionButtons
            isNewYear={isNewYear}
            unreadCount={unreadCount}
            onNoticeOpen={handleNoticeOpen}
            theme={theme}
            onThemeToggle={handleThemeToggle}
            currentLang={currentLang}
            onLanguageChange={handleLanguageChange}
            userState={userState}
            isLoading={isLoading}
            isMobile={isMobile}
            isSelfUseMode={isSelfUseMode}
            logout={logout}
            navigate={navigate}
            t={t}
          />
        </div>
      </div>
    </motion.header>
  );
};

export default HeaderBar;
