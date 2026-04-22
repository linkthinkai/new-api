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

const SIZE_PX = {
  'extra-small': 12,
  small: 14,
  default: 16,
  large: 20,
  inherit: undefined,
};

function resolveSize(size) {
  if (size == null || size === 'inherit') return 16;
  if (typeof size === 'number') return size;
  return SIZE_PX[size] ?? 16;
}

function createRemixIcon(riClass, displayName) {
  function Icon({ size, className = '', style, ...rest }) {
    const px = resolveSize(size);
    return (
      <i
        className={[riClass, className].filter(Boolean).join(' ')}
        style={{
          fontSize: px,
          lineHeight: 1,
          display: 'inline-block',
          verticalAlign: 'middle',
          ...style,
        }}
        aria-hidden
        {...rest}
      />
    );
  }
  Icon.displayName = displayName;
  return Icon;
}

/** `icon` 为完整 Remix class，例如 `ri-sun-line`（用于 Semi `icon` 插槽等） */
export function RemixIcon({ icon, size = 16, className = '', style, ...rest }) {
  const px = resolveSize(size);
  return (
    <i
      className={[icon, className].filter(Boolean).join(' ')}
      style={{
        fontSize: px,
        lineHeight: 1,
        display: 'inline-block',
        verticalAlign: 'middle',
        ...style,
      }}
      aria-hidden
      {...rest}
    />
  );
}

export const IconSearch = createRemixIcon('ri-search-line', 'IconSearch');
export const IconClose = createRemixIcon('ri-close-line', 'IconClose');
export const IconMenu = createRemixIcon('ri-menu-line', 'IconMenu');
export const IconGithubLogo = createRemixIcon('ri-github-fill', 'IconGithubLogo');
export const IconKey = createRemixIcon('ri-key-2-line', 'IconKey');
export const IconLock = createRemixIcon('ri-lock-line', 'IconLock');
export const IconMail = createRemixIcon('ri-mail-line', 'IconMail');
export const IconBell = createRemixIcon('ri-notification-3-line', 'IconBell');
export const IconUser = createRemixIcon('ri-user-line', 'IconUser');
export const IconCopy = createRemixIcon('ri-file-copy-line', 'IconCopy');
export const IconAlertTriangle = createRemixIcon('ri-alert-line', 'IconAlertTriangle');
export const IconEyeClosed = createRemixIcon('ri-eye-off-line', 'IconEyeClosed');
export const IconEyeOpened = createRemixIcon('ri-eye-line', 'IconEyeOpened');
export const IconChevronDown = createRemixIcon(
  'ri-arrow-down-s-line',
  'IconChevronDown',
);
export const IconChevronUp = createRemixIcon(
  'ri-arrow-up-s-line',
  'IconChevronUp',
);
export const IconMinus = createRemixIcon('ri-subtract-line', 'IconMinus');
export const IconPlus = createRemixIcon('ri-add-line', 'IconPlus');
export const IconCreditCard = createRemixIcon('ri-bank-card-line', 'IconCreditCard');
export const IconExit = createRemixIcon('ri-logout-box-r-line', 'IconExit');
export const IconUserSetting = createRemixIcon(
  'ri-user-settings-line',
  'IconUserSetting',
);
export const IconDelete = createRemixIcon('ri-delete-bin-line', 'IconDelete');
export const IconShield = createRemixIcon(
  'ri-shield-keyhole-line',
  'IconShield',
);
export const IconCheckCircleStroked = createRemixIcon(
  'ri-checkbox-circle-line',
  'IconCheckCircleStroked',
);
export const IconBolt = createRemixIcon('ri-flashlight-line', 'IconBolt');
export const IconTreeTriangleDown = createRemixIcon(
  'ri-arrow-down-s-fill',
  'IconTreeTriangleDown',
);
export const IconMore = createRemixIcon('ri-more-2-fill', 'IconMore');
export const IconRefresh = createRemixIcon('ri-refresh-line', 'IconRefresh');
export const IconDownload = createRemixIcon('ri-download-line', 'IconDownload');
export const IconCode = createRemixIcon('ri-code-line', 'IconCode');
export const IconSave = createRemixIcon('ri-save-line', 'IconSave');
export const IconSaveStroked = createRemixIcon('ri-save-3-line', 'IconSaveStroked');
export const IconGlobe = createRemixIcon('ri-global-line', 'IconGlobe');
export const IconServer = createRemixIcon('ri-server-line', 'IconServer');
export const IconSetting = createRemixIcon('ri-settings-3-line', 'IconSetting');
export const IconBookmark = createRemixIcon('ri-bookmark-line', 'IconBookmark');
export const IconInfoCircle = createRemixIcon(
  'ri-information-line',
  'IconInfoCircle',
);
export const IconUserAdd = createRemixIcon('ri-user-add-line', 'IconUserAdd');
export const IconEdit = createRemixIcon('ri-edit-line', 'IconEdit');
export const IconLink = createRemixIcon('ri-links-line', 'IconLink');
export const IconLayers = createRemixIcon('ri-stack-line', 'IconLayers');
export const IconFilter = createRemixIcon('ri-filter-3-line', 'IconFilter');
export const IconExternalOpen = createRemixIcon(
  'ri-external-link-line',
  'IconExternalOpen',
);
export const IconHelpCircle = createRemixIcon('ri-question-line', 'IconHelpCircle');
export const IconHistogram = createRemixIcon('ri-bar-chart-line', 'IconHistogram');
export const IconMoneyExchangeStroked = createRemixIcon(
  'ri-exchange-dollar-line',
  'IconMoneyExchangeStroked',
);
export const IconTextStroked = createRemixIcon('ri-text-block', 'IconTextStroked');
export const IconTypograph = createRemixIcon('ri-font-size-2', 'IconTypograph');
export const IconStopwatchStroked = createRemixIcon(
  'ri-timer-line',
  'IconStopwatchStroked',
);
export const IconSend = createRemixIcon('ri-send-plane-2-line', 'IconSend');
export const IconPulse = createRemixIcon('ri-pulse-line', 'IconPulse');
export const IconCoinMoneyStroked = createRemixIcon(
  'ri-coins-line',
  'IconCoinMoneyStroked',
);
export const IconPlay = createRemixIcon('ri-play-large-fill', 'IconPlay');
export const IconFile = createRemixIcon('ri-file-text-line', 'IconFile');
export const IconPriceTag = createRemixIcon(
  'ri-price-tag-3-line',
  'IconPriceTag',
);
export const IconApps = createRemixIcon('ri-apps-2-line', 'IconApps');
export const IconGift = createRemixIcon('ri-gift-line', 'IconGift');
export const IconUserGroup = createRemixIcon('ri-group-line', 'IconUserGroup');
export const IconPlusCircle = createRemixIcon(
  'ri-add-circle-line',
  'IconPlusCircle',
);
export const IconCalendarClock = createRemixIcon(
  'ri-calendar-schedule-line',
  'IconCalendarClock',
);

/** 控制台 /console 侧边栏菜单项 → Remix class（与原先 Lucide 语义对应） */
const SIDEBAR_ITEM_RI_CLASS = {
  detail: 'ri-dashboard-3-line',
  admin_dashboard: 'ri-pie-chart-2-line',
  playground: 'ri-terminal-window-line',
  chat: 'ri-chat-3-line',
  token: 'ri-key-2-line',
  log: 'ri-bar-chart-box-line',
  midjourney: 'ri-image-line',
  task: 'ri-task-line',
  topup: 'ri-bank-card-line',
  channel: 'ri-stack-line',
  redemption: 'ri-gift-line',
  user: 'ri-user-line',
  personal: 'ri-user-line',
  models: 'ri-box-3-line',
  deployment: 'ri-server-line',
  subscription: 'ri-calendar-schedule-line',
  setting: 'ri-settings-3-line',
};

export function SidebarNavRemixIcon({ itemKey, selected = false }) {
  let riClass = SIDEBAR_ITEM_RI_CLASS[itemKey];
  if (
    !riClass &&
    typeof itemKey === 'string' &&
    itemKey.startsWith('chat')
  ) {
    riClass = 'ri-message-3-line';
  }
  if (!riClass) riClass = 'ri-account-circle-line';

  const px = 16;
  const color = selected ? 'var(--semi-color-primary)' : 'currentColor';

  return (
    <i
      className={[
        riClass,
        'transition-colors duration-200',
        selected ? 'transition-transform duration-200 scale-105' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        fontSize: px,
        lineHeight: 1,
        display: 'inline-block',
        verticalAlign: 'middle',
        color,
      }}
      aria-hidden
    />
  );
}
