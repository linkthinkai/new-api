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
import { Link, useLocation } from 'react-router-dom';
import SkeletonWrapper from '../components/SkeletonWrapper';

const Navigation = ({
  mainNavLinks,
  isMobile,
  isLoading,
  userState,
  pricingRequireAuth,
}) => {
  const location = useLocation();

  const isLinkActive = (link) => {
    if (link.isExternal) return false;
    const path = location.pathname;
    if (link.itemKey === 'home') return path === '/';
    if (link.to) return path === link.to || path.startsWith(`${link.to}/`);
    return false;
  };

  const renderNavLinks = () => {
    const baseClasses =
      'neo-nav-link flex shrink-0 items-center gap-1 text-[13px] sm:text-sm';

    return mainNavLinks.map((link) => {
      const active = isLinkActive(link);
      const linkContent = <span>{link.text}</span>;

      if (link.isExternal) {
        return (
          <a
            key={link.itemKey}
            href={link.externalLink}
            target='_blank'
            rel='noopener noreferrer'
            className={`${baseClasses} hover:text-semi-color-primary`}
          >
            {linkContent}
          </a>
        );
      }

      let targetPath = link.to;
      if (link.itemKey === 'console' && !userState.user) {
        targetPath = '/login';
      }
      if (link.itemKey === 'pricing' && pricingRequireAuth && !userState.user) {
        targetPath = '/login';
      }

      const activeClass = active ? ' neo-nav-link-active' : '';

      return (
        <Link
          key={link.itemKey}
          to={targetPath}
          className={`${baseClasses}${activeClass}`}
        >
          {linkContent}
        </Link>
      );
    });
  };

  return (
    <nav className='flex min-h-16 min-w-0 flex-1 items-center justify-center self-stretch md:min-h-0 md:py-0'>
      <div className='flex w-full min-w-0 items-center justify-center md:w-auto md:max-w-full'>
        <div className='min-w-0 max-w-full overflow-x-auto overflow-y-visible scrollbar-hide md:overflow-visible'>
          <div className='flex items-center justify-start gap-0.5 whitespace-nowrap px-0.5 md:justify-center md:gap-1'>
            <SkeletonWrapper
              loading={isLoading}
              type='navigation'
              count={4}
              width={60}
              height={16}
              isMobile={isMobile}
            >
              {renderNavLinks()}
            </SkeletonWrapper>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
