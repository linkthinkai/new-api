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

const AuthBrandHeader = ({ logo, systemName, pageTitle }) => {
  return (
    <div className='mb-5 text-center sm:mb-6'>
      <div className='flex justify-center'>
        <div className='relative'>
          <div
            className='absolute -inset-2 rounded-xl opacity-50 blur-xl'
            style={{
              background:
                'linear-gradient(135deg, rgba(var(--neo-p-rgb), 0.14), rgba(var(--neo-s-rgb), 0.08))',
            }}
            aria-hidden
          />
          <img
            src={logo}
            alt=''
            className='relative h-12 w-12 rounded-xl object-cover shadow-md ring-1 ring-[var(--semi-color-border)] sm:h-14 sm:w-14 sm:rounded-2xl'
            width={56}
            height={56}
          />
        </div>
      </div>
      <h1 className='mt-3 text-lg font-semibold tracking-tight text-[var(--semi-color-text-0)] sm:mt-3.5 sm:text-xl'>
        {systemName}
      </h1>
      <p className='mt-1 text-sm text-[var(--semi-color-text-2)]'>{pageTitle}</p>
    </div>
  );
};

export default AuthBrandHeader;
